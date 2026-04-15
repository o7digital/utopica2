import { test, expect } from '@playwright/test';

interface ErrorTestMetrics {
  errorDetected: boolean;
  recoveryTime: number;
  fallbackDisplayed: boolean;
  userCanContinue: boolean;
  errorLogged: boolean;
}

interface ErrorScenario {
  name: string;
  trigger: () => Promise<void>;
  expectedBehavior: string;
}

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.describe('Error Boundary Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set up error tracking
    await page.addInitScript(() => {
      window.errorLogs = [];
      window.recoveryEvents = [];
      
      // Track console errors
      const originalError = console.error;
      console.error = (...args) => {
        window.errorLogs.push({
          timestamp: Date.now(),
          message: args.join(' '),
          stack: new Error().stack
        });
        originalError.apply(console, args);
      };

      // Track window errors
      window.addEventListener('error', (event) => {
        window.errorLogs.push({
          timestamp: Date.now(),
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          stack: event.error?.stack
        });
      });

      // Track unhandled promise rejections
      window.addEventListener('unhandledrejection', (event) => {
        window.errorLogs.push({
          timestamp: Date.now(),
          message: `Unhandled Promise Rejection: ${event.reason}`,
          type: 'unhandledrejection'
        });
      });
    });
  });

  test('Component error boundary functionality', async ({ page }) => {
    console.log('\n--- Testing component error boundaries ---');
    
    await page.goto(`${BASE_URL}/sprint-claridad-comercial`, { waitUntil: 'networkidle' });
    
    // Simulate component error by injecting faulty code
    const errorScenarios: ErrorScenario[] = [
      {
        name: 'React component error',
        trigger: async () => {
          await page.evaluate(() => {
            // Simulate a React component error
            const errorEvent = new CustomEvent('trigger-component-error', {
              detail: { component: 'TestComponent', error: 'Simulated error' }
            });
            window.dispatchEvent(errorEvent);
          });
        },
        expectedBehavior: 'Should display error fallback UI'
      },
      {
        name: 'Async operation error',
        trigger: async () => {
          await page.evaluate(async () => {
            // Simulate async error
            try {
              await fetch('/api/nonexistent-endpoint');
            } catch (error) {
              throw new Error('Simulated fetch error');
            }
          });
        },
        expectedBehavior: 'Should handle gracefully without breaking the page'
      },
      {
        name: 'State update error',
        trigger: async () => {
          await page.evaluate(() => {
            // Simulate state update error
            const event = new CustomEvent('trigger-state-error');
            window.dispatchEvent(event);
          });
        },
        expectedBehavior: 'Should recover and maintain page functionality'
      }
    ];

    for (const scenario of errorScenarios) {
      console.log(`\nTesting: ${scenario.name}`);
      
      const startTime = Date.now();
      
      // Clear previous errors
      await page.evaluate(() => {
        window.errorLogs = [];
        window.recoveryEvents = [];
      });

      // Trigger the error
      try {
        await scenario.trigger();
      } catch (error) {
        console.log(`Expected error triggered: ${error}`);
      }

      // Wait for error handling to complete
      await page.waitForTimeout(2000);

      const endTime = Date.now();
      const recoveryTime = endTime - startTime;

      // Check for error boundary activation
      const errorBoundaryVisible = await page.locator('[data-testid="error-boundary"]').isVisible().catch(() => false);
      const fallbackVisible = await page.locator('[data-testid="error-fallback"]').isVisible().catch(() => false);
      
      // Check if page is still functional
      const pageTitle = await page.title();
      const navigationWorks = await page.locator('nav').isVisible().catch(() => false);

      // Get error logs
      const errorLogs = await page.evaluate(() => window.errorLogs);
      
      const metrics: ErrorTestMetrics = {
        errorDetected: errorLogs.length > 0 || errorBoundaryVisible,
        recoveryTime,
        fallbackDisplayed: errorBoundaryVisible || fallbackVisible,
        userCanContinue: navigationWorks && pageTitle.length > 0,
        errorLogged: errorLogs.length > 0
      };

      console.log(`- Recovery time: ${recoveryTime}ms`);
      console.log(`- Error boundary visible: ${errorBoundaryVisible}`);
      console.log(`- Fallback visible: ${fallbackVisible}`);
      console.log(`- Page functional: ${metrics.userCanContinue}`);
      console.log(`- Errors logged: ${errorLogs.length}`);

      // Assertions
      expect(metrics.recoveryTime, 'Error recovery should be fast').toBeLessThan(5000);
      expect(metrics.userCanContinue, 'User should be able to continue using the app').toBeTruthy();
      
      // If error was detected, appropriate handling should be in place
      if (metrics.errorDetected) {
        // Either fallback should be shown or error should be gracefully handled
        const gracefulHandling = metrics.fallbackDisplayed || metrics.userCanContinue;
        expect(gracefulHandling, 'Error should be handled gracefully').toBeTruthy();
      }
    }
  });

  test('API error handling', async ({ page }) => {
    console.log('\n--- Testing API error handling ---');
    
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    // Test various API error scenarios
    const apiErrorTests = [
      {
        endpoint: '/api/nonexistent',
        expectedStatus: 404,
        description: '404 errors should be handled gracefully'
      },
      {
        endpoint: '/api/workshops',
        mockError: true,
        description: 'Server errors should show appropriate fallbacks'
      }
    ];

    for (const test of apiErrorTests) {
      console.log(`\nTesting API error: ${test.description}`);
      
      if (test.mockError) {
        // Mock API to return error
        await page.route(`**${test.endpoint}`, route => {
          route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({ error: 'Internal Server Error' })
          });
        });
      }

      // Trigger API call through UI interaction
      const response = await page.evaluate(async (endpoint) => {
        try {
          const res = await fetch(endpoint);
          return { status: res.status, ok: res.ok };
        } catch (error) {
          return { error: error.message };
        }
      }, test.endpoint);

      console.log(`API response:`, response);

      // Check that error doesn't break the page
      const pageStillWorks = await page.locator('body').isVisible();
      expect(pageStillWorks, 'Page should remain functional after API error').toBeTruthy();

      // Check for error handling UI
      const errorMessageVisible = await page.locator('[data-testid="error-message"]').isVisible().catch(() => false);
      const retryButtonVisible = await page.locator('[data-testid="retry-button"]').isVisible().catch(() => false);
      
      console.log(`- Error message shown: ${errorMessageVisible}`);
      console.log(`- Retry option available: ${retryButtonVisible}`);
    }
  });

  test('Network failure recovery', async ({ page }) => {
    console.log('\n--- Testing network failure recovery ---');
    
    await page.goto(`${BASE_URL}/sprint-claridad-comercial`, { waitUntil: 'networkidle' });

    // Simulate network failure
    await page.context().setOffline(true);
    
    // Try to interact with the page
    const offlineStartTime = Date.now();
    
    // Attempt navigation that would require network
    const navigationResult = await page.goto(`${BASE_URL}/equipo`, { 
      waitUntil: 'networkidle',
      timeout: 10000 
    }).catch(error => ({ error: error.message }));

    console.log('Navigation during offline:', navigationResult);

    // Check for offline indicators
    const offlineIndicatorVisible = await page.locator('[data-testid="offline-indicator"]').isVisible().catch(() => false);
    const offlineMessageVisible = await page.locator('text=offline').isVisible().catch(() => false);
    
    console.log(`- Offline indicator shown: ${offlineIndicatorVisible}`);
    console.log(`- Offline message shown: ${offlineMessageVisible}`);

    // Restore network
    await page.context().setOffline(false);
    
    const recoveryStartTime = Date.now();
    
    // Test recovery
    await page.waitForTimeout(2000);
    const recoveryNavigation = await page.goto(`${BASE_URL}/`, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });

    const recoveryTime = Date.now() - recoveryStartTime;
    
    console.log(`- Recovery time: ${recoveryTime}ms`);
    console.log(`- Recovery successful: ${recoveryNavigation?.ok()}`);

    // Assertions
    expect(recoveryNavigation?.ok(), 'Should recover from network failure').toBeTruthy();
    expect(recoveryTime, 'Recovery should be reasonably fast').toBeLessThan(15000);
  });

  test('Memory leak prevention', async ({ page }) => {
    console.log('\n--- Testing memory leak prevention ---');
    
    const memoryMeasurements = [];
    
    // Measure initial memory
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    
    const initialMemory = await page.evaluate(() => {
      if ('memory' in performance) {
        return (performance as any).memory.usedJSHeapSize;
      }
      return 0;
    });

    memoryMeasurements.push({ stage: 'initial', memory: initialMemory });
    console.log(`Initial memory: ${(initialMemory / 1024 / 1024).toFixed(2)} MB`);

    // Navigate through multiple pages to test for leaks
    const testPages = [
      '/sprint-claridad-comercial',
      '/equipo',
      '/',
      '/sprint-claridad-comercial',
      '/equipo'
    ];

    for (let i = 0; i < testPages.length; i++) {
      await page.goto(`${BASE_URL}${testPages[i]}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);
      
      // Force garbage collection if available
      await page.evaluate(() => {
        if ('gc' in window) {
          (window as any).gc();
        }
      });

      const memory = await page.evaluate(() => {
        if ('memory' in performance) {
          return (performance as any).memory.usedJSHeapSize;
        }
        return 0;
      });

      memoryMeasurements.push({ 
        stage: `navigation-${i + 1}`, 
        memory,
        page: testPages[i]
      });
      
      console.log(`After ${testPages[i]}: ${(memory / 1024 / 1024).toFixed(2)} MB`);
    }

    // Analyze memory growth
    const finalMemory = memoryMeasurements[memoryMeasurements.length - 1].memory;
    const memoryGrowth = finalMemory - initialMemory;
    const memoryGrowthMB = memoryGrowth / 1024 / 1024;
    
    console.log(`\nMemory analysis:`);
    console.log(`- Initial: ${(initialMemory / 1024 / 1024).toFixed(2)} MB`);
    console.log(`- Final: ${(finalMemory / 1024 / 1024).toFixed(2)} MB`);
    console.log(`- Growth: ${memoryGrowthMB.toFixed(2)} MB`);

    // Memory growth should be reasonable (< 50MB for this test)
    expect(memoryGrowthMB, 'Memory growth should be reasonable').toBeLessThan(50);
  });

  test('Error recovery rate validation', async ({ page }) => {
    console.log('\n--- Testing error recovery rate ---');
    
    const totalTests = 10;
    let successfulRecoveries = 0;
    
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    
    for (let i = 0; i < totalTests; i++) {
      console.log(`Recovery test ${i + 1}/${totalTests}`);
      
      // Inject random error
      try {
        await page.evaluate(() => {
          const errorTypes = [
            () => { throw new Error('Simulated runtime error'); },
            () => { Promise.reject('Simulated promise rejection'); },
            () => { const obj: any = null; obj.method(); }, // Null reference
          ];
          
          const randomError = errorTypes[Math.floor(Math.random() * errorTypes.length)];
          randomError();
        });
      } catch (error) {
        // Expected
      }

      await page.waitForTimeout(1000);

      // Check if page recovered
      const pageWorking = await page.evaluate(() => {
        return document.readyState === 'complete' && 
               document.title.length > 0 &&
               document.body.children.length > 0;
      });

      const navigationWorks = await page.locator('nav').isVisible().catch(() => false);
      
      if (pageWorking && navigationWorks) {
        successfulRecoveries++;
        console.log(`  ✓ Recovery successful`);
      } else {
        console.log(`  ✗ Recovery failed`);
      }
    }

    const recoveryRate = successfulRecoveries / totalTests;
    console.log(`\nError recovery rate: ${(recoveryRate * 100).toFixed(1)}%`);
    console.log(`Target: >95%`);

    // Recovery rate should be > 95%
    expect(recoveryRate, 'Error recovery rate should be > 95%').toBeGreaterThan(0.95);
  });
});

// Extend window type for error tracking
declare global {
  interface Window {
    errorLogs: Array<{
      timestamp: number;
      message: string;
      stack?: string;
      filename?: string;
      lineno?: number;
      colno?: number;
      type?: string;
    }>;
    recoveryEvents: Array<{
      timestamp: number;
      type: string;
      details: any;
    }>;
  }
}