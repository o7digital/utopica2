import { test, expect } from '@playwright/test';

interface WebVitalsMetrics {
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
  fcp: number;
  inp: number;
}

interface PerformanceTestResult {
  url: string;
  metrics: WebVitalsMetrics;
  timestamp: string;
  passed: boolean;
}

// Target metrics from plan
const PERFORMANCE_TARGETS = {
  lcp: 1500,    // < 1.5s (currently ~2.5s)
  fid: 100,     // < 100ms (currently ~150ms)
  cls: 0.1,     // < 0.1 (currently ~0.15)
  ttfb: 300,    // < 300ms (currently ~800ms)
  fcp: 1000,    // < 1.0s
  inp: 200,     // < 200ms
};

const CRITICAL_PAGES = [
  '/',
  '/sprint-claridad-comercial',
  '/equipo',
];

test.describe('Web Vitals Performance Tests', () => {
  let performanceResults: PerformanceTestResult[] = [];

  test.beforeEach(async ({ page }) => {
    // Enable performance metrics collection
    await page.addInitScript(() => {
      // Inject Web Vitals library
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/web-vitals@3/dist/web-vitals.iife.js';
      document.head.appendChild(script);
    });
  });

  test.afterAll(async () => {
    // Generate performance report
    const report = {
      timestamp: new Date().toISOString(),
      targets: PERFORMANCE_TARGETS,
      results: performanceResults,
      summary: {
        totalPages: performanceResults.length,
        passedPages: performanceResults.filter(r => r.passed).length,
        failedPages: performanceResults.filter(r => !r.passed).length,
        averageMetrics: calculateAverageMetrics(performanceResults),
      }
    };

    console.log('\n=== WEB VITALS PERFORMANCE REPORT ===');
    console.log(JSON.stringify(report, null, 2));
  });

  for (const url of CRITICAL_PAGES) {
    test(`Web Vitals for ${url}`, async ({ page }) => {
      const metrics: Partial<WebVitalsMetrics> = {};
      const navigationStart = Date.now();

      // Set up performance observers
      await page.addInitScript(() => {
        window.performanceMetrics = {};
        
        // CLS Observer
        new PerformanceObserver((list) => {
          let clsValue = 0;
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'layout-shift') {
              clsValue += (entry as any).value;
            }
          }
          window.performanceMetrics.cls = clsValue;
        }).observe({type: 'layout-shift', buffered: true});

        // LCP Observer
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          window.performanceMetrics.lcp = lastEntry.startTime;
        }).observe({type: 'largest-contentful-paint', buffered: true});

        // FCP Observer
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              window.performanceMetrics.fcp = entry.startTime;
            }
          }
        }).observe({type: 'paint', buffered: true});
      });

      // Navigate and wait for load
      const response = await page.goto(url, { 
        waitUntil: 'networkidle',
        timeout: 60000
      });

      // Calculate TTFB
      const ttfb = response ? Date.now() - navigationStart : 0;
      metrics.ttfb = ttfb;

      // Wait for metrics to be collected
      await page.waitForTimeout(3000);

      // Extract metrics from page
      const pageMetrics = await page.evaluate(() => {
        return window.performanceMetrics || {};
      });

      // Merge metrics
      Object.assign(metrics, pageMetrics);

      // Measure FID simulation (using click delay)
      const fidStart = Date.now();
      await page.click('body', { force: true });
      const fidEnd = Date.now();
      metrics.fid = fidEnd - fidStart;

      // Measure INP simulation
      const inpStart = Date.now();
      await page.keyboard.press('Tab');
      const inpEnd = Date.now();
      metrics.inp = inpEnd - inpStart;

      // Create test result
      const result: PerformanceTestResult = {
        url,
        metrics: metrics as WebVitalsMetrics,
        timestamp: new Date().toISOString(),
        passed: validateMetrics(metrics as WebVitalsMetrics)
      };

      performanceResults.push(result);

      // Assertions
      expect(metrics.lcp, `LCP should be < ${PERFORMANCE_TARGETS.lcp}ms`).toBeLessThan(PERFORMANCE_TARGETS.lcp);
      expect(metrics.fid, `FID should be < ${PERFORMANCE_TARGETS.fid}ms`).toBeLessThan(PERFORMANCE_TARGETS.fid);
      expect(metrics.cls, `CLS should be < ${PERFORMANCE_TARGETS.cls}`).toBeLessThan(PERFORMANCE_TARGETS.cls);
      expect(metrics.ttfb, `TTFB should be < ${PERFORMANCE_TARGETS.ttfb}ms`).toBeLessThan(PERFORMANCE_TARGETS.ttfb);
      expect(metrics.fcp, `FCP should be < ${PERFORMANCE_TARGETS.fcp}ms`).toBeLessThan(PERFORMANCE_TARGETS.fcp);
      expect(metrics.inp, `INP should be < ${PERFORMANCE_TARGETS.inp}ms`).toBeLessThan(PERFORMANCE_TARGETS.inp);

      console.log(`\n--- Web Vitals for ${url} ---`);
      console.log(`LCP: ${metrics.lcp}ms (target: <${PERFORMANCE_TARGETS.lcp}ms)`);
      console.log(`FID: ${metrics.fid}ms (target: <${PERFORMANCE_TARGETS.fid}ms)`);
      console.log(`CLS: ${metrics.cls} (target: <${PERFORMANCE_TARGETS.cls})`);
      console.log(`TTFB: ${metrics.ttfb}ms (target: <${PERFORMANCE_TARGETS.ttfb}ms)`);
      console.log(`FCP: ${metrics.fcp}ms (target: <${PERFORMANCE_TARGETS.fcp}ms)`);
      console.log(`INP: ${metrics.inp}ms (target: <${PERFORMANCE_TARGETS.inp}ms)`);
    });
  }

  test('Performance baseline comparison', async ({ page }) => {
    // Load baseline metrics if available
    const baselineMetrics = await loadBaselineMetrics();
    
    if (baselineMetrics) {
      for (const result of performanceResults) {
        const baseline = baselineMetrics[result.url];
        if (baseline) {
          const improvement = calculateImprovement(baseline, result.metrics);
          console.log(`\n--- Performance Improvement for ${result.url} ---`);
          console.log(`LCP improvement: ${improvement.lcp}%`);
          console.log(`FID improvement: ${improvement.fid}%`);
          console.log(`CLS improvement: ${improvement.cls}%`);
          console.log(`TTFB improvement: ${improvement.ttfb}%`);
        }
      }
    }

    // Save current metrics as new baseline
    await saveBaselineMetrics(performanceResults);
  });
});

