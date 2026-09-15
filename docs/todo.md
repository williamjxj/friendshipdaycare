## Session 1

```text
For my NextJS app

- url: www.friendshipdaycare.com
- repo: https://github.com/williamjxj/friendshipdaycare
make sure you can access the resources without any problem.

I have the following questions:

- The daycare manager doesn't like current implementation, she wants the multiple-pages app to be simpler, concise, and intuitive. The key point is that parents can get the idea and contact info at first glance
- There is also SEO concern: when Google 'Coquitlam daycare', this URL should list on the first page, better on top. Current it is not there when I google 'Coquitlam daycare', 'daycare montessori in Coquitlam' etc.
- I am thinking the following improvements:  to use ScrollSpy(scroll spy navbar/menu); make a contact form on hero-section; remove other pages' hero-sections; remove useless nonsense context/paragraphs; add social-media links such as Facebook/Instagram
- Based on the current implementation, please do deep research and give an improved solution
```

## Session 2

```text
/speckit.plan  deep research and refer @docs 
- Simplify and optimize the website to make it more intuitive and concise. use scrollspy for navigation
- keep landing page hero-section, remove hero-sections in other pages
- reduce or remove useless nonsense words, sentences, paragraphs, sections, images, card box. 
- Prioritize displaying key contact information — phone number, email, and contact form.
- Remove unused images to improve performance and loading speed
- Enhance SEO for better visibility and search ranking.
```

## Social Media

