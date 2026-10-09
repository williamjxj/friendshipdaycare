import { test, expect } from '@playwright/test';
import { siteMapEntries } from '@/lib/site-map-entries';

for (const { path } of siteMapEntries) {
  test(`${path} renders on desktop and mobile without horizontal overflow`, async ({ page }, testInfo) => {
    for (const viewport of [{ width: 1280, height: 900 }, { width: 390, height: 844 }]) {
      await page.setViewportSize(viewport);
      const response = await page.goto(path);
      expect(response?.status(), path).toBe(200);
      await expect(page.locator('h1').first()).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), `${path} at ${viewport.width}px`).toBe(true);
      if (viewport.width === 390 && ['/', '/funding', '/community/ece', '/community/montessori'].includes(path)) {
        await page.screenshot({ path: testInfo.outputPath('mobile.png'), fullPage: false });
      }
    }
  });
}
