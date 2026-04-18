# Repository Guidelines

## Project Structure & Module Organization
This is a Next.js App Router workspace. Route entries, metadata, and API handlers live under `src/app`, with client wrappers such as `page-client.tsx` stored beside their route. Shared UI and motion primitives belong in `src/components`, cross-cutting state in `src/contexts`, and hooks in `src/hooks`. Data, copy, and localization bundles live in `src/data`, `src/messages`, and `src/i18n`. Integrations, storage helpers, and SEO utilities sit in `src/lib`. Static assets go to `public`, docs and briefs to `docs`, helper scripts to `scripts`, and Playwright suites to `tests` (artifact output in `test-results/`).

## Build, Test, and Development Commands
- `npm run dev` — standard dev server (Webpack HMR).
- `npm run dev:turbo` — Turbopack preview for faster rebuilds.
- `npm run build` / `npm run start` — production build and smoke server.
- `npm run lint` — ESLint + Next stack rules.
- `npm run test:e2e` — Playwright regression run.
Run lint + e2e locally before requesting review.

## Coding Style & Naming Conventions
Author code in TypeScript with 2-space indents and Prettier defaults; keep imports on a single line and favor the `@/` alias over relative paths. Components and contexts use PascalCase, hooks use `useCamelCase`, and files exporting React components stay in `*.tsx`. Place `"use client"` only when required. Prefer Tailwind utility classes for layout, reserving inline styles for GSAP/motion hooks, and keep copy strings centralized in the locale files.

## Testing Guidelines
Playwright (`*.spec.ts`) is the source of truth; group suites by surface area (e.g., `tests/enrollment`). Provide deterministic selectors (`data-testid`) for interactive pieces and capture new flows with short, focused specs. Attach failing traces or videos from `test-results/` when triaging. Logic-heavy hooks or lib helpers may add lightweight Playwright `test.describe` units, but prioritize covering user journeys end-to-end.

## Commit & Pull Request Guidelines
Commits follow the concise, present-tense convention seen in history (`feat: add subsidy chip`, `fix: gallery ratio`). Keep each commit scoped to one change and ensure lint/e2e pass before pushing. Pull requests should include a summary, linked issue, screenshots or recordings for UI updates, notes on affected env vars or scripts, and a checklist of automated/manual tests executed.

## Configuration & Security
Environment values load from `.env.local` and are validated in `src/lib/env.ts`. Set `NEXT_PUBLIC_R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, and any CDN URLs before touching upload flows. Never commit secrets or Playwright artifacts containing tokens; rotate keys if traces are shared externally.
