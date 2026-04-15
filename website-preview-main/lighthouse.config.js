/**
 * Lighthouse CI Configuration
 * Optimized for Meridian Performance Plan
 */

const MERIDIAN_PERFORMANCE_BUDGETS = {
  // Performance Budgets (based on Meridian targets)
  performance: 90,    // Lighthouse score > 90
  accessibility: 95,  // Accessibility score > 95
  bestPractices: 90,  // Best practices score > 90
  seo: 95,           // SEO score > 95

  // Web Vitals Budgets
  lcp: 1500,         // < 1.5s
  fid: 100,          // < 100ms
  cls: 0.1,          // < 0.1
  ttfb: 300,         // < 300ms
  fcp: 1200,         // < 1.2s
  si: 2500,          // < 2.5s
  tbt: 300,          // < 300ms

  // Resource Budgets
  totalSize: 1024,   // < 1MB total
  imageSize: 512,    // < 512KB images
  jsSize: 256,       // < 256KB JS
  cssSize: 64,       // < 64KB CSS
  fontSize: 128,     // < 128KB fonts
};

const CI_URLS = [
  'http://localhost:3000',                         // Homepage
  'http://localhost:3000/sprint-claridad-comercial',  // Sprint landing
  'http://localhost:3000/equipo',                 // Team page
  'http://localhost:3000/api/workshops',          // API endpoint
];

const PRODUCTION_URLS = [
  'https://utopica.website',
  'https://utopica.website/sprint-claridad-comercial',
  'https://utopica.website/equipo',
];

