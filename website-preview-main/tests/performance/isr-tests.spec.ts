import { test, expect } from '@playwright/test';

interface ISRTestMetrics {
  cacheHit: boolean;
  responseTime: number;
  revalidationTime?: number;
  staleWhileRevalidate: boolean;
  lastModified?: string;
  etag?: string;
}

interface CacheStatus {
  hit: boolean;
  age: number;
  maxAge: number;
  staleWhileRevalidate: boolean;
}

const ISR_PAGES = [
  { path: '/', revalidate: 60 },
  { path: '/sprint-claridad-comercial', revalidate: 3600 },
  { path: '/equipo', revalidate: 1800 },
];

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.describe('ISR Performance Tests', () => {
  test('ISR cache hit ratio validation', async ({ page }) => {
    const results: { [key: string]: ISRTestMetrics } = {};

    for (const pageConfig of ISR_PAGES) {
      console.log(`\n--- Testing ISR for ${pageConfig.path} ---`);

      // First request - should miss cache or be fresh
      const firstResponse = await page.goto(`${BASE_URL}${pageConfig.path}`, {
        waitUntil: 'networkidle'
      });

      const firstMetrics = await analyzeResponse(firstResponse, 'first');
      
      // Second request - should hit cache
      await page.waitForTimeout(1000);
      const secondResponse = await page.goto(`${BASE_URL}${pageConfig.path}`, {
        waitUntil: 'networkidle'
      });

      const secondMetrics = await analyzeResponse(secondResponse, 'second');

      // Third request after short delay - should still hit cache
      await page.waitForTimeout(2000);
      const thirdResponse = await page.goto(`${BASE_URL}${pageConfig.path}`, {
        waitUntil: 'networkidle'
      });

      const thirdMetrics = await analyzeResponse(thirdResponse, 'third');

      // Aggregate results
      results[pageConfig.path] = {
        cacheHit: secondMetrics.cacheHit && thirdMetrics.cacheHit,
        responseTime: (firstMetrics.responseTime + secondMetrics.responseTime + thirdMetrics.responseTime) / 3,
        staleWhileRevalidate: secondMetrics.staleWhileRevalidate || thirdMetrics.staleWhileRevalidate,
        lastModified: firstResponse?.headers()['last-modified'],
        etag: firstResponse?.headers()['etag']
      };

      // Assertions
      expect(secondMetrics.responseTime, 'Second request should be faster (cache hit)').toBeLessThan(firstMetrics.responseTime);
      expect(thirdMetrics.responseTime, 'Third request should be fast (cache hit)').toBeLessThan(firstMetrics.responseTime);
      
      console.log(`First request: ${firstMetrics.responseTime}ms (cache: ${firstMetrics.cacheHit})`);
      console.log(`Second request: ${secondMetrics.responseTime}ms (cache: ${secondMetrics.cacheHit})`);
      console.log(`Third request: ${thirdMetrics.responseTime}ms (cache: ${thirdMetrics.cacheHit})`);
    }

    // Overall cache hit ratio should be > 85%
    const totalRequests = Object.keys(results).length * 2; // Second and third requests
    const cacheHits = Object.values(results).filter(r => r.cacheHit).length;
    const cacheHitRatio = cacheHits / totalRequests;

    console.log(`\n=== ISR CACHE PERFORMANCE ===`);
    console.log(`Cache hit ratio: ${(cacheHitRatio * 100).toFixed(1)}%`);
    console.log(`Target: >85%`);

    expect(cacheHitRatio, 'Cache hit ratio should be > 85%').toBeGreaterThan(0.85);
  });

  test('ISR revalidation behavior', async ({ page, request }) => {
    const testPath = '/sprint-claridad-comercial';
    
    // Get initial response
    const initialResponse = await page.goto(`${BASE_URL}${testPath}`);
    const initialEtag = initialResponse?.headers()['etag'];
    const initialLastModified = initialResponse?.headers()['last-modified'];

    console.log(`Initial ETag: ${initialEtag}`);
    console.log(`Initial Last-Modified: ${initialLastModified}`);

    // Trigger revalidation via API
    const revalidateResponse = await request.post(`${BASE_URL}/api/revalidate?path=${testPath}`, {
      headers: {
        'Authorization': `Bearer ${process.env.REVALIDATE_TOKEN || 'test-token'}`
      }
    });

    if (revalidateResponse.ok()) {
      console.log('Revalidation triggered successfully');

      // Wait for revalidation to complete
      await page.waitForTimeout(5000);

      // Get post-revalidation response
      const revalidatedResponse = await page.goto(`${BASE_URL}${testPath}`, {
        waitUntil: 'networkidle'
      });

      const newEtag = revalidatedResponse?.headers()['etag'];
      const newLastModified = revalidatedResponse?.headers()['last-modified'];

      console.log(`New ETag: ${newEtag}`);
      console.log(`New Last-Modified: ${newLastModified}`);

      // Verify revalidation occurred
      if (initialEtag && newEtag) {
        expect(newEtag, 'ETag should change after revalidation').not.toBe(initialEtag);
      }

      if (initialLastModified && newLastModified) {
        expect(new Date(newLastModified).getTime()).toBeGreaterThanOrEqual(
          new Date(initialLastModified).getTime()
        );
      }
    } else {
      console.warn(`Revalidation API not available or failed: ${revalidateResponse.status()}`);
    }
  });

  test('ISR stale-while-revalidate behavior', async ({ page, browser }) => {
    const testPath = '/';
    
    // Create multiple browser contexts to simulate concurrent users
    const contexts = await Promise.all([
      browser.newContext(),
      browser.newContext(),
      browser.newContext()
    ]);

    const pages = await Promise.all(
      contexts.map(context => context.newPage())
    );

    try {
      // Make concurrent requests
      const startTime = Date.now();
      const responses = await Promise.all(
        pages.map(async (p, index) => {
          const response = await p.goto(`${BASE_URL}${testPath}`, {
            waitUntil: 'networkidle'
          });
          return {
            index,
            responseTime: Date.now() - startTime,
            cacheStatus: response?.headers()['x-cache'] || 'unknown',
            age: response?.headers()['age'] || '0'
          };
        })
      );

      console.log('\n=== CONCURRENT REQUEST ANALYSIS ===');
      responses.forEach(response => {
        console.log(`Request ${response.index}: ${response.responseTime}ms, cache: ${response.cacheStatus}, age: ${response.age}s`);
      });

      // All responses should be reasonably fast (stale-while-revalidate working)
      responses.forEach((response, index) => {
        expect(response.responseTime, `Request ${index} should be fast due to stale-while-revalidate`).toBeLessThan(5000);
      });

      // Response times should be similar (all served from cache)
      const responseTimes = responses.map(r => r.responseTime);
      const maxTime = Math.max(...responseTimes);
      const minTime = Math.min(...responseTimes);
      const timeDifference = maxTime - minTime;

      expect(timeDifference, 'Response time variance should be small (all from cache)').toBeLessThan(1000);

    } finally {
      // Cleanup
      await Promise.all(contexts.map(context => context.close()));
    }
  });

  test('ISR error handling and fallback', async ({ page }) => {
    // Test behavior when ISR generation fails
    const invalidPath = '/non-existent-page';
    
    const response = await page.goto(`${BASE_URL}${invalidPath}`, {
      waitUntil: 'networkidle'
    });

    // Should get 404 but quickly
    expect(response?.status()).toBe(404);
    
    // Response should still be fast (proper fallback)
    const responseTime = await measureResponseTime(page, `${BASE_URL}${invalidPath}`);
    expect(responseTime, 'Error fallback should be fast').toBeLessThan(2000);
  });

  test('ISR cache warming effectiveness', async ({ page, request }) => {
    // Test cache warming script effectiveness
    
    // Warm cache for all critical pages
    for (const pageConfig of ISR_PAGES) {
      console.log(`Warming cache for ${pageConfig.path}`);
      
      const warmingResponse = await request.get(`${BASE_URL}${pageConfig.path}`, {
        headers: {
          'User-Agent': 'Cache-Warming-Bot'
        }
      });

      expect(warmingResponse.ok()).toBeTruthy();
    }

    // Wait for warming to complete
    await page.waitForTimeout(3000);

    // Test that subsequent requests are fast
    for (const pageConfig of ISR_PAGES) {
      const startTime = Date.now();
      const response = await page.goto(`${BASE_URL}${pageConfig.path}`, {
        waitUntil: 'networkidle'
      });
      const responseTime = Date.now() - startTime;

      console.log(`Post-warming response time for ${pageConfig.path}: ${responseTime}ms`);
      
      // Should be fast due to warming
      expect(responseTime, `${pageConfig.path} should be fast after warming`).toBeLessThan(1500);
      
      // Should indicate cache hit
      const cacheStatus = response?.headers()['x-cache'] || '';
      if (cacheStatus) {
        expect(cacheStatus.toLowerCase()).toContain('hit');
      }
    }
  });

  test('ISR regeneration intervals', async ({ page }) => {
    // Test that pages respect their revalidation intervals
    const testPage = ISR_PAGES.find(p => p.path === '/sprint-claridad-comercial');
    if (!testPage) return;

    // First request
    const firstResponse = await page.goto(`${BASE_URL}${testPage.path}`);
    const firstEtag = firstResponse?.headers()['etag'];
    const firstTime = Date.now();

    // Wait less than revalidation interval
    await page.waitForTimeout(5000); // 5 seconds < 3600 seconds

    // Second request - should get cached version
    const secondResponse = await page.goto(`${BASE_URL}${testPage.path}`);
    const secondEtag = secondResponse?.headers()['etag'];

    if (firstEtag && secondEtag) {
      expect(secondEtag, 'Should get same version within revalidation interval').toBe(firstEtag);
    }

    console.log(`Revalidation interval test for ${testPage.path}:`);
    console.log(`- Interval: ${testPage.revalidate}s`);
    console.log(`- First ETag: ${firstEtag}`);
    console.log(`- Second ETag: ${secondEtag}`);
    console.log(`- Same version served: ${firstEtag === secondEtag}`);
  });
});

// Helper functions
async function analyzeResponse(response: any, requestType: string): Promise<ISRTestMetrics> {
  if (!response) {
    return {
      cacheHit: false,
      responseTime: 0,
      staleWhileRevalidate: false
    };
  }

  const timing = response.request().timing();
  const responseTime = timing.responseEnd - timing.requestStart;
  
  const headers = response.headers();
  const cacheStatus = headers['x-cache'] || headers['cf-cache-status'] || '';
  const age = parseInt(headers['age'] || '0');
  const cacheControl = headers['cache-control'] || '';
  
  const cacheHit = cacheStatus.toLowerCase().includes('hit') || age > 0;
  const staleWhileRevalidate = cacheControl.includes('stale-while-revalidate');

  return {
    cacheHit,
    responseTime,
    staleWhileRevalidate,
    lastModified: headers['last-modified'],
    etag: headers['etag']
  };
}

async function measureResponseTime(page: any, url: string): Promise<number> {
  const startTime = Date.now();
  await page.goto(url, { waitUntil: 'networkidle' });
  return Date.now() - startTime;
}