import { expect, test } from '@playwright/test';

test.describe('Welcome tour form', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
  });

  test('submits tour request with flyer source', async ({ page }) => {
    let postedBody: Record<string, unknown> | null = null;

    await page.route('**/api/welcome', async (route) => {
      postedBody = route.request().postDataJSON() as Record<string, unknown>;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'ok' }),
      });
    });

    await page.goto('/welcome?source=flyer-0320');

    await expect(page.getByTestId('welcome-page')).toBeVisible();

    const formWidth = await page.getByTestId('welcome-form').evaluate((el) => el.getBoundingClientRect().width);
    expect(formWidth).toBeGreaterThan(280);

    await page.getByTestId('welcome-name').fill('Test Parent');
    await page.getByTestId('welcome-email').fill('parent@example.com');
    await page.getByTestId('welcome-child-name').fill('Alex');
    await page.getByTestId('welcome-child-birthday').fill('2022-03-15');
    await page.getByTestId('welcome-tour-date').fill('2026-12-01');
    await page.getByTestId('welcome-tour-time').selectOption('morning');
    await page
      .getByTestId('welcome-message')
      .fill('We would like to visit your Coquitlam location soon.');

    await page.getByTestId('welcome-submit').click();

    await expect(page.getByTestId('welcome-success')).toBeVisible();
    await expect(page.getByTestId('welcome-form')).toHaveCount(0);
    await expect(page.getByText('Test Parent')).toBeVisible();
    await expect(page.getByText('Alex')).toBeVisible();
    await expect(page.getByText('Morning — 11:15 AM')).toBeVisible();

    await page.getByTestId('welcome-back').click();
    await expect(page.getByTestId('welcome-form')).toBeVisible();
    await expect(page.getByTestId('welcome-success')).toHaveCount(0);

    expect(postedBody?.source).toBe('flyer-0320');
    expect(postedBody?.tourTimePreference).toBe('morning');
    expect(postedBody?.childName).toBe('Alex');
    expect(postedBody?.childBirthday).toBe('2022-03-15');
  });

  test('no horizontal overflow on mobile', async ({ page }) => {
    await page.goto('/welcome');
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });
});
