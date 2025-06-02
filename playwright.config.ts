import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  timeout: 30000,
  retries: 1,
  reporter: [
    ['list'],
    ['allure-playwright']
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
}); 