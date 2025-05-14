import { defineConfig } from '@playwright/test';

export default defineConfig({
  // other settings like use, timeout, etc...

  reporter: [['list'], ['allure-playwright']],
});
