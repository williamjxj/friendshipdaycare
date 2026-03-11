# Tasks: Website Simplify & Optimize

**Input**: Design documents from `/specs/004-website-optimization/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Not explicitly requested in spec; manual QA per quickstart.md.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- Next.js App Router: `src/app/`, `src/components/`, `src/hooks/`, `src/lib/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and hook structure

- [x] T001 Ensure `src/hooks` directory exists for useScrollSpy hook
- [x] T002 [P] Verify `npm run build` succeeds; confirm no breaking changes to existing pages

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core hook required for ScrollSpy; blocks US2

**⚠️ CRITICAL**: useScrollSpy must exist before Header can implement ScrollSpy behavior

- [x] T003 Create `useScrollSpy(sectionIds: string[], offset?: number)` hook in `src/hooks/useScrollSpy.ts` using Intersection Observer API; return `activeId: string`; clean up observers on unmount (per research.md §1)

**Checkpoint**: Hook ready—US2 ScrollSpy implementation can begin

---

## Phase 3: User Story 1 - Quick Access to Contact Information (Priority: P1) 🎯 MVP

**Goal**: Phone, email, and contact form visible above the fold or in header/footer on every page; contact form discoverable

**Independent Test**: Visit homepage—see phone or email without scrolling; visit any page—phone/email in header or footer; navigate to contact—form works

### Implementation for User Story 1

- [x] T004 [P] [US1] Add or ensure phone and email are visible in Header in `src/components/layout/Header.tsx` (clickable `tel:` and `mailto:` links; visible on all viewports)
- [x] T005 [US1] Add prominent contact CTA (phone, email, or "Book a Tour" link) to HeroSection or homepage hero in `src/app/page-client.tsx` so at least one contact method is above the fold
- [x] T006 [P] [US1] Verify Footer in `src/components/layout/Footer.tsx` displays phone and email with `tel:`/`mailto:` links; add or confirm Facebook and Instagram links per `docs/todo.md`
- [x] T007 [US1] Verify contact form in `src/app/contact/page-client.tsx` submits to `POST /api/contact` successfully; ensure "Contact" or "Book a Tour" CTA in header/nav links to contact page or `/#contact`

**Checkpoint**: User Story 1 complete—contact info and form are prominent and functional

---

## Phase 4: User Story 2 - ScrollSpy Navigation & Simplified Content (Priority: P2)

**Goal**: ScrollSpy highlights active section on homepage; sub-pages have no decorative hero; redundant content removed

**Independent Test**: Scroll homepage—nav highlights current section; click nav—scrolls to section and highlights; visit about/programs/contact/gallery/enrollment/community pages—no PageHero; content is concise

### Implementation for User Story 2

- [x] T008 [US2] Add section `id` attributes (e.g., `id="hero"`, `id="about"`, `id="programs"`, `id="contact"`) to homepage sections in `src/app/page-client.tsx` for ScrollSpy targeting
- [x] T009 [US2] Update Header in `src/components/layout/Header.tsx` to use `useScrollSpy` when pathname is `/`; nav links as `/#about`, `/#programs`, `/#contact` etc.; apply active styling when `activeId` matches section
- [x] T010 [P] [US2] Remove PageHero from `src/app/about/page-client.tsx`; replace with simple `<h1>` page title and optional breadcrumbs
- [x] T011 [P] [US2] Remove PageHero from `src/app/programs/page-client.tsx`; replace with simple heading
- [x] T012 [P] [US2] Remove PageHero from `src/app/contact/page-client.tsx`; replace with simple heading
- [x] T013 [P] [US2] Remove PageHero from `src/app/gallery/page-client.tsx`; replace with simple heading
- [x] T014 [P] [US2] Remove PageHero from `src/app/enrollment/page-client.tsx`; replace with simple heading
- [x] T015 [P] [US2] Remove PageHero from `src/app/community/ece/page-client.tsx`, `src/app/community/montessori/page-client.tsx`, `src/app/community/journal/page-client.tsx`, and `src/app/community/todays-story/story-content.tsx` (or respective page-client)
- [x] T016 [US2] Audit and condense About page content in `src/app/about/page-client.tsx`; reduce redundant ECE/Montessori text to 1 sentence + bullets per research.md §3
- [x] T017 [US2] Audit and condense Programs page content in `src/app/programs/page-client.tsx`; remove duplicate benefits blocks; 3 cards with bullets
- [x] T018 [US2] Limit testimonials to 3–4 unique quotes; remove redundant card boxes in testimonial components (e.g., `src/components/sections/TestimonialsMarquee.tsx` or `TestimonialsCarousel.tsx`)

**Checkpoint**: User Story 2 complete—ScrollSpy works; sub-pages simplified; no decorative heroes

---

## Phase 5: User Story 3 - Fast Page Load & Performance (Priority: P2)

**Goal**: Unused images removed; remaining images optimized; homepage loads in under 3 seconds on 4G

**Independent Test**: Run image audit—unused removed; Lighthouse homepage—LCP < 3s, performance ≥ 80

### Implementation for User Story 3

