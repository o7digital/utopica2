import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['json', { outputFile: 'accessibility-results.json' }],
    ['json', { outputFile: 'performance-results.json' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL || 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Take screenshot on failure */
    screenshot: 'only-on-failure',

    /* Video recording for performance tests */
    video: 'retain-on-failure',

    /* Extended timeout for performance tests */
    actionTimeout: 30000,
    navigationTimeout: 60000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    /* Performance testing project with specific configuration */
    {
      name: 'performance',
      testDir: './tests/performance',
      use: { 
        ...devices['Desktop Chrome'],
        /* Enable performance metrics collection */
        launchOptions: {
          args: [
            '--enable-precise-memory-info',
            '--enable-web-vitals-reporting',
            '--disable-web-security',
            '--allow-running-insecure-content'
          ]
        }
      },
    },

    /* Load testing project */
    {
      name: 'load-test',
      testDir: './tests/performance',
      testMatch: '**/load-*.spec.ts',
      use: { 
        ...devices['Desktop Chrome'],
        /* Parallel execution for load testing */
        workers: 5,
      },
    }
  ],

  /* Global test timeout */
  timeout: 120000,

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});