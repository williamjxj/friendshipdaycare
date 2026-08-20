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
