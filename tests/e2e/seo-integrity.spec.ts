import { test, expect } from '@playwright/test';
import { siteMapEntries } from '@/lib/site-map-entries';
import { businessProfile } from '@/lib/business-profile';

test.use({ javaScriptEnabled: false });

test('every sitemap page exposes complete SEO metadata and valid business JSON-LD without JavaScript', async ({ request, page }) => {
  const checkedImages = new Set<string>();
  for (const { path } of siteMapEntries) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    await page.setContent(await response.text(), { waitUntil: 'domcontentloaded' });
    const canonical = new URL(path, businessProfile.url).href;
    expect(new URL((await page.locator('link[rel="canonical"]').getAttribute('href'))!).href, path).toBe(canonical);
    expect(new URL((await page.locator('meta[property="og:url"]').getAttribute('content'))!).href, path).toBe(canonical);
    expect(await page.locator('meta[name="description"]').getAttribute('content'), path).toBeTruthy();
    expect(await page.locator('meta[name="robots"]').getAttribute('content'), path).not.toContain('noindex');
    expect(await page.locator('meta[name="twitter:card"]').getAttribute('content'), path).toBe('summary_large_image');
    expect(new URL((await page.locator('link[hreflang="x-default"]').getAttribute('href'))!).href, path).toBe(canonical);
    const image = await page.locator('meta[property="og:image"]').first().getAttribute('content');
    expect(image, path).toBeTruthy();
    const url = new URL(image!);
    expect(url.origin).toBe(businessProfile.url);
    if (!checkedImages.has(url.pathname)) {
      const asset = await request.get(url.pathname);
      expect(asset.status(), url.pathname).toBe(200);
      const png = await asset.body();
      expect(png.subarray(1, 4).toString()).toBe('PNG');
      expect(png.readUInt32BE(16)).toBe(1200);
      expect(png.readUInt32BE(20)).toBe(630);
      checkedImages.add(url.pathname);
    }
    const schemas = await page.locator('script[type="application/ld+json"]').evaluateAll((elements) => elements.map((el) => JSON.parse(el.textContent ?? '')));
    const business = schemas.find((schema) => Array.isArray(schema['@type']) && schema['@type'].includes('ChildCare'));
    expect(business, path).toBeTruthy();
    expect(business.telephone).toBe(businessProfile.telephone);
    expect(business.email).toBe(businessProfile.email);
    expect(business.address.streetAddress).toBe(businessProfile.address.streetAddress);
    expect(business.url).toBe(businessProfile.url);
    expect(schemas.some((schema) => schema['@type'] === 'WebSite')).toBe(true);
    expect(await page.locator('h1').count(), path).toBeGreaterThan(0);
  }
});

test('sitemap is valid XML and GEO summaries link to working canonical pages', async ({ request, page }) => {
  const xml = await (await request.get('/sitemap.xml')).text();
  const sitemap = await page.evaluate((text) => {
    const document = new DOMParser().parseFromString(text, 'application/xml');
    return { errors: document.getElementsByTagName('parsererror').length, urls: Array.from(document.getElementsByTagName('url')).map((node) => node.getElementsByTagName('loc')[0].textContent) };
  }, xml);
  expect(sitemap.errors).toBe(0);
  expect(new Set(sitemap.urls).size).toBe(siteMapEntries.length);
  for (const { path } of siteMapEntries) {
    expect(sitemap.urls).toContain(path === '/' ? businessProfile.url : businessProfile.url + path);
  }
  const checked = new Set<string>();
  for (const file of ['/llms.txt', '/llms-full.txt']) {
    const response = await request.get(file);
    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text).toContain(businessProfile.email);
    expect(text).toContain(businessProfile.address.postalCode);
    const links = text.match(/https:\/\/www\.friendshipdaycare\.com[^\s)\]]*/g) ?? [];
    for (const link of links) {
      const url = new URL(link.replace(/[.,;]+$/, ''));
      if (checked.has(url.pathname)) continue;
      expect((await request.get(url.pathname)).status(), link).toBe(200);
      checked.add(url.pathname);
    }
  }
});
