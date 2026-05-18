import { expect, test, type Locator, type Page } from '@playwright/test';

/**
 * Hero warm-button contact chips: layout, visibility, links, and parity with header Book a Tour colors.
 * Requires dev server at baseURL (default http://localhost:3000).
 */
async function gotoHomeWithTheme(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem('daycare-theme', 'violet');
    document.documentElement.setAttribute('data-theme', 'violet');
  });
  await page.goto('/');
}

async function getBackgroundColor(locator: Locator): Promise<string> {
  return locator.evaluate((el) => window.getComputedStyle(el).backgroundColor);
}

async function parseRgb(locator: Locator): Promise<[number, number, number] | null> {
  return locator.evaluate((el) => {
    const raw = window.getComputedStyle(el).backgroundColor;
    const match = raw.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) return null;
    return [Number(match[1]), Number(match[2]), Number(match[3])];
  });
}

function expectRgbClose(a: [number, number, number], b: [number, number, number], tolerance = 2) {
  expect(Math.abs(a[0] - b[0])).toBeLessThanOrEqual(tolerance);
  expect(Math.abs(a[1] - b[1])).toBeLessThanOrEqual(tolerance);
  expect(Math.abs(a[2] - b[2])).toBeLessThanOrEqual(tolerance);
}

async function expectMatchingBackground(a: Locator, b: Locator) {
  const [colorA, colorB] = await Promise.all([getBackgroundColor(a), getBackgroundColor(b)]);
  if (colorA === colorB) return;

  const [rgbA, rgbB] = await Promise.all([parseRgb(a), parseRgb(b)]);
  if (rgbA && rgbB) {
    expectRgbClose(rgbA, rgbB);
    return;
  }

  throw new Error(`Background colors differ: chip=${colorA}, header=${colorB}`);
}

test.describe('Home hero info chips', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHomeWithTheme(page);
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

    // Chip + word stagger can exceed 5s under parallel load; poll until fully opaque
    await expect
      .poll(async () => {
        const chipOpacity = await address.evaluate((el) =>
          parseFloat(window.getComputedStyle(el).opacity),
        );
        const firstWord = address.locator('span.inline-block').first();
        const wordOpacity = await firstWord.evaluate((el) =>
          parseFloat(window.getComputedStyle(el).opacity),
        );
        return chipOpacity > 0.95 && wordOpacity > 0.95;
      })
      .toBe(true);
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

    const bookTour = page.getByTestId('header-book-tour');
    await expect(bookTour).toBeVisible();

    const addressChip = page.getByTestId('hero-info-chip-address');
    await expect(addressChip).toBeVisible();

    await expectMatchingBackground(addressChip, bookTour);

    const tourColor = await bookTour.evaluate((el) => window.getComputedStyle(el).color);
    const chipColor = await addressChip.evaluate((el) => window.getComputedStyle(el).color);
    expect(chipColor).toBe(tourColor);
  });
});