- [x] T019 [US3] Audit images in `public/`, R2 URLs, and `getImageUrl` usages; grep for imports and references; document list of unused image paths in `specs/004-website-optimization/image-audit.md`
- [x] T020 [US3] Remove unused image files from `public/` and project (per audit); do not remove images with dynamic paths without manual verification
- [x] T021 [P] [US3] Verify key images use Next.js `Image` with appropriate `sizes` prop and lazy loading in `src/components/ui/OptimizedImage.tsx` and affected components
- [x] T022 [US3] Run Lighthouse on homepage (mobile, 4G throttling); document LCP and performance score; fix issues if LCP > 3s

**Checkpoint**: User Story 3 complete—no unused images; performance documented (LCP target not met locally; see lighthouse-metrics.md)

---

## Phase 6: User Story 4 - Improved Search Visibility (Priority: P3)

**Goal**: Unique meta titles/descriptions; LocalBusiness schema; Open Graph; keyword-rich alt text; valid sitemap/robots

**Independent Test**: Check meta tags for home, contact, programs, enrollment, about; validate LocalBusiness schema; verify sitemap.xml and robots.txt

### Implementation for User Story 4

- [x] T023 [P] [US4] Audit meta titles and descriptions in `src/lib/seo.ts` and page-level `useLocalizedMetadata`; ensure home, contact, programs, enrollment, about have unique titles and descriptions with local keywords ("Coquitlam daycare", "Montessori daycare Coquitlam")
- [x] T024 [P] [US4] Add or update LocalBusiness/ChildCare JSON-LD schema in `src/components/seo/StructuredData.tsx` per research.md §6 and data-model.md §5; include name, address, telephone, email, openingHours, geo, sameAs
- [x] T025 [US4] Verify Open Graph tags in `src/app/layout.tsx` and `buildPageMetadata` in `src/lib/seo.ts`; ensure og-image for social sharing
- [x] T026 [P] [US4] Add keyword-rich alt text to key images across `src/app/` and `src/components/` (e.g., "Montessori sensorial shelf at Friendship Corner Daycare Coquitlam BC")
- [x] T027 [US4] Verify `src/app/sitemap.ts` and `src/app/robots.ts` produce valid sitemap.xml and robots.txt; include all primary pages

**Checkpoint**: User Story 4 complete—SEO metadata and schema validated

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and documentation

- [x] T028 Run full QA per `specs/004-website-optimization/quickstart.md` (ScrollSpy, contact form, hero removal, Lighthouse, SEO validation)
- [x] T029 [P] Document final Lighthouse metrics and any remaining optimizations in `specs/004-website-optimization/`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies
- **Phase 2 (Foundational)**: Depends on Phase 1; blocks US2 ScrollSpy work
- **Phase 3 (US1)**: Can start after Phase 1; no dependency on Phase 2
- **Phase 4 (US2)**: Depends on Phase 2 (useScrollSpy) and Phase 1
- **Phase 5 (US3)**: Can start after Phase 1; independent
- **Phase 6 (US4)**: Can start after Phase 1; independent
- **Phase 7 (Polish)**: Depends on completion of desired user stories

### User Story Dependencies

- **US1 (P1)**: Independent—can start immediately after Setup
- **US2 (P2)**: Requires Foundational (useScrollSpy)
- **US3 (P2)**: Independent
- **US4 (P3)**: Independent

### Parallel Opportunities

- T002, T004, T006 can run in parallel
- T010–T015 (PageHero removal) can run in parallel (different files)
- T019, T021, T023, T024, T026 can run in parallel
- US1, US3, US4 can proceed in parallel once Setup is done
- US2 can proceed once T003 (useScrollSpy) is complete

---

## Parallel Example: User Story 2

```bash
# After T003 and T008 complete, PageHero removals can run in parallel:
T010: Remove PageHero from src/app/about/page-client.tsx
T011: Remove PageHero from src/app/programs/page-client.tsx
T012: Remove PageHero from src/app/contact/page-client.tsx
T013: Remove PageHero from src/app/gallery/page-client.tsx
T014: Remove PageHero from src/app/enrollment/page-client.tsx
T015: Remove PageHero from community pages
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 3: User Story 1 (Contact info prominent)
3. **STOP and VALIDATE**: Verify contact visible above fold; form works
4. Deploy/demo if ready

### Incremental Delivery

1. Setup → US1 → Validate (MVP)
2. Foundational + US2 → Validate (ScrollSpy, simplified pages)
3. US3 → Validate (Performance)
4. US4 → Validate (SEO)
5. Polish → Final QA

### Parallel Team Strategy

- Developer A: US1 (contact info) + US4 (SEO)
- Developer B: T003 (hook) → US2 (ScrollSpy, hero removal, content)
- Developer C: US3 (image audit, performance)

---

## Notes

- [P] = different files, no dependencies
- [Story] maps task to user story for traceability
- Contact form API already exists at `POST /api/contact`; no contract tests required
- Preserve i18n (EN/中文) and theme support throughout
- Commit after each task or logical group
