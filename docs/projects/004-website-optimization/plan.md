# Implementation Plan: Website Simplify & Optimize

**Branch**: `004-website-optimization` | **Date**: 2025-03-10 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/004-website-optimization/spec.md`

## Summary

Simplify and optimize the Friendship Daycare website for intuitiveness, conciseness, and performance. Implement ScrollSpy navigation; retain hero section on landing page only; remove decorative hero sections from sub-pages; reduce redundant content (text, images, card boxes); prioritize contact information (phone, email, form); remove unused images; enhance SEO (metadata, LocalBusiness schema, sitemap). Technical approach derives from deep research in `docs/` (grok.md, claude.md, manus.md, todo.md).

## Technical Context

**Language/Version**: TypeScript 5.9, React 19, Next.js 16  
**Primary Dependencies**: Tailwind CSS 4, Framer Motion, GSAP, react-hook-form, zod, Resend, next-intl  
**Storage**: N/A (static content; contact form uses Resend API)  
**Testing**: ESLint; manual QA; Lighthouse/PageSpeed for performance  
**Target Platform**: Web (Vercel); mobile-first, modern browsers  
**Project Type**: Web application (Next.js App Router)  
**Performance Goals**: Homepage LCP < 3s on 4G; Lighthouse performance ≥ 80  
**Constraints**: Preserve i18n (EN/中文), theme support; no breaking changes to enrollment/gallery flows  
**Scale/Scope**: ~15 pages; single primary audience (parents in Coquitlam/Tri-Cities)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- No constitution file found (`.specify/memory/constitution.md`). N/A—proceeding without constitution gates.

## Project Structure

### Documentation (this feature)

```text
specs/004-website-optimization/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0 research (docs/ consolidation)
├── data-model.md        # Phase 1 data entities
├── quickstart.md        # Phase 1 developer quickstart
├── contracts/           # Phase 1 API/UI contracts
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx           # Metadata, JSON-LD schema
│   ├── page.tsx / page-client.tsx  # Homepage (HeroSection, ScrollSpy sections)
│   ├── about/               # Remove PageHero
│   ├── programs/            # Remove PageHero
│   ├── contact/             # Remove PageHero
│   ├── gallery/             # Remove PageHero
│   ├── enrollment/          # Remove PageHero; keep as standalone
│   ├── community/           # Remove PageHero from ece, montessori, journal, todays-story
│   └── api/
│       └── contact/route.ts  # Contact form API (existing)
├── components/
│   ├── layout/
│   │   ├── Header.tsx       # Navbar; add ScrollSpy + contact links
│   │   └── Footer.tsx       # Contact info, social links
│   ├── sections/
│   │   ├── HeroSection.tsx  # Keep; add contact CTAs
│   │   ├── ContactCTASection.tsx
│   │   └── ...
│   └── ui/
│       ├── page-hero.tsx    # Keep for HeroSection if needed; remove from sub-pages
│       └── ...
├── hooks/
│   └── useScrollSpy.ts     # NEW: Intersection Observer ScrollSpy
├── lib/
│   ├── business-profile.ts # Canonical contact data
│   ├── seo.ts              # Metadata helpers
│   └── ...
└── data/                   # Static content (programs, FAQ, etc.)
```

**Structure Decision**: Existing Next.js App Router structure; add `useScrollSpy` hook; modify Header for ScrollSpy; remove PageHero from non-home pages; consolidate content in sections.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

N/A.
