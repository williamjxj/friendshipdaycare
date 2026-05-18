# Welcome Flyer QR + Tour Form — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a mobile-first `/welcome` tour-request page with dedicated API/email flow, plus QR assets composited onto `flyer-0320.png`.

**Architecture:** Dedicated `POST /api/welcome` and `WelcomeForm`; extract minimal Resend helpers from contact. QR generated via `scripts/generate-welcome-qr.ts` using `qrcode` + `sharp` devDependencies.

**Tech Stack:** Next.js 16 App Router, React 19, Zod 4, Resend, Playwright, Tailwind 4, `qrcode`, `sharp`, `tsx`

**Spec:** `docs/superpowers/specs/2026-05-18-welcome-flyer-design.md`

---

## File map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/lib/email/resend-client.ts` | Create | Shared Resend init + from-address |
| `src/app/api/contact/route.ts` | Modify | Use shared helper (no behavior change) |
| `src/app/api/welcome/route.ts` | Create | Welcome form API + emails |
| `src/components/ui/welcome-form.tsx` | Create | Mobile-first welcome form |
| `src/app/welcome/page.tsx` | Create | Metadata + server entry |
| `src/app/welcome/page-client.tsx` | Create | Page layout + contact cards |
| `src/messages/en.json` | Modify | `welcomePage` copy keys |
| `scripts/generate-welcome-qr.ts` | Create | QR + flyer composite |
| `public/assets/qr/welcome-flyer-0320.svg` | Create | Standalone QR (script) |
| `public/assets/qr/welcome-flyer-0320.png` | Create | Standalone QR (script) |
| `public/assets/flyer-0320.png` | Modify | QR bottom-right (script) |
| `tests/e2e/welcome-form.spec.ts` | Create | E2E tests |
| `package.json` | Modify | devDeps + script |

---

### Task 1: Shared Resend helper

**Files:**
- Create: `src/lib/email/resend-client.ts`
- Modify: `src/app/api/contact/route.ts`

- [ ] **Step 1: Create `resend-client.ts`**

```typescript
import { Resend } from 'resend';

export function getResendClient(): { resend: Resend; fromEmail: string } | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@friendshipdaycare.com';
  return { resend: new Resend(apiKey), fromEmail };
}

export function businessFromAddress(fromEmail: string): string {
  return `Friendship Corner Daycare <${fromEmail}>`;
}
```

- [ ] **Step 2: Refactor contact route to use helper**

In `src/app/api/contact/route.ts`, replace inline `apiKey` / `new Resend` / `fromEmail` with:

```typescript
import { businessFromAddress, getResendClient } from '@/lib/email/resend-client';

// inside POST:
const client = getResendClient();
if (!client) {
  return NextResponse.json({ success: false, message: '...' }, { status: 503 });
}
const { resend, fromEmail } = client;
const emailConfig = {
  businessFrom: businessFromAddress(fromEmail),
  customerFrom: businessFromAddress(fromEmail),
};
```

Keep all email HTML and response logic unchanged.

- [ ] **Step 3: Verify contact still works**

