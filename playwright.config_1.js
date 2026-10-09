// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests', 
  retries: 2,
  timeout: 50 * 1000, //Max time any test can run for
  //test.setTimeout(50 * 1000); //Max time a particular test can run for. Should be used inside the test file. This is a test level timeout.
  expect: {
    timeout: 7000, // Maximum time expect() should wait for the condition to be met.
    // For Locator level expect, the timeout is controlled by the last parameter of the expect method using the syntax expect(locator).toHaveText(text, { timeout: 5000 });  
    //For test level expect, the timeout is controlled by the timeout property of the test configuration using the syntax test('test name', async ({ page }) => { ... }, { timeout: 10000 });
  },
  reporter: 'html',

  /* Run tests in files in parallel */
  //fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  //forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  //retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName: 'chromium',
    headless: false,
    actionTimeout: 10000,
    //Maximum time each action can take. If exceeded, the action will fail. Default is 0 (no limit).Actions are click ,fill,waitFor
    screenshot: 'on', //off , only-on-failure are other options available
    //trace: 'on' - Captures everything
    trace: 'retain-on-failure', //Captures trace only on failure

    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    //trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: true,
        screenshot: 'on',
        //viewport: { width: 1280, height: 720 }, //default viewport size is 1280x720. This can be changed to any other value or can be set to null to use the default viewport size of the browser.
        trace: 'retain-on-failure',
        video: 'retain-on-failure',
      }
    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        headless: true,
        screenshot: 'on',
        //ignoreHTTPSErrors: true, // Ignore HTTPS errors when navigating to pages.
        permissions: ['geolocation'],
        trace: 'retain-on-failure',
      },
    },

    {
      name: 'webkit',
      use:{
        browserName: 'webkit',
        headless: true,
        screenshot: 'on',
        trace: 'retain-on-failure',
        ...devices['iPhone 12'],
      },
    }]

  /* Test against mobile viewports. */
  // {
  //   name: 'Mobile Chrome',
  //   use: { ...devices['Pixel 5'] },
  // },
  // {
  //   name: 'Mobile Safari',
  //   use: { ...devices['iPhone 12'] },
  // },

  /* Test against branded browsers. */
  // {
  //   name: 'Microsoft Edge',
  //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
  // },
  // {
  //   name: 'Google Chrome',
  //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  // },],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },/*
});

// to run with this config use below command
// npx playwright test --config playwright.config_1.js
// This triggers execution of tests in all 3 browsers - chromium, firefox and webkit. The test results will be displayed in the console and also in the HTML report generated in the root folder of the project. The report can be opened using the command npx playwright show-report

// TO run with specific project use below command
// npx playwright test --config playwright.config_1.js --project=chromium