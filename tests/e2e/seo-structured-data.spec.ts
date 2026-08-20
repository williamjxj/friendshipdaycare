import { test, expect } from '@playwright/test';

/**
 * SEO & GEO regression suite.
 * Verifies structured data is server-rendered, AI crawlers are allowed,
 * llms.txt files exist, program pages resolve (no soft 404s), and the
 * XML sitemap lists every key route.
 */
test.describe('SEO & GEO surface', () => {
  test('homepage serves key structured data in the initial HTML', async ({ request }) => {
    const response = await request.get('/');
    expect(response.ok()).toBeTruthy();
    const html = await response.text();

    expect(html).toContain('"@type":["ChildCare","LocalBusiness"]');
    expect(html).toContain('"@type":"WebSite"');
    expect(html).toContain('"@type":"FAQPage"');
    expect(html).toContain('"@type":"Course"');
    expect(html).toContain('"@type":"EducationalOrganization"');
    expect(html).toContain('<title>Coquitlam Montessori Daycare | Friendship Corner Daycare</title>');
  });

  test('robots.txt welcomes AI crawlers and references the sitemap', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.ok()).toBeTruthy();

    const body = await response.text();
    expect(body).toContain('User-Agent: GPTBot');
    expect(body).toContain('User-Agent: PerplexityBot');
    expect(body).toContain('User-Agent: ClaudeBot');
    expect(body).toContain('Sitemap: https://www.friendshipdaycare.com/sitemap.xml');
  });

  test('llms.txt and llms-full.txt are available for AI engines', async ({ request }) => {
    for (const path of ['/llms.txt', '/llms-full.txt']) {
      const response = await request.get(path);
      expect(response.ok(), `${path} should return 200`).toBeTruthy();
      const body = await response.text();
      expect(body.length).toBeGreaterThan(500);
    }

    const llms = await (await request.get('/llms.txt')).text();
    expect(llms).toContain('https://www.friendshipdaycare.com/llms-full.txt');
  });

  test('program pages render with course and FAQ schema instead of 404', async ({ request }) => {
    for (const slug of ['toddler', 'preschool', 'prekindergarten']) {
      const response = await request.get(`/programs/${slug}`);
      expect(response.status(), `${slug} should return 200`).toBe(200);
      const html = await response.text();

      expect(html).toContain('"@type":"Course"');
      expect(html).toContain('"@type":"FAQPage"');
      expect(html).toContain('"@type":"BreadcrumbList"');
    }
  });

  test('sitemap.xml lists the program and legal pages', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.ok()).toBeTruthy();

    const body = await response.text();
    for (const path of [
      '/programs/toddler',
      '/programs/preschool',
      '/programs/prekindergarten',
      '/funding',
      '/privacy',
    ]) {
      expect(body).toContain(path);
    }
  });
});