Run: `npm run lint`  
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/lib/email/resend-client.ts src/app/api/contact/route.ts
git commit -m "refactor: extract shared Resend client for form APIs"
```

---

### Task 2: Welcome API route

**Files:**
- Create: `src/app/api/welcome/route.ts`

- [ ] **Step 1: Create route with Zod schema**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { businessFromAddress, getResendClient } from '@/lib/email/resend-client';

const tourTimePreferenceSchema = z.enum(['morning', 'afternoon', 'any']);

const welcomeFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().max(30).optional(),
  childAge: z.string().max(50).optional(),
  childrenDetails: z.string().max(500).optional(),
  tourDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid tour date'),
  tourTimePreference: tourTimePreferenceSchema,
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message too long'),
  source: z.string().max(64).optional(),
});

function formatSourceLabel(source?: string): string {
  if (source === 'flyer-0320') return 'Flyer (0320)';
  return 'Direct / unknown';
}

function tourTimeLabel(pref: z.infer<typeof tourTimePreferenceSchema>): string {
  const labels = { morning: 'Morning', afternoon: 'Afternoon', any: 'Any time' } as const;
  return labels[pref];
}

export async function POST(request: NextRequest) {
  try {
    const client = getResendClient();
    if (!client) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Email service is not configured. Please contact us directly at friendship.care@live.ca or call 604.945.8504.',
        },
        { status: 503 },
      );
    }
    const { resend, fromEmail } = client;
    const from = businessFromAddress(fromEmail);

    const body = await request.json();
    const data = welcomeFormSchema.parse(body);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tourDate = new Date(`${data.tourDate}T00:00:00`);
    if (Number.isNaN(tourDate.getTime()) || tourDate < today) {
      return NextResponse.json(
        { success: false, message: 'Please choose a tour date today or later.' },
        { status: 400 },
      );
    }

    const sourceLabel = formatSourceLabel(data.source);
    const isFlyer = data.source === 'flyer-0320';
    const timeLabel = tourTimeLabel(data.tourTimePreference);

    const staffSubject = isFlyer
      ? `Welcome / Tour request from ${data.name} (Flyer)`
      : `Welcome / Tour request from ${data.name}`;

    // Build staffHtml, staffText, confirmationHtml, confirmationText by copying
    // inline email structure from src/app/api/contact/route.ts and adding:
    // - Source line, tour date/time, childrenDetails
    // - Confirmation copy mentions tour request (and flyer when isFlyer)

- [ ] **Step 2: Send staff + confirmation emails**

```typescript
    await resend.emails.send({
      from,
      to: ['friendship.care@live.ca'],
      replyTo: data.email,
      subject: staffSubject,
      html: staffHtml,
      text: staffText,
    });

    await resend.emails.send({
      from,
      to: [data.email],
      replyTo: 'friendship.care@live.ca',
      subject: 'Thank you — Friendship Corner Daycare tour request',
      html: confirmationHtml,
      text: confirmationText,
    });

    return NextResponse.json(
      { success: true, message: "Request sent! We'll get back to you within 24 hours." },
      { status: 200 },
    );
```

- [ ] **Step 3: Error handling** — copy Zod + generic catch pattern from contact route.

- [ ] **Step 4: Lint**

Run: `npm run lint`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/api/welcome/route.ts
git commit -m "feat: add welcome tour request API with Resend emails"
```

---

### Task 3: English copy (`welcomePage`)

**Files:**
- Modify: `src/messages/en.json`

- [ ] **Step 1: Add `welcomePage` block** (after `contactPage`):

```json
  "welcomePage": {
    "hero": {
      "title": "Welcome to Friendship Corner",
      "subtitle": "Schedule a tour — we'd love to meet your family"
    },
    "form": {
      "title": "Request a tour",
      "success": "Thank you! We'll confirm your tour by phone or email within 24 hours.",
      "submit": "Send tour request",
      "submitting": "Sending...",
      "fields": {
        "name": "Full Name",
        "email": "Email Address",
        "phone": "Phone Number",
        "childAge": "Child's Age",
        "childrenDetails": "Children (optional)",
        "tourDate": "Preferred tour date",
        "tourTimePreference": "Preferred time",
        "message": "Message"
      },
      "placeholders": {
        "name": "Your full name",
        "email": "your.email@example.com",
        "phone": "604.945.8504",
        "childrenDetails": "e.g. 2 children, ages 3 and 5",
        "message": "Anything else we should know for your visit?"
      },
      "tourTime": {
        "morning": "Morning",
        "afternoon": "Afternoon",
        "any": "Any time"
      },
      "options": {
        "agePlaceholder": "Select age range",
        "ageToddler": "30 months - 3 years",
        "agePreschool": "3 - 4 years",
        "agePreK": "4 - 5 years",
        "ageOther": "Other"
      },
      "validation": {
        "nameRequired": "Full name is required",
        "emailRequired": "Email address is required",
        "emailInvalid": "Please enter a valid email address",
        "tourDateRequired": "Please choose a preferred tour date",
        "tourTimeRequired": "Please choose a time preference",
        "messageRequired": "Message is required",
        "messageMin": "Message must be at least 10 characters long",
        "formError": "Please correct the errors below and try again.",
        "submitError": "Failed to send request. Please try again.",
        "networkError": "Network error. Please check your connection and try again."
      }
    },
    "info": {
      "title": "Get in touch",
      "description": "Questions before your visit? Call or email — we're happy to help."
    },
    "cards": {
      "phone": { "title": "Phone", "subtitle": "Mon–Fri 7:00 AM – 6:00 PM" },
      "email": { "title": "Email", "subtitle": "We respond within 24 hours" },
      "hours": {
        "title": "Hours",
        "weekdays": "Monday – Friday",
        "hours": "7:00 AM – 6:00 PM",
        "subtitle": "Closed weekends and holidays"
      },
      "location": { "title": "Location", "subtitle": "Coquitlam — near Coquitlam Station" }
    }
  },
```

