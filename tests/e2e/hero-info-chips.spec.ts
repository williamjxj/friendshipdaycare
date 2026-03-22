import { expect, test } from '@playwright/test';

/**
 * Hero warm-button contact chips: layout, visibility, links, and parity with header Book a Tour colors.
 * Requires dev server at baseURL (default http://localhost:3000).
 */
test.describe('Home hero info chips', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('chips container visible from sm breakpoint with readable text', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 900 });

    const row = page.getByTestId('hero-info-chips');
    await expect(row).toBeVisible();

    const address = page.getByTestId('hero-info-chip-address');
    await expect(address).toBeVisible();
    await expect(address).toContainText('2950');

    const phone = page.getByTestId('hero-info-chip-phone');
    await expect(phone).toBeVisible();
    await expect(phone).toContainText('604');

    const email = page.getByTestId('hero-info-chip-email');
    await expect(email).toBeVisible();
    await expect(email).toContainText('@');

    // After Framer stagger (~1s total), inner word spans should not stay transparent
    await page.waitForTimeout(1200);
    const addressOpacity = await address.evaluate((el) => parseFloat(window.getComputedStyle(el).opacity));
    expect(addressOpacity).toBeGreaterThan(0.95);

    const firstWord = address.locator('span.inline-block').first();
    const wOp = await firstWord.evaluate((el) => parseFloat(window.getComputedStyle(el).opacity));
    expect(wOp).toBeGreaterThan(0.95);
  });

  test('phone and mailto hrefs', async ({ page }) => {
    await page.setViewportSize({ width: 1100, height: 900 });

    const phone = page.getByTestId('hero-info-chip-phone');
    await expect(phone).toHaveAttribute('href', /tel:/);

    const email = page.getByTestId('hero-info-chip-email');
    await expect(email).toHaveAttribute('href', /^mailto:/);
  });

  test('chip wrapper background and text color match header Book a Tour', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');

    const bookTour = page.getByTestId('header-book-tour');
    await expect(bookTour).toBeVisible();

    const row = page.getByTestId('hero-info-chips');
    await expect(row).toBeVisible();

    const addressChip = page.getByTestId('hero-info-chip-address');
    await expect(addressChip).toBeVisible();

    const tourBg = await bookTour.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    const chipBg = await addressChip.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(chipBg).toBe(tourBg);

    const tourColor = await bookTour.evaluate((el) => window.getComputedStyle(el).color);
    const chipColor = await addressChip.evaluate((el) => window.getComputedStyle(el).color);
    expect(chipColor).toBe(tourColor);
  });
});
