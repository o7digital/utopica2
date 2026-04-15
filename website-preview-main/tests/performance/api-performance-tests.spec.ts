import { test, expect } from '@playwright/test';

interface APIPerformanceMetrics {
  endpoint: string;
  method: string;
  responseTime: number;
  status: number;
  payloadSize: number;
  cacheHit: boolean;
  memoryUsage?: number;
}

interface LoadTestResult {
  endpoint: string;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  medianResponseTime: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
  requestsPerSecond: number;
  errorRate: number;
}

const API_ENDPOINTS = [
  { path: '/api/health', method: 'GET', expectedMaxTime: 100 },
  { path: '/api/cache/status', method: 'GET', expectedMaxTime: 200 },
  { path: '/api/workshops', method: 'GET', expectedMaxTime: 500 },
  { path: '/api/revalidate', method: 'POST', expectedMaxTime: 1000 },
];

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.describe('API Performance Tests', () => {
  test('API response time validation', async ({ request }) => {
    console.log('\n--- Testing API response times ---');
    
    const results: APIPerformanceMetrics[] = [];

    for (const endpoint of API_ENDPOINTS) {
      console.log(`\nTesting ${endpoint.method} ${endpoint.path}`);
      
      const measurements: number[] = [];
      
      // Make multiple requests to get accurate measurements
      for (let i = 0; i < 10; i++) {
        const startTime = Date.now();
        
        let response;
        if (endpoint.method === 'GET') {
          response = await request.get(`${BASE_URL}${endpoint.path}`);
        } else if (endpoint.method === 'POST') {
          response = await request.post(`${BASE_URL}${endpoint.path}`, {
            data: JSON.stringify({ test: true }),
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        measurements.push(responseTime);

        if (response) {
          const headers = await response.allHeaders();
          const payloadSize = parseInt(headers['content-length'] || '0');
          const cacheStatus = headers['x-cache'] || headers['cf-cache-status'] || '';
          
          results.push({
            endpoint: endpoint.path,
            method: endpoint.method,
            responseTime,
            status: response.status(),
            payloadSize,
            cacheHit: cacheStatus.toLowerCase().includes('hit')
          });
        }

        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Calculate statistics
      measurements.sort((a, b) => a - b);
      const average = measurements.reduce((a, b) => a + b, 0) / measurements.length;
      const median = measurements[Math.floor(measurements.length / 2)];
      const p95 = measurements[Math.floor(measurements.length * 0.95)];
      const p99 = measurements[Math.floor(measurements.length * 0.99)];

      console.log(`- Average: ${average.toFixed(1)}ms`);
      console.log(`- Median: ${median}ms`);
      console.log(`- P95: ${p95}ms`);
      console.log(`- P99: ${p99}ms`);
      console.log(`- Expected max: ${endpoint.expectedMaxTime}ms`);

      // Assertions
      expect(average, `${endpoint.path} average response time should be under ${endpoint.expectedMaxTime}ms`).toBeLessThan(endpoint.expectedMaxTime);
      expect(p95, `${endpoint.path} P95 response time should be reasonable`).toBeLessThan(endpoint.expectedMaxTime * 2);
    }

    // Overall API performance summary
    const overallAverage = results.reduce((sum, r) => sum + r.responseTime, 0) / results.length;
    const cacheHitRate = results.filter(r => r.cacheHit).length / results.length;
    
    console.log(`\n=== API PERFORMANCE SUMMARY ===`);
    console.log(`Overall average response time: ${overallAverage.toFixed(1)}ms`);
    console.log(`Cache hit rate: ${(cacheHitRate * 100).toFixed(1)}%`);
  });

  test('API load testing', async ({ request }) => {
    console.log('\n--- API Load Testing ---');
    
    const concurrentUsers = 20;
    const requestsPerUser = 10;
    const testEndpoint = '/api/health';

    console.log(`Testing ${testEndpoint} with ${concurrentUsers} concurrent users, ${requestsPerUser} requests each`);

    const startTime = Date.now();
    const allResults: Array<{ responseTime: number; status: number; success: boolean }> = [];

    // Create concurrent load
    const userPromises = Array.from({ length: concurrentUsers }, async (_, userIndex) => {
      const userResults = [];
      
      for (let requestIndex = 0; requestIndex < requestsPerUser; requestIndex++) {
        const requestStart = Date.now();
        
        try {
          const response = await request.get(`${BASE_URL}${testEndpoint}`);
          const requestEnd = Date.now();
          
          userResults.push({
            responseTime: requestEnd - requestStart,
            status: response.status(),
            success: response.ok()
          });
        } catch (error) {
          userResults.push({
            responseTime: Date.now() - requestStart,
            status: 0,
            success: false
          });
        }
      }
      
      return userResults;
    });

    // Wait for all requests to complete
    const userResults = await Promise.all(userPromises);
    const endTime = Date.now();
    const totalTestTime = endTime - startTime;

    // Flatten results
    userResults.forEach(results => allResults.push(...results));

    // Calculate metrics
    const totalRequests = allResults.length;
    const successfulRequests = allResults.filter(r => r.success).length;
    const failedRequests = totalRequests - successfulRequests;
    const responseTimes = allResults.map(r => r.responseTime).sort((a, b) => a - b);
    
    const averageResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
    const medianResponseTime = responseTimes[Math.floor(responseTimes.length / 2)];
    const p95ResponseTime = responseTimes[Math.floor(responseTimes.length * 0.95)];
    const p99ResponseTime = responseTimes[Math.floor(responseTimes.length * 0.99)];
    const requestsPerSecond = totalRequests / (totalTestTime / 1000);
    const errorRate = failedRequests / totalRequests;

    const loadTestResult: LoadTestResult = {
      endpoint: testEndpoint,
      totalRequests,
      successfulRequests,
      failedRequests,
      averageResponseTime,
      medianResponseTime,
      p95ResponseTime,
      p99ResponseTime,
      requestsPerSecond,
      errorRate
    };

    console.log(`\n=== LOAD TEST RESULTS ===`);
    console.log(`Total requests: ${totalRequests}`);
    console.log(`Successful: ${successfulRequests}`);
    console.log(`Failed: ${failedRequests}`);
    console.log(`Error rate: ${(errorRate * 100).toFixed(2)}%`);
    console.log(`Average response time: ${averageResponseTime.toFixed(1)}ms`);
    console.log(`Median response time: ${medianResponseTime}ms`);
    console.log(`P95 response time: ${p95ResponseTime}ms`);
    console.log(`P99 response time: ${p99ResponseTime}ms`);
    console.log(`Requests per second: ${requestsPerSecond.toFixed(1)}`);
    console.log(`Test duration: ${totalTestTime}ms`);

    // Assertions
    expect(errorRate, 'Error rate should be < 5%').toBeLessThan(0.05);
    expect(requestsPerSecond, 'Should handle at least 10 requests per second').toBeGreaterThan(10);
    expect(p95ResponseTime, 'P95 response time should be reasonable under load').toBeLessThan(1000);
  });

  test('API concurrent stress testing', async ({ request }) => {
    console.log('\n--- API Concurrent Stress Testing ---');
    
    const stressLevels = [5, 10, 20, 50];
    const requestsPerLevel = 5;
    const testEndpoint = '/api/workshops';

    for (const concurrency of stressLevels) {
      console.log(`\nTesting with ${concurrency} concurrent requests`);
      
      const promises = Array.from({ length: concurrency }, async () => {
        const startTime = Date.now();
        const response = await request.get(`${BASE_URL}${testEndpoint}`);
        const endTime = Date.now();
        
        return {
          responseTime: endTime - startTime,
          status: response.status(),
          success: response.ok()
        };
      });

      const results = await Promise.all(promises);
      
      const successRate = results.filter(r => r.success).length / results.length;
      const avgResponseTime = results.reduce((sum, r) => sum + r.responseTime, 0) / results.length;
      const maxResponseTime = Math.max(...results.map(r => r.responseTime));
      
      console.log(`- Success rate: ${(successRate * 100).toFixed(1)}%`);
      console.log(`- Average response time: ${avgResponseTime.toFixed(1)}ms`);
      console.log(`- Max response time: ${maxResponseTime}ms`);
      
      // Under stress, success rate should still be high
      expect(successRate, `Success rate should remain high at ${concurrency} concurrent requests`).toBeGreaterThan(0.95);
      
      // Response times may increase but shouldn't be excessive
      expect(avgResponseTime, `Average response time should be reasonable at ${concurrency} concurrent requests`).toBeLessThan(2000);
    }
  });

  test('API memory usage during load', async ({ page, request }) => {
    console.log('\n--- Testing API memory usage during load ---');
    
    // Navigate to a page to establish baseline
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    
    const initialMemory = await page.evaluate(() => {
      if ('memory' in performance) {
        return (performance as any).memory.usedJSHeapSize;
      }
      return 0;
    });

    console.log(`Initial memory: ${(initialMemory / 1024 / 1024).toFixed(2)} MB`);

    // Generate API load
    const loadPromises = Array.from({ length: 50 }, async (_, index) => {
      await new Promise(resolve => setTimeout(resolve, index * 100)); // Stagger requests
      return request.get(`${BASE_URL}/api/workshops`);
    });

    await Promise.all(loadPromises);
    
    // Measure memory after load
    await page.waitForTimeout(2000); // Allow for cleanup
    
    const finalMemory = await page.evaluate(() => {
      if ('memory' in performance) {
        return (performance as any).memory.usedJSHeapSize;
      }
      return 0;
    });

    const memoryIncrease = finalMemory - initialMemory;
    const memoryIncreaseMB = memoryIncrease / 1024 / 1024;

    console.log(`Final memory: ${(finalMemory / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Memory increase: ${memoryIncreaseMB.toFixed(2)} MB`);

    // Memory increase should be reasonable
    expect(memoryIncreaseMB, 'Memory increase should be reasonable').toBeLessThan(20);
  });

  test('API error handling under load', async ({ request }) => {
    console.log('\n--- Testing API error handling under load ---');
    
    const concurrentRequests = 10;
    const invalidEndpoints = [
      '/api/nonexistent',
      '/api/workshops/invalid',
      '/api/cache/invalid-action'
    ];

    for (const endpoint of invalidEndpoints) {
      console.log(`\nTesting error handling for ${endpoint}`);
      
      const promises = Array.from({ length: concurrentRequests }, async () => {
        const startTime = Date.now();
        const response = await request.get(`${BASE_URL}${endpoint}`);
        const endTime = Date.now();
        
        return {
          responseTime: endTime - startTime,
          status: response.status(),
          hasErrorResponse: response.status() >= 400
        };
      });

      const results = await Promise.all(promises);
      
      const avgResponseTime = results.reduce((sum, r) => sum + r.responseTime, 0) / results.length;
      const errorResponseRate = results.filter(r => r.hasErrorResponse).length / results.length;
      
      console.log(`- Average error response time: ${avgResponseTime.toFixed(1)}ms`);
      console.log(`- Error response rate: ${(errorResponseRate * 100).toFixed(1)}%`);
      
      // Error responses should be fast and consistent
      expect(avgResponseTime, 'Error responses should be fast').toBeLessThan(500);
      expect(errorResponseRate, 'Should consistently return error responses').toBe(1);
    }
  });

  test('API rate limiting behavior', async ({ request }) => {
    console.log('\n--- Testing API rate limiting ---');
    
    const testEndpoint = '/api/workshops';
    const rapidRequests = 100;
    const requestInterval = 10; // 10ms between requests

    console.log(`Making ${rapidRequests} rapid requests to test rate limiting`);
    
    const results = [];
    
    for (let i = 0; i < rapidRequests; i++) {
      const startTime = Date.now();
      const response = await request.get(`${BASE_URL}${testEndpoint}`);
      const endTime = Date.now();
      
      results.push({
        requestNumber: i + 1,
        responseTime: endTime - startTime,
        status: response.status(),
        rateLimited: response.status() === 429
      });
      
      if (i < rapidRequests - 1) {
        await new Promise(resolve => setTimeout(resolve, requestInterval));
      }
    }

    const rateLimitedRequests = results.filter(r => r.rateLimited).length;
    const successfulRequests = results.filter(r => r.status === 200).length;
    const avgSuccessfulResponseTime = results
      .filter(r => r.status === 200)
      .reduce((sum, r) => sum + r.responseTime, 0) / successfulRequests;

    console.log(`\n=== RATE LIMITING ANALYSIS ===`);
    console.log(`Total requests: ${rapidRequests}`);
    console.log(`Successful requests: ${successfulRequests}`);
    console.log(`Rate limited requests: ${rateLimitedRequests}`);
    console.log(`Average successful response time: ${avgSuccessfulResponseTime.toFixed(1)}ms`);

    // If rate limiting is implemented, should see some 429 responses
    // If not implemented, all should succeed but with reasonable performance
    if (rateLimitedRequests > 0) {
      console.log('Rate limiting is active');
      expect(rateLimitedRequests, 'Rate limiting should kick in under rapid requests').toBeGreaterThan(0);
    } else {
      console.log('No rate limiting detected');
      expect(avgSuccessfulResponseTime, 'Should maintain performance even without rate limiting').toBeLessThan(1000);
    }
  });

  test('API payload size optimization', async ({ request }) => {
    console.log('\n--- Testing API payload size optimization ---');
    
    const endpoints = [
      '/api/health',
      '/api/cache/status',
      '/api/workshops'
    ];

    for (const endpoint of endpoints) {
      const response = await request.get(`${BASE_URL}${endpoint}`);
      
      if (response.ok()) {
        const headers = await response.allHeaders();
        const contentLength = parseInt(headers['content-length'] || '0');
        const contentEncoding = headers['content-encoding'] || 'none';
        
        console.log(`\n${endpoint}:`);
        console.log(`- Content length: ${contentLength} bytes`);
        console.log(`- Content encoding: ${contentEncoding}`);
        
        // API responses should be reasonably sized
        if (endpoint === '/api/health') {
          expect(contentLength, 'Health endpoint should be lightweight').toBeLessThan(500);
        } else if (endpoint === '/api/workshops') {
          expect(contentLength, 'Workshops endpoint should be reasonably sized').toBeLessThan(10000);
        }
        
        // Check for compression
        if (contentLength > 1000) {
          const isCompressed = contentEncoding === 'gzip' || contentEncoding === 'br';
          if (isCompressed) {
            console.log(`  ✓ Response is compressed`);
          } else {
            console.log(`  ⚠ Large response is not compressed`);
          }
        }
      }
    }
  });
});

test.describe('API Performance Regression Tests', () => {
  test('Performance baseline comparison', async ({ request }) => {
    console.log('\n--- API Performance Baseline Comparison ---');
    
    // Load baseline if available
    const baseline = await loadApiBaseline();
    const currentResults: APIPerformanceMetrics[] = [];

    for (const endpoint of API_ENDPOINTS) {
      const measurements = [];
      
      for (let i = 0; i < 5; i++) {
        const startTime = Date.now();
        const response = await request.get(`${BASE_URL}${endpoint.path}`);
        const endTime = Date.now();
        
        measurements.push(endTime - startTime);
      }
      
      const averageTime = measurements.reduce((a, b) => a + b, 0) / measurements.length;
      
      currentResults.push({
        endpoint: endpoint.path,
        method: endpoint.method,
        responseTime: averageTime,
        status: 200,
        payloadSize: 0,
        cacheHit: false
      });
    }

    // Compare with baseline
    if (baseline) {
      console.log('\n=== PERFORMANCE COMPARISON ===');
      
      for (const current of currentResults) {
        const baselineMetric = baseline.find(b => b.endpoint === current.endpoint);
        
        if (baselineMetric) {
          const improvement = ((baselineMetric.responseTime - current.responseTime) / baselineMetric.responseTime) * 100;
          
          console.log(`${current.endpoint}:`);
          console.log(`  Baseline: ${baselineMetric.responseTime.toFixed(1)}ms`);
          console.log(`  Current: ${current.responseTime.toFixed(1)}ms`);
          console.log(`  Change: ${improvement > 0 ? '+' : ''}${improvement.toFixed(1)}%`);
          
          // Performance shouldn't regress significantly
          expect(current.responseTime, `${current.endpoint} shouldn't regress significantly`).toBeLessThan(baselineMetric.responseTime * 1.5);
        }
      }
    }

    // Save current results as new baseline
    await saveApiBaseline(currentResults);
  });
});

// Helper functions
async function loadApiBaseline(): Promise<APIPerformanceMetrics[] | null> {
  try {
    const fs = require('fs');
    const path = require('path');
    const baselinePath = path.join(process.cwd(), 'api-performance-baseline.json');
    
    if (fs.existsSync(baselinePath)) {
      const data = fs.readFileSync(baselinePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.warn('Failed to load API baseline:', error);
  }
  return null;
}

async function saveApiBaseline(results: APIPerformanceMetrics[]): Promise<void> {
  try {
    const fs = require('fs');
    const path = require('path');
    
    const baselinePath = path.join(process.cwd(), 'api-performance-baseline.json');
    fs.writeFileSync(baselinePath, JSON.stringify(results, null, 2));
    console.log(`API performance baseline saved to ${baselinePath}`);
  } catch (error) {
    console.warn('Failed to save API baseline:', error);
  }
}