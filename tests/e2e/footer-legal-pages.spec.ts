import { expect, test } from '@playwright/test';

const footerLegalRoutes = ['/privacy', '/terms', '/sitemap'] as const;

test.describe('Footer legal pages', () => {
  for (const path of footerLegalRoutes) {
    test(`${path} returns 200`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toBeVisible();
    });
  }

  test('footer links prefetch without 404', async ({ page }) => {
    const failedResponses: string[] = [];

    page.on('response', (response) => {
      const url = response.url();
      if (
        response.status() === 404 &&
        (url.includes('/privacy') || url.includes('/terms') || url.includes('/sitemap'))
      ) {
        failedResponses.push(url);
      }
    });

    await page.goto('/');
    await page.getByRole('link', { name: 'Privacy Policy' }).hover();
    await page.getByRole('link', { name: 'Terms of Service' }).hover();
    await page.getByRole('link', { name: 'Sitemap' }).hover();

    expect(failedResponses).toEqual([]);
  });
});