module.exports = {
  ci: {
    collect: {
      // URL collection settings
      url: process.env.NODE_ENV === 'production' ? PRODUCTION_URLS : CI_URLS,
      
      // Chrome launch settings
      chromePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
      chromeFlags: [
        '--headless',
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-web-security',
        '--disable-features=TranslateUI',
        '--disable-ipc-flooding-protection',
        '--ignore-certificate-errors',
        '--ignore-ssl-errors',
        '--allow-running-insecure-content',
      ],
      
      // Collection settings
      numberOfRuns: process.env.CI ? 3 : 1,  // Multiple runs in CI for stability
      
      // Network throttling
      settings: {
        // Simulated mobile network (3G)
        throttlingMethod: 'simulate',
        throttling: {
          rttMs: 150,
          throughputKbps: 1600,
          cpuSlowdownMultiplier: 4,
        },
        
        // Device emulation
        emulatedFormFactor: 'mobile',
        
        // Audit configuration
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        
        // Skip certain audits that might be flaky in CI
        skipAudits: [
          'canonical',           // May not be relevant for localhost
          'robots-txt',          // May not exist in CI
          'is-on-https',         // localhost is http
        ],
        
        // Extra audits for PWA if needed
        additionalTraceCategories: 'loading,rail,devtools.timeline',
      },
    },

    // Performance budgets
    assert: {
      // Performance category budgets
      assertions: {
        'categories:performance': ['error', { minScore: MERIDIAN_PERFORMANCE_BUDGETS.performance / 100 }],
        'categories:accessibility': ['error', { minScore: MERIDIAN_PERFORMANCE_BUDGETS.accessibility / 100 }],
        'categories:best-practices': ['error', { minScore: MERIDIAN_PERFORMANCE_BUDGETS.bestPractices / 100 }],
        'categories:seo': ['error', { minScore: MERIDIAN_PERFORMANCE_BUDGETS.seo / 100 }],

        // Web Vitals budgets
        'first-contentful-paint': ['error', { maxNumericValue: MERIDIAN_PERFORMANCE_BUDGETS.fcp }],
        'largest-contentful-paint': ['error', { maxNumericValue: MERIDIAN_PERFORMANCE_BUDGETS.lcp }],
        'cumulative-layout-shift': ['error', { maxNumericValue: MERIDIAN_PERFORMANCE_BUDGETS.cls }],
        'speed-index': ['error', { maxNumericValue: MERIDIAN_PERFORMANCE_BUDGETS.si }],
        'total-blocking-time': ['error', { maxNumericValue: MERIDIAN_PERFORMANCE_BUDGETS.tbt }],
        'server-response-time': ['error', { maxNumericValue: MERIDIAN_PERFORMANCE_BUDGETS.ttfb }],

        // Resource budgets
        'resource-summary:document:size': ['error', { maxNumericValue: 50000 }],
        'resource-summary:script:size': ['error', { maxNumericValue: MERIDIAN_PERFORMANCE_BUDGETS.jsSize * 1024 }],
        'resource-summary:stylesheet:size': ['error', { maxNumericValue: MERIDIAN_PERFORMANCE_BUDGETS.cssSize * 1024 }],
        'resource-summary:image:size': ['error', { maxNumericValue: MERIDIAN_PERFORMANCE_BUDGETS.imageSize * 1024 }],
        'resource-summary:font:size': ['error', { maxNumericValue: MERIDIAN_PERFORMANCE_BUDGETS.fontSize * 1024 }],
        'resource-summary:total:size': ['error', { maxNumericValue: MERIDIAN_PERFORMANCE_BUDGETS.totalSize * 1024 }],

        // Additional performance audits
        'uses-text-compression': 'error',
        'uses-optimized-images': 'warn',
        'modern-image-formats': 'warn',
        'efficient-animated-content': 'warn',
        'unused-css-rules': 'warn',
        'legacy-javascript': 'warn',
        'duplicated-javascript': 'error',
        'unminified-css': 'error',
        'unminified-javascript': 'error',
        'render-blocking-resources': 'warn',

        // Accessibility requirements
        'color-contrast': 'error',
        'image-alt': 'error',
        'label': 'error',
        'link-name': 'error',
        'button-name': 'error',
        'document-title': 'error',
        'html-has-lang': 'error',
        'meta-viewport': 'error',

        // SEO requirements
        'meta-description': 'error',
        'http-status-code': 'error',
        'crawlable-anchors': 'error',
      },
      
      // Preset configurations
      preset: process.env.CI ? 'lighthouse:recommended' : 'lighthouse:no-pwa',
    },

    // Upload configuration for LHCI server
    upload: {
      // GitHub status checks
      target: 'temporary-public-storage',
      
      // Custom server configuration (uncomment if using LHCI server)
      // target: 'lhci',
      // serverBaseUrl: process.env.LHCI_SERVER_URL || 'https://your-lhci-server.com',
      // token: process.env.LHCI_TOKEN,
      
      // GitHub integration
      githubAppToken: process.env.LHCI_GITHUB_APP_TOKEN,
      githubStatusContext: 'lighthouse-ci',
    },

    // LHCI server configuration (if self-hosting)
    server: {
      port: process.env.LHCI_SERVER_PORT || 9001,
      storage: {
        storageMethod: 'sql',
        sqlDialect: 'sqlite',
        sqlDatabasePath: './lhci.db',
      },
    },

    // Wizard configuration
    wizard: {
      // Disable wizard in CI
      autoOpen: false,
    },
  },

  // Custom performance thresholds for different page types
  pageTypes: {
    homepage: {
      performance: 95,
      lcp: 1200,
      cls: 0.05,
    },
    landing: {
      performance: 90,
      lcp: 1500,
      cls: 0.1,
    },
    content: {
      performance: 85,
      lcp: 2000,
      cls: 0.15,
    },
  },

  // Environment-specific overrides
  environments: {
    development: {
      chromeFlags: ['--disable-web-security'],
      numberOfRuns: 1,
    },
    staging: {
      numberOfRuns: 3,
      throttling: {
        rttMs: 100,
        throughputKbps: 2000,
      },
    },
    production: {
      numberOfRuns: 5,
      throttling: {
        rttMs: 150,
        throughputKbps: 1600,
      },
    },
  },
};