import { defineConfig } from '@playwright/test';
const externalBaseURL = process.env.PLAYWRIGHT_BASE_URL;
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  timeout: 60000,
  expect: { timeout: 10000 },
  use: {
    baseURL: externalBaseURL || 'http://127.0.0.1:3100',
    channel: 'chrome',
    headless: true,
    trace: 'retain-on-failure',
  },
  reporter: 'list',
  webServer: externalBaseURL
    ? undefined
    : {
        command:
          'node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3100',
        url: 'http://127.0.0.1:3100',
        reuseExistingServer: !process.env.CI,
        timeout: 60000,
      },
});
