import { test, expect } from '@playwright/test';

test('homepage has a clean footer', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.screenshot({ path: '/home/jules/verification/homepage_updated.png', fullPage: true });
});