- [ ] **Step 2: Commit**

```bash
git add src/messages/en.json
git commit -m "feat: add welcomePage English copy"
```

---

### Task 4: WelcomeForm component

**Files:**
- Create: `src/components/ui/welcome-form.tsx`

- [ ] **Step 1: Write failing Playwright test first** (Task 6 can be parallel; TDD order: test → form)

See Task 6 for test file — implement form to satisfy test.

- [ ] **Step 2: Create `WelcomeForm`**

Key implementation points:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

export function WelcomeForm() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const [source, setSource] = useState('unknown');

  useEffect(() => {
    setSource(searchParams.get('source') ?? 'unknown');
  }, [searchParams]);

  // formData includes: name, email, phone, childAge, childrenDetails,
  // tourDate, tourTimePreference, message

  // min date for tourDate input:
  const minDate = new Date().toISOString().slice(0, 10);

  // POST /api/welcome with { ...formData, source }

  // data-testid attributes:
  // welcome-form, welcome-submit, welcome-success
```

**Layout (mobile-first):**

- Single column: `grid grid-cols-1 gap-3 sm:gap-4`
- On `sm+`: name/email row `sm:grid-cols-2`; phone/childAge row `sm:grid-cols-2`; tour date + time row `sm:grid-cols-2`
- Full-width children details + message
- Submit button: `w-full min-h-[52px]`
- Wrap in `<Suspense>` boundary in page-client because of `useSearchParams`

Reuse input classes from `contact-form.tsx` (`inputBase`, `labelClass`, etc.).

- [ ] **Step 3: Export from `src/components/ui/index.ts` if barrel exists**

- [ ] **Step 4: Lint**

Run: `npm run lint`

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/welcome-form.tsx src/components/ui/index.ts
git commit -m "feat: add mobile-first WelcomeForm component"
```

---

### Task 5: Welcome page

**Files:**
- Create: `src/app/welcome/page.tsx`
- Create: `src/app/welcome/page-client.tsx`

- [ ] **Step 1: `page.tsx`**

```typescript
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { WelcomePageClient } from './page-client';

export const metadata: Metadata = buildPageMetadata({
  title: 'Welcome — Schedule a Tour',
  description:
    'Welcome to Friendship Corner Daycare in Coquitlam. Request a tour after scanning our flyer.',
  path: '/welcome',
});

export default function WelcomePage() {
  return <WelcomePageClient />;
}
```

- [ ] **Step 2: `page-client.tsx`**

- `main#main-content` with `fdc-section-shell min-h-screen pt-20 pb-20`
- Hero using `t('welcomePage.hero.title')` etc.
- `<Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-muted" />}><WelcomeForm /></Suspense>`
- Contact cards: reuse `Card`, icons from `@heroicons/react/24/outline`, `businessProfile` for tel/mailto/links — copy structure from `ContactFormSection` info cards (lines ~147–190) but **no map/FAQ**
- `data-testid="welcome-page"` on main

- [ ] **Step 3: Confirm `/welcome` not in `src/proxy.ts` matcher**

No change needed if path not listed.

- [ ] **Step 4: Manual smoke**

Run: `npm run dev`  
Visit: `http://localhost:3000/welcome?source=flyer-0320`  
Expected: English form, mobile layout OK at 390px width.

- [ ] **Step 5: Commit**

```bash
git add src/app/welcome/page.tsx src/app/welcome/page-client.tsx
git commit -m "feat: add mobile-first welcome tour request page"
```

---

### Task 6: Playwright E2E

**Files:**
- Create: `tests/e2e/welcome-form.spec.ts`

- [ ] **Step 1: Write test**

```typescript
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

    await page.getByTestId('welcome-name').fill('Test Parent');
    await page.getByTestId('welcome-email').fill('parent@example.com');
    await page.getByTestId('welcome-tour-date').fill('2026-06-01');
    await page.getByTestId('welcome-tour-time').selectOption('morning');
    await page.getByTestId('welcome-message').fill('We would like to visit your Coquitlam location soon.');

    await page.getByTestId('welcome-submit').click();

    await expect(page.getByTestId('welcome-success')).toBeVisible();
    expect(postedBody?.source).toBe('flyer-0320');
    expect(postedBody?.tourTimePreference).toBe('morning');
  });

  test('no horizontal overflow on mobile', async ({ page }) => {
    await page.goto('/welcome');
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });
});
```

