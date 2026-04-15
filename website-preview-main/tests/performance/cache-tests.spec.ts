import { test, expect } from '@playwright/test';

interface CacheTestMetrics {
  hitRatio: number;
  avgResponseTime: number;
  cacheEffectiveness: number;
  invalidationSuccess: boolean;
}

interface CacheResponse {
  status: string;
  responseTime: number;
  headers: { [key: string]: string };
  cacheAge: number;
  isCacheHit: boolean;
}

const API_ENDPOINTS = [
  '/api/cache/status',
  '/api/health',
  '/api/workshops',
];

const STATIC_ASSETS = [
  '/_next/static/css/',
  '/_next/static/js/',
  '/images/',
];

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.describe('Cache Behavior Tests', () => {
  test('API cache hit ratio validation', async ({ page, request }) => {
    const results: { [endpoint: string]: CacheTestMetrics } = {};

    for (const endpoint of API_ENDPOINTS) {
      console.log(`\n--- Testing cache for ${endpoint} ---`);
      
      const responses: CacheResponse[] = [];
      
      // Make multiple requests to test cache behavior
      for (let i = 0; i < 5; i++) {
        const startTime = Date.now();
        const response = await request.get(`${BASE_URL}${endpoint}`);
        const endTime = Date.now();
        
        const headers = await response.allHeaders();
        const cacheAge = parseInt(headers['age'] || '0');
        const cacheStatus = headers['x-cache'] || headers['cf-cache-status'] || '';
        
        responses.push({
          status: response.status().toString(),
          responseTime: endTime - startTime,
          headers,
          cacheAge,
          isCacheHit: cacheStatus.toLowerCase().includes('hit') || cacheAge > 0
        });

        // Small delay between requests
        await page.waitForTimeout(500);
      }

      // Calculate metrics
      const hitCount = responses.filter(r => r.isCacheHit).length;
      const hitRatio = hitCount / responses.length;
      const avgResponseTime = responses.reduce((sum, r) => sum + r.responseTime, 0) / responses.length;
      
      // Cache effectiveness (how much faster cache hits are)
      const cacheHits = responses.filter(r => r.isCacheHit);
      const cacheMisses = responses.filter(r => !r.isCacheHit);
      const cacheEffectiveness = cacheMisses.length > 0 && cacheHits.length > 0 
        ? (cacheMisses.reduce((sum, r) => sum + r.responseTime, 0) / cacheMisses.length) /
          (cacheHits.reduce((sum, r) => sum + r.responseTime, 0) / cacheHits.length)
        : 1;

      results[endpoint] = {
        hitRatio,
        avgResponseTime,
        cacheEffectiveness,
        invalidationSuccess: true // Will be tested separately
      };

      console.log(`Hit ratio: ${(hitRatio * 100).toFixed(1)}%`);
      console.log(`Average response time: ${avgResponseTime.toFixed(1)}ms`);
      console.log(`Cache effectiveness: ${cacheEffectiveness.toFixed(2)}x faster`);

      // Assertions
      if (endpoint !== '/api/health') { // Health endpoint might not be cached
        expect(hitRatio, `${endpoint} should have cache hit ratio > 60%`).toBeGreaterThan(0.6);
      }
      expect(avgResponseTime, `${endpoint} should respond quickly`).toBeLessThan(1000);
    }

    // Overall cache performance
    const overallHitRatio = Object.values(results).reduce((sum, r) => sum + r.hitRatio, 0) / Object.keys(results).length;
    console.log(`\n=== OVERALL CACHE PERFORMANCE ===`);
    console.log(`Overall hit ratio: ${(overallHitRatio * 100).toFixed(1)}%`);
    
    expect(overallHitRatio, 'Overall cache hit ratio should be > 70%').toBeGreaterThan(0.7);
  });

  test('Cache invalidation behavior', async ({ page, request }) => {
    const testEndpoint = '/api/workshops';
    
    // Initial request to populate cache
    console.log('Populating cache...');
    const initialResponse = await request.get(`${BASE_URL}${testEndpoint}`);
    const initialEtag = (await initialResponse.allHeaders())['etag'];
    
    // Confirm cache hit on second request
    await page.waitForTimeout(1000);
    const cachedResponse = await request.get(`${BASE_URL}${testEndpoint}`);
    const cachedHeaders = await cachedResponse.allHeaders();
    const cacheAge = parseInt(cachedHeaders['age'] || '0');
    
    console.log(`Initial ETag: ${initialEtag}`);
    console.log(`Cache age on second request: ${cacheAge}s`);
    
    // Invalidate cache via revalidation API
    console.log('Triggering cache invalidation...');
    const revalidateResponse = await request.post(`${BASE_URL}/api/revalidate`, {
      data: JSON.stringify({ path: testEndpoint }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REVALIDATE_TOKEN || 'test-token'}`
      }
    });

    if (revalidateResponse.ok()) {
      console.log('Cache invalidation triggered successfully');
      
      // Wait for invalidation to process
      await page.waitForTimeout(3000);
      
      // Request after invalidation
      const postInvalidationResponse = await request.get(`${BASE_URL}${testEndpoint}`);
      const postInvalidationHeaders = await postInvalidationResponse.allHeaders();
      const newEtag = postInvalidationHeaders['etag'];
      const newAge = parseInt(postInvalidationHeaders['age'] || '0');
      
      console.log(`New ETag: ${newEtag}`);
      console.log(`New age: ${newAge}s`);
      
      // Verify invalidation worked
      if (initialEtag && newEtag) {
        // ETag should be different OR age should be 0 (fresh)
        const invalidationSuccessful = (initialEtag !== newEtag) || (newAge < cacheAge);
        expect(invalidationSuccessful, 'Cache should be invalidated (different ETag or fresh age)').toBeTruthy();
      }
    } else {
      console.warn(`Cache invalidation API not available: ${revalidateResponse.status()}`);
    }
  });

  test('Static asset caching', async ({ page }) => {
    console.log('\n--- Testing static asset caching ---');
    
    // Navigate to a page to trigger asset loading
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    
    // Collect network requests for static assets
    const staticRequests: any[] = [];
    
    page.on('response', (response) => {
      const url = response.url();
      const isStaticAsset = STATIC_ASSETS.some(asset => url.includes(asset));
      
      if (isStaticAsset) {
        staticRequests.push({
          url,
          status: response.status(),
          headers: response.headers(),
          fromCache: response.fromServiceWorker() || response.headers()['cf-cache-status'] === 'HIT'
        });
      }
    });

    // Navigate to another page to test asset reuse
    await page.goto(`${BASE_URL}/sprint-claridad-comercial`, { waitUntil: 'networkidle' });
    
    // Wait a bit more to capture all requests
    await page.waitForTimeout(2000);

    console.log(`Captured ${staticRequests.length} static asset requests`);

    // Analyze static asset caching
    const cssRequests = staticRequests.filter(req => req.url.includes('.css'));
    const jsRequests = staticRequests.filter(req => req.url.includes('.js'));
    const imageRequests = staticRequests.filter(req => req.url.includes('/images/'));

    // CSS and JS should have long cache headers
    [...cssRequests, ...jsRequests].forEach(req => {
      const cacheControl = req.headers['cache-control'] || '';
      const maxAge = extractMaxAge(cacheControl);
      
      console.log(`Asset: ${req.url.split('/').pop()}`);
      console.log(`Cache-Control: ${cacheControl}`);
      console.log(`Max-Age: ${maxAge}s`);
      
      // Static assets should have long cache times (at least 1 day)
      expect(maxAge, `Static asset should have max-age >= 86400s (1 day)`).toBeGreaterThanOrEqual(86400);
    });

    // Images should also be cached
    imageRequests.forEach(req => {
      const cacheControl = req.headers['cache-control'] || '';
      const maxAge = extractMaxAge(cacheControl);
      
      if (maxAge > 0) {
        expect(maxAge, `Image should have reasonable cache time`).toBeGreaterThanOrEqual(3600); // At least 1 hour
      }
    });
  });

  test('Cache status endpoint validation', async ({ request }) => {
    console.log('\n--- Testing cache status endpoint ---');
    
    const response = await request.get(`${BASE_URL}/api/cache/status`);
    
    if (response.ok()) {
      const cacheStatus = await response.json();
      
      console.log('Cache Status Response:', JSON.stringify(cacheStatus, null, 2));
      
      // Validate cache status structure
      expect(cacheStatus).toHaveProperty('status');
      expect(cacheStatus).toHaveProperty('timestamp');
      
      if (cacheStatus.hitRatio !== undefined) {
        expect(cacheStatus.hitRatio, 'Hit ratio should be between 0 and 1').toBeGreaterThanOrEqual(0);
        expect(cacheStatus.hitRatio, 'Hit ratio should be between 0 and 1').toBeLessThanOrEqual(1);
      }
      
      if (cacheStatus.metrics) {
        expect(cacheStatus.metrics).toHaveProperty('hits');
        expect(cacheStatus.metrics).toHaveProperty('misses');
        
        const totalRequests = cacheStatus.metrics.hits + cacheStatus.metrics.misses;
        if (totalRequests > 0) {
          const calculatedHitRatio = cacheStatus.metrics.hits / totalRequests;
          console.log(`Calculated hit ratio: ${(calculatedHitRatio * 100).toFixed(1)}%`);
          
          // Target: >85% cache hit ratio
          expect(calculatedHitRatio, 'Cache hit ratio should be > 85%').toBeGreaterThan(0.85);
        }
      }
    } else {
      console.warn(`Cache status endpoint not available: ${response.status()}`);
    }
  });

  test('Browser cache behavior', async ({ page }) => {
    console.log('\n--- Testing browser cache behavior ---');
    
    // First visit
    const navigationPromise = page.waitForLoadState('networkidle');
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
    await navigationPromise;
    
    const firstLoadTime = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return navigation.loadEventEnd - navigation.fetchStart;
    });

    console.log(`First load time: ${firstLoadTime}ms`);
    
    // Reload the page (should use browser cache)
    await page.reload({ waitUntil: 'networkidle' });
    
    const reloadTime = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return navigation.loadEventEnd - navigation.fetchStart;
    });

    console.log(`Reload time: ${reloadTime}ms`);
    
    // Reload should be significantly faster due to browser caching
    const improvementRatio = firstLoadTime / reloadTime;
    console.log(`Improvement ratio: ${improvementRatio.toFixed(2)}x`);
    
    expect(reloadTime, 'Reload should be faster than initial load').toBeLessThan(firstLoadTime);
    expect(improvementRatio, 'Reload should be at least 1.5x faster').toBeGreaterThan(1.5);
  });

  test('CDN cache behavior', async ({ page, request }) => {
    console.log('\n--- Testing CDN cache behavior ---');
    
    // Test multiple requests to check CDN caching
    const testUrl = `${BASE_URL}/`;
    const requests = [];
    
    for (let i = 0; i < 3; i++) {
      const startTime = Date.now();
      const response = await request.get(testUrl);
      const endTime = Date.now();
      
      const headers = await response.allHeaders();
      
      requests.push({
        attempt: i + 1,
        responseTime: endTime - startTime,
        cdnStatus: headers['cf-cache-status'] || headers['x-cache'] || 'unknown',
        age: headers['age'] || '0',
        server: headers['server'] || 'unknown'
      });
      
      await page.waitForTimeout(1000);
    }

    console.log('\nCDN Cache Analysis:');
    requests.forEach(req => {
      console.log(`Attempt ${req.attempt}: ${req.responseTime}ms, CDN: ${req.cdnStatus}, Age: ${req.age}s`);
    });

    // Later requests should be faster or show cache hits
    const firstRequest = requests[0];
    const laterRequests = requests.slice(1);
    
    laterRequests.forEach((req, index) => {
      // Should be cache hit or faster response
      const isCacheHit = req.cdnStatus.toLowerCase().includes('hit');
      const isFaster = req.responseTime < firstRequest.responseTime;
      
      if (!isCacheHit && !isFaster) {
        console.warn(`Request ${req.attempt} might not be using CDN cache effectively`);
      }
    });
  });
});

// Helper function
function extractMaxAge(cacheControl: string): number {
  const match = cacheControl.match(/max-age=(\d+)/);
  return match ? parseInt(match[1]) : 0;
}