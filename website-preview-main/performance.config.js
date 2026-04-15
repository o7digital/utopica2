/**
 * Performance Testing Configuration
 * 
 * Centralized configuration for all performance tests and benchmarks
 * based on the Meridian Plan targets.
 */

module.exports = {
  // Performance targets based on Meridian Plan Phase 6
  targets: {
    webVitals: {
      lcp: 1500,    // Largest Contentful Paint < 1.5s (currently ~2.5s)
      fid: 100,     // First Input Delay < 100ms (currently ~150ms)  
      cls: 0.1,     // Cumulative Layout Shift < 0.1 (currently ~0.15)
      ttfb: 300,    // Time to First Byte < 300ms (currently ~800ms)
      fcp: 1000,    // First Contentful Paint < 1.0s
      inp: 200,     // Interaction to Next Paint < 200ms
    },
    
    lighthouse: {
      performance: 90,      // Lighthouse performance score > 90
      accessibility: 95,    // Accessibility score > 95
      bestPractices: 90,   // Best practices score > 90
      seo: 95,             // SEO score > 95
    },
    
    cache: {
      hitRatio: 0.85,           // Cache hit ratio > 85%
      responseTime: 500,        // Average response time < 500ms
      apiResponseTime: 200,     // API response time < 200ms
      staticAssetMaxAge: 86400, // Static assets cached for 24h+
    },
    
    isr: {
      cacheHitRatio: 0.85,     // ISR cache hit ratio > 85%
      revalidationTime: 5000,  // Revalidation time < 5s
      staleWhileRevalidate: true, // SWR should be enabled
    },
    
    api: {
      healthMaxTime: 100,        // Health endpoint < 100ms
      workshopsMaxTime: 500,     // Workshops endpoint < 500ms
      cacheStatusMaxTime: 200,   // Cache status < 200ms
      errorRecoveryRate: 0.95,   // Error recovery rate > 95%
      concurrentUsers: 50,       // Handle 50+ concurrent users
      requestsPerSecond: 10,     // Handle 10+ RPS
      errorRate: 0.05,          // Error rate < 5%
    },
    
    memory: {
      maxIncrease: 50,          // Memory increase < 50MB during tests
      leakThreshold: 20,        // Memory leak threshold < 20MB
    }
  },

  // Test configuration
  testing: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    timeout: 120000,           // Global timeout 2 minutes
    retries: 2,                // Retry failed tests 2 times
    workers: process.env.CI ? 1 : 4, // Parallel workers
    
    // Load testing parameters
    loadTest: {
      concurrentUsers: 20,
      requestsPerUser: 10,
      rampUpTime: 5000,        // 5s ramp up
      sustainTime: 30000,      // 30s sustained load
      rampDownTime: 5000,      // 5s ramp down
    },
    
    // Stress testing parameters
    stressTest: {
      maxConcurrentUsers: 100,
      stressDuration: 60000,   // 1 minute stress test
      breakingPoint: 200,      // Expected breaking point
    }
  },

  // Pages to test
  pages: [
    {
      path: '/',
      name: 'Homepage',
      revalidate: 60,
      critical: true,
      expectedLCP: 1200,       // Stricter target for homepage
    },
    {
      path: '/sprint-claridad-comercial',
      name: 'Sprint Landing',
      revalidate: 3600,
      critical: true,
      expectedLCP: 1500,
    },
    {
      path: '/equipo',
      name: 'Team Page',
      revalidate: 1800,
      critical: false,
      expectedLCP: 1800,
    }
  ],

  // API endpoints to test
  endpoints: [
    {
      path: '/api/health',
      method: 'GET',
      maxTime: 100,
      cached: false,
      critical: true,
    },
    {
      path: '/api/cache/status',
      method: 'GET',
      maxTime: 200,
      cached: true,
      critical: true,
    },
    {
      path: '/api/workshops',
      method: 'GET',
      maxTime: 500,
      cached: true,
      critical: true,
    },
    {
      path: '/api/revalidate',
      method: 'POST',
      maxTime: 1000,
      cached: false,
      critical: false,
      requiresAuth: true,
    }
  ],

  // Static assets to validate
  assets: {
    css: {
      maxSize: 200000,         // 200KB max CSS bundle
      cacheTime: 31536000,     // 1 year cache
    },
    js: {
      maxSize: 1000000,        // 1MB max JS bundle
      cacheTime: 31536000,     // 1 year cache
    },
    images: {
      maxSize: 500000,         // 500KB max per image
      cacheTime: 86400,        // 1 day cache
    }
  },

  // Error scenarios to test
  errorScenarios: [
    {
      name: 'Component Error',
      trigger: 'component-error',
      expectedRecovery: true,
      maxRecoveryTime: 3000,
    },
    {
      name: 'API Error',
      trigger: 'api-500-error',
      expectedRecovery: true,
      maxRecoveryTime: 2000,
    },
    {
      name: 'Network Failure',
      trigger: 'network-offline',
      expectedRecovery: true,
      maxRecoveryTime: 5000,
    },
    {
      name: 'Memory Pressure',
      trigger: 'memory-stress',
      expectedRecovery: true,
      maxRecoveryTime: 10000,
    }
  ],

  // Reporting configuration
  reporting: {
    outputDir: './performance-reports',
    formats: ['json', 'html', 'csv'],
    includeBaseline: true,
    includeScreenshots: true,
    includeVideos: false,
    retention: {
      daily: 30,     // Keep daily reports for 30 days
      weekly: 90,    // Keep weekly reports for 90 days
      baseline: 365, // Keep baseline reports for 1 year
    }
  },

  // CI/CD integration
  ci: {
    failOnRegression: true,
    regressionThreshold: 0.1,  // 10% performance regression fails build
    compareWithBaseline: true,
    generatePRComments: true,
    uploadArtifacts: true,
  },

  // Monitoring configuration
  monitoring: {
    enabled: process.env.NODE_ENV === 'production',
    interval: 3600000,         // 1 hour interval
    alertThresholds: {
      lcp: 2000,               // Alert if LCP > 2s
      errorRate: 0.05,         // Alert if error rate > 5%
      cacheHitRatio: 0.8,      // Alert if cache hit ratio < 80%
    },
    webhookUrl: process.env.PERFORMANCE_WEBHOOK_URL,
  },

  // Environment-specific overrides
  environments: {
    development: {
      targets: {
        // Relaxed targets for development
        webVitals: {
          lcp: 3000,
          fid: 200,
          cls: 0.2,
          ttfb: 1000,
        }
      }
    },
    
    staging: {
      // Use default targets
    },
    
    production: {
      // Stricter targets for production
      targets: {
        webVitals: {
          lcp: 1200,    // Even stricter for production
          fid: 80,
          cls: 0.08,
          ttfb: 250,
        }
      }
    }
  },

  // Feature flags for testing
  features: {
    enableWebVitalsTests: true,
    enableISRTests: true,
    enableCacheTests: true,
    enableErrorBoundaryTests: true,
    enableAPIPerformanceTests: true,
    enableLoadTests: process.env.NODE_ENV !== 'development',
    enableStressTests: false, // Only enable for specific test runs
    enableMemoryTests: true,
    enableNetworkTests: true,
    enableAccessibilityTests: true,
  },

  // Debug configuration
  debug: {
    verbose: process.env.DEBUG_PERFORMANCE === 'true',
    saveFailedTests: true,
    captureNetworkLogs: true,
    captureConsoleErrors: true,
    generateHAR: false, // HTTP Archive files for debugging
  }
};

// Helper function to get environment-specific config
function getConfig(environment = process.env.NODE_ENV || 'development') {
  const config = module.exports;
  const envOverrides = config.environments[environment] || {};
  
  // Deep merge environment overrides
  return mergeDeep(config, envOverrides);
}

// Deep merge utility
function mergeDeep(target, source) {
  const output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target))
          Object.assign(output, { [key]: source[key] });
        else
          output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

module.exports.getConfig = getConfig;