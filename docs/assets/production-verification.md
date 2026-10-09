# Production verification — 2026-10-09

The local production build passed the full 44-test Playwright suite using installed Chrome and one worker. ESLint and TypeScript/build checks passed. This audit follows the static-asset consolidation and removal of the retired promotional popup workflow.

## Reproduce

```sh
npm run lint
PLAYWRIGHT_CHANNEL=chrome npm run test:production
```

`test:production` builds with Webpack/Serwist, starts the production server on port 3100, runs all tests serially, and stops its managed server. Use a free port 3100 so an unrelated server cannot be reused. Playwright's standard browser is used when `PLAYWRIGHT_CHANNEL` is omitted. `npm run test:e2e` remains the development-server workflow. `PLAYWRIGHT_SERVER_COMMAND` and `PLAYWRIGHT_BASE_URL` allow other server setups.

## Verified coverage

| Surface | Result |
| --- | --- |
| 17 sitemap pages | HTTP 200, visible headings, desktop 1280px and mobile 390px without horizontal overflow |
| Metadata on every sitemap page | Canonical and Open Graph URLs match route; description and indexability present; English/x-default canonical alternate; Twitter large-image card |
| Social preview assets | All referenced OG PNGs return 200 and measure 1200 × 630 |
| Crawler-visible structured data | Valid JSON-LD in initial HTML with JavaScript disabled; ChildCare business name/address/contact URL consistency, WebSite schema; existing Course, FAQ and breadcrumb checks |
| XML sitemap | XML parses successfully; all 17 canonical routes present without duplicates |
| Robots | Named AI crawlers permitted, API paths excluded, CSS/JS remain crawlable, canonical sitemap discoverable |
| GEO summaries | Both llms files return 200, include business email/postcode, and internal canonical links resolve |
| Legacy URLs | Permanent page redirects, moved static-asset compatibility, invalid program hard 404/noindex |
| Forms and contact UI | Tour submission flow tested with mocked API, success/reset states, phone/email links, hero chips and legal navigation |
| Static resources | Registration downloads, PWA icons/screenshots, merged image URLs |
| Story-video preview UI | Three playlist previews load successfully using the local placeholder |

Mobile screenshots of the home, funding, ECE, and Montessori pages are produced in ignored `test-results/` folders. Screenshots of the revised hero layouts were visually inspected.

## Changes reflected by this audit

- Marketing originals are flat in `posters/`; no dev/build copy lifecycle remains.
- Removed popup, promotional cards, sync script/hooks, generated promotion directory, and their code references.
- Funding, ECE, and Montessori heroes use a single content column without empty promotional slots. Their sitemap content dates are 2026-10-09.
- Contact/team/resources fall back to the existing local classroom graphic when R2 configuration is unavailable.
- Consolidated website graphics into `public/images/` and favicons into `public/icons/`; legacy URL rewrites and existing R2 keys remain.
- Server-only email template resides under `src/lib/email/templates/` and is traced into both email API bundles.
- Fixed three nonexistent R2 story-thumbnail URLs using one local SVG play-card. Video titles, descriptions, and original YouTube URLs remain.

## Scope and practical limits

These results verify the local production artifact. Deployment, live-host caching/redirects, Search Console indexing, search rankings, AI citations, and Google rich-result eligibility were not validated. Structured-data syntax and site facts were checked against repository data; external business facts were not independently reverified. Passing these tests does not guarantee a search engine or AI service will index or cite the site.

The UI supports five languages through its existing language setting. This audit checks English crawler metadata and the existing English/x-default alternates; it does not assert five separately indexable language URLs. Real email delivery and external YouTube playback were not exercised; form submissions are mocked to avoid sending test inquiries.

For asset locations and maintenance rules, see [public directory management](public-directory.md) and [marketing originals](../../posters/README.md).