- https://www.facebook.com/FriendshipDaycareCoquitlam/
- https://www.facebook.com/friendshipcornerdaycare
- [Instagram](https://www.instagram.com/daycarefriendshipcorner/)

## Assets

- friendship.care@live.com
- daycarefriendshipcorner@gmail.com
- google drive, ms onedrive
- resend.com (email)

> Confirm the contact email: the website, schema, and `llms.txt` all publish
> `friendship.care@live.ca`, while this note says `.com`. Pick one and keep every
> surface identical (it is a local-SEO/NAP consistency issue, not just a typo).

## Session 3

```text
2026-08-20 — SEO/GEO overhaul (code complete, pending deploy)

SEO:
- Fixed postal code to V3C 2J4 (verified via Fraser Health licensing records)
- Shortened over-long page titles (homepage + subpages)
- Added real /programs/[slug] pages (toddler / preschool / prekindergarten),
  fixing dead "Learn More" links and homepage soft-404s
- Removed stale /programs/* middleware redirect; unknown slugs → noindex 404
- Updated sitemap.xml (new program routes + fresh lastmod dates)

GEO (generative engine optimization):
- Rewrote public/llms.txt; added public/llms-full.txt
- robots.txt explicitly allows GPTBot, PerplexityBot, ClaudeBot, Google-Extended, etc.
- FAQPage + Course schema now server-rendered on the homepage
- Enriched LocalBusiness/Organization/WebSite schema (IDs, contact point, facts)
- Added tests/e2e/seo-structured-data.spec.ts (5 checks, all passing)

Still open: deploy, submit sitemap in Search Console, confirm GBP postal code.
```

## Session 4

```text
2026-09-14 — SEO/GEO double-check against the built site (not just source)

Verified working: server-rendered schema (WebSite, ChildCare/LocalBusiness,
EducationalOrganization, FAQPage, Course, BreadcrumbList), canonicals + hreflang,
llms.txt / llms-full.txt, robots.txt AI crawler rules, 17-URL sitemap with images.

Fixed four defects that were undoing earlier SEO work:
1. /programs/<unknown> returned 200 + index,follow + homepage canonical
   (soft 404). Now a real 404 + noindex, handled in src/proxy.ts because the
   site renders dynamically and notFound() cannot change a streamed status.
2. The layout's title template pushed child-page titles past 60 characters
   (/service-area rendered 101). buildPageMetadata now appends the brand only
   when it fits; /service-area title rewritten. All titles <= 60 and unique.
3. robots.txt disallowed /_next/, which blocks Googlebot from fetching the CSS/JS
   it needs to render pages. /_next/ removed; only /api/ is disallowed.
4. Retired URLs (/team, /pricing, /gallery, /journal, /todays-story, /policies,
   /blog, /faq, /testimonials) 404'd or redirected 307. Now 308 permanent, and
   /gallery points at the real gallery page instead of a homepage anchor.

Also: dedicated /og/service-area.png share card, gallery breadcrumbs, sitemap
lastmod corrections, llms.txt service-area entry + refreshed dates, and new
Playwright regression tests covering all four defects.

Still open: deploy, submit sitemap in Search Console, confirm GBP postal code,
re-measure Lighthouse/PageSpeed on the deployed CDN.
```

### Notes from the 2026-09-14 pass

- `npm run lint` clean; `npm run build` clean (Serwist still emits `public/sw.js`).
- `tests/e2e/seo-structured-data.spec.ts` — 10/10 passing.
- Full e2e suite: 18 passed, 1 flaky (`welcome-form` "submits tour request" times
  out on a cold dev-server compile when run in parallel; passes on its own).
  The `/api/welcome` endpoint itself returns 200 when called directly. That spec
  also sends a real email through Resend on every run — worth stubbing later.
- Local Playwright is pinned to 1.51.1 (browser revision 1161), which is not
  installed on this machine and did not finish downloading. The suite was
  verified against the Chromium already present locally via a throwaway config;
  run `npx playwright install chromium` before the next full e2e run.

## Session 5

```text
2026-09-14 — UI/UX review of the deployed site, then fixes

Deploy verified live: robots (no /_next/ block), 404 for unknown program slugs,
308 legacy redirects, /sw.js served, optimised hero srcset, trimmed titles,
llms.txt dated 2026-09-14, structured data intact.

Audited with screenshots (1440x900 + 390x844), axe-core on five routes, DOM
geometry measurements and pixel sampling. Fixed:
1. /gallery-new headline was invisible — black on near-black, 1.05:1, 0% light
   pixels in the heading band. Root cause: heading/paragraph colours were
   unlayered element rules in globals.css that beat Tailwind utilities. Now
   @layer base + color: inherit, so dark sections keep their text. 0% -> 11.7%
   visible text pixels; page went from 5 serious violations to 0.
2. Two <main> landmarks per page. SiteShell now owns the single
   main#main-content; pages render plain containers.
3. Homepage had no persistent mobile action (25-screen page, sticky bar was
   disabled on /). Sticky Call / Book-a-Tour now shows everywhere except
   /welcome.
4. Ten undersized tap targets on mobile home. New .fdc-tap-target helper
   applied to phone/email, footer, breadcrumbs, program and funding links, map
   directions. 10 -> 1 (the visually-hidden skip link).
5. Cleanups: aside panels in <main> became divs; footer caption contrast
   2.28:1 -> above 4.5:1; decorative footer logo alt.

Verified: lint + build clean, axe 0 violations on /, /gallery-new, /funding,
/service-area, /welcome, one <main> each, 10/10 SEO tests pass, full suite 18
passed with the known hero-chip / welcome-form parallel-load flakes passing in
isolation.

Deferred (needs owner sign-off): hero re-proportion, tour-form trim, homepage
hero CTA differentiation. See docs/codex_ui.md.
```

### Notes from the 2026-09-14 UI pass (continued)

- Rebuilt the Enrollment Requirements block: 3-column compact grid instead of a
  2-column card wall, tighter heading, and a GSAP reveal where each card lifts in
  and then its ring + tick draw themselves. Desktop section 495 → 321 px (−35%),
  mobile 795 → 639 px (−20%). Skipped entirely under `prefers-reduced-motion`.
- Fixed a latent motion bug while there: GSAP left `translate: none` /
  `transform: translate(0px, 0px)` inline on each card, which beat Tailwind v4's
  `hover:-translate-y-*` and killed the hover lift. `clearProps: 'transform'`
  restores it — verified `translate: 0px -2px` on hover.
- Verified 390 / 768 / 1440 / 1920 px: no clipped text, no overflow, axe clean.