test.describe('Mobile Web Vitals', () => {
  test.use({ 
    ...test.use(),
    viewport: { width: 375, height: 667 },
    isMobile: true,
    hasTouch: true
  });

  for (const url of CRITICAL_PAGES) {
    test(`Mobile Web Vitals for ${url}`, async ({ page }) => {
      // Similar to desktop but with mobile-specific expectations
      const mobileTargets = {
        ...PERFORMANCE_TARGETS,
        lcp: PERFORMANCE_TARGETS.lcp * 1.5, // Allow 50% more time on mobile
        ttfb: PERFORMANCE_TARGETS.ttfb * 1.5,
      };

      const response = await page.goto(url, { 
        waitUntil: 'networkidle',
        timeout: 60000
      });

      await page.waitForTimeout(3000);

      const metrics = await page.evaluate(() => {
        return window.performanceMetrics || {};
      });

      // Mobile-specific assertions
      expect(metrics.lcp, `Mobile LCP should be < ${mobileTargets.lcp}ms`).toBeLessThan(mobileTargets.lcp);
      expect(metrics.cls, `Mobile CLS should be < ${mobileTargets.cls}`).toBeLessThan(mobileTargets.cls);
    });
  }
});

// Helper functions
function validateMetrics(metrics: WebVitalsMetrics): boolean {
  return (
    metrics.lcp < PERFORMANCE_TARGETS.lcp &&
    metrics.fid < PERFORMANCE_TARGETS.fid &&
    metrics.cls < PERFORMANCE_TARGETS.cls &&
    metrics.ttfb < PERFORMANCE_TARGETS.ttfb &&
    metrics.fcp < PERFORMANCE_TARGETS.fcp &&
    metrics.inp < PERFORMANCE_TARGETS.inp
  );
}

function calculateAverageMetrics(results: PerformanceTestResult[]): WebVitalsMetrics {
  const sum = results.reduce((acc, result) => ({
    lcp: acc.lcp + result.metrics.lcp,
    fid: acc.fid + result.metrics.fid,
    cls: acc.cls + result.metrics.cls,
    ttfb: acc.ttfb + result.metrics.ttfb,
    fcp: acc.fcp + result.metrics.fcp,
    inp: acc.inp + result.metrics.inp,
  }), { lcp: 0, fid: 0, cls: 0, ttfb: 0, fcp: 0, inp: 0 });

  const count = results.length;
  return {
    lcp: sum.lcp / count,
    fid: sum.fid / count,
    cls: sum.cls / count,
    ttfb: sum.ttfb / count,
    fcp: sum.fcp / count,
    inp: sum.inp / count,
  };
}

function calculateImprovement(baseline: WebVitalsMetrics, current: WebVitalsMetrics) {
  return {
    lcp: ((baseline.lcp - current.lcp) / baseline.lcp * 100).toFixed(1),
    fid: ((baseline.fid - current.fid) / baseline.fid * 100).toFixed(1),
    cls: ((baseline.cls - current.cls) / baseline.cls * 100).toFixed(1),
    ttfb: ((baseline.ttfb - current.ttfb) / baseline.ttfb * 100).toFixed(1),
  };
}

async function loadBaselineMetrics(): Promise<Record<string, WebVitalsMetrics> | null> {
  try {
    const fs = require('fs');
    const path = require('path');
    const baselinePath = path.join(process.cwd(), 'performance-baseline.json');
    
    if (fs.existsSync(baselinePath)) {
      const data = fs.readFileSync(baselinePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.warn('Failed to load baseline metrics:', error);
  }
  return null;
}

async function saveBaselineMetrics(results: PerformanceTestResult[]): Promise<void> {
  try {
    const fs = require('fs');
    const path = require('path');
    
    const baseline: Record<string, WebVitalsMetrics> = {};
    results.forEach(result => {
      baseline[result.url] = result.metrics;
    });

    const baselinePath = path.join(process.cwd(), 'performance-baseline.json');
    fs.writeFileSync(baselinePath, JSON.stringify(baseline, null, 2));
    console.log(`Performance baseline saved to ${baselinePath}`);
  } catch (error) {
    console.warn('Failed to save baseline metrics:', error);
  }
}

// Extend window type for TypeScript
declare global {
  interface Window {
    performanceMetrics: Partial<WebVitalsMetrics>;
  }
}