Add matching `data-testid` on form fields in `WelcomeForm`.

- [ ] **Step 2: Run tests**

Run: `npm run test:e2e -- tests/e2e/welcome-form.spec.ts`  
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/welcome-form.spec.ts src/components/ui/welcome-form.tsx
git commit -m "test: add welcome form e2e coverage"
```

---

### Task 7: QR generation script + assets

**Files:**
- Create: `scripts/generate-welcome-qr.ts`
- Modify: `package.json`
- Create: `public/assets/qr/*`
- Modify: `public/assets/flyer-0320.png`

- [ ] **Step 1: Add devDependencies**

```bash
npm install -D qrcode @types/qrcode sharp
```

- [ ] **Step 2: Add npm script**

```json
"generate:welcome-qr": "tsx scripts/generate-welcome-qr.ts"
```

- [ ] **Step 3: Create script**

```typescript
import fs from 'node:fs/promises';
import path from 'node:path';
import QRCode from 'qrcode';
import sharp from 'sharp';

const WELCOME_URL = 'https://friendshipdaycare.com/welcome?source=flyer-0320';
const ROOT = process.cwd();
const QR_DIR = path.join(ROOT, 'public/assets/qr');
const FLYER_PATH = path.join(ROOT, 'public/assets/flyer-0320.png');
const QR_PNG = path.join(QR_DIR, 'welcome-flyer-0320.png');
const QR_SVG = path.join(QR_DIR, 'welcome-flyer-0320.svg');

async function main() {
  await fs.mkdir(QR_DIR, { recursive: true });

  await QRCode.toFile(QR_PNG, WELCOME_URL, { width: 512, margin: 2, errorCorrectionLevel: 'M' });
  await fs.writeFile(QR_SVG, await QRCode.toString(WELCOME_URL, { type: 'svg', margin: 2 }));

  const flyer = sharp(FLYER_PATH);
  const meta = await flyer.metadata();
  const width = meta.width ?? 1200;
  const height = meta.height ?? 1600;
  const qrSize = Math.round(width * 0.14);
  const padding = Math.round(width * 0.03);

  const qrBuffer = await sharp(QR_PNG).resize(qrSize, qrSize).png().toBuffer();

  const left = width - qrSize - padding;
  const top = height - qrSize - padding;

  await flyer
    .composite([{ input: qrBuffer, left, top }])
    .toFile(FLYER_PATH + '.tmp');

  await fs.rename(FLYER_PATH + '.tmp', FLYER_PATH);
  console.log('Wrote', QR_PNG, QR_SVG, 'and updated', FLYER_PATH);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

**Note:** Back up original `flyer-0320.png` before first run if needed for design review.

- [ ] **Step 4: Run script**

Run: `npm run generate:welcome-qr`  
Expected: QR files created; flyer updated with bottom-right QR.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json scripts/generate-welcome-qr.ts public/assets/qr public/assets/flyer-0320.png
git commit -m "feat: add welcome flyer QR assets and generation script"
```

---

### Task 8: Final verification

- [ ] **Step 1: Full lint + e2e**

```bash
npm run lint && npm run test:e2e
```

Expected: PASS

- [ ] **Step 2: Production build**

```bash
npm run build
```

Expected: PASS; `/welcome` listed in build output.

- [ ] **Step 3: Manual QR check**

Open `public/assets/flyer-0320.png` — QR visible bottom-right. Scan with phone → `/welcome?source=flyer-0320`.

- [ ] **Step 4: Optional live email test** (with `RESEND_API_KEY` in `.env.local`)

Submit real form in dev; confirm staff + confirmation emails.

---

## Plan self-review (completed)

| Spec requirement | Task |
|------------------|------|
| `/welcome` page, English, mobile-first | Task 4–5 |
| Extra tour fields | Task 4 |
| Hidden flyer source | Task 4, 6 |
| Dedicated API + emails | Task 2 |
| QR + flyer assets | Task 7 |
| No SPA redirect | Verified in Task 5 |
| Playwright tests | Task 6 |

No TBD placeholders in task steps; contact route refactor is behavior-preserving.

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-18-welcome-flyer.md`.

**Two execution options:**

1. **Subagent-Driven (recommended)** — fresh subagent per task, review between tasks  
2. **Inline Execution** — implement tasks in this session with checkpoints  

Which approach do you want?
