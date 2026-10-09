import { test, expect } from '@playwright/test';

const movedAssets = [
  ['/collects/canva-1.png', '/images/canva-1.png'],
  ['/collects/gemini-1.png', '/images/gemini-1.png'],
  ['/collects/stars-4.5.png', '/images/stars-4.5.png'],
  ['/collects/stars-5.png', '/images/stars-5.png'],
  ['/collects/bit.png', '/images/bit.png'],
  ['/imgs/home/1.jpeg', '/images/home/1.jpeg'],
  ['/imgs/home/2.jpeg', '/images/home/2.jpeg'],
  ['/imgs/programs/toddler.jpg', '/images/practical-life-shelf-1.jpg'],
  ['/imgs/programs/preschool.jpg', '/images/sensorial-shelf.jpg'],
  ['/imgs/programs/pre-k.jpg', '/images/language-shelf.jpg'],
  ['/favicon_io/apple-touch-icon.png', '/icons/apple-touch-icon.png'],
  ['/favicon_io/favicon.ico', '/icons/favicon.ico'],
];

test('consolidated assets and legacy URLs serve identical files', async ({ request }) => {
  for (const [previous, current] of movedAssets) {
    const oldResponse = await request.get(previous);
    const newResponse = await request.get(current);
    expect(oldResponse.status(), previous).toBe(200);
    expect(newResponse.status(), current).toBe(200);
    expect((await oldResponse.body()).equals(await newResponse.body()), previous).toBe(true);
  }
});

test('PWA assets and registration documents remain available', async ({ request }) => {
  const response = await request.get('/site.webmanifest');
  expect(response.status()).toBe(200);
  const manifest = await response.json();
  const paths = [
    ...manifest.icons.map((item: { src: string }) => item.src),
    ...manifest.screenshots.map((item: { src: string }) => item.src),
    '/images/story-video-placeholder.svg',
    '/assets/Registration form 2026.pdf',
    '/assets/Registration form 2026.doc',
  ];
  for (const path of paths) {
    expect((await request.head(path)).status(), path).toBe(200);
  }
});

for (const route of ['/funding', '/community/ece', '/community/montessori']) {
  test(`${route} remains usable on mobile after promotion removal`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1').first()).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}

test('story video playlist previews load without missing thumbnail requests', async ({ page }) => {
  await page.goto('/community/todays-story');
  const previews = page.locator('button img');
  await expect(previews).toHaveCount(3);
  for (const preview of await previews.all()) {
    await preview.scrollIntoViewIfNeeded();
    await expect.poll(() => preview.evaluate((element) => {
      const image = element as HTMLImageElement;
      return image.complete && image.naturalWidth > 0;
    })).toBe(true);
  }
});
