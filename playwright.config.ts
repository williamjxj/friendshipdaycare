import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config for local / CI e2e checks.
 * Run dev server separately: `npm run dev` then `npm run test:e2e`
 */
export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    /** Use an already-running `npm run dev` when port 3000 is taken. */
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
