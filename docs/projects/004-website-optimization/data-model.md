# Data Model: Website Simplify & Optimize

**Branch**: `004-website-optimization`  
**Scope**: Entities relevant to this feature (no new database; existing static/config data)

---

## 1. Business Contact Info

**Source**: `src/lib/business-profile.ts`

| Field | Type | Description |
|-------|------|-------------|
| name | string | Display name: "Friendship Corner Daycare" |
| legalName | string | Legal name for schema |
| url | string | Canonical site URL |
| telephone | string | Primary phone (e.g., 604.945.8504) |
| email | string | Primary email (e.g., friendship.care@live.ca) |
| address | BusinessAddress | streetAddress, addressLocality, addressRegion, postalCode, addressCountry |
| openingHours | string[] | e.g., ["Mo-Fr 07:00-18:00"] |
| serviceArea | string | e.g., "Tri-Cities (Coquitlam, Port Coquitlam, Port Moody)" |
| sameAs | string[]? | Social URLs (Facebook, Instagram) |
| googleBusinessProfileUrl | string? | GMB link when claimed |

**Validation**: Used for display, `tel:`/`mailto:` links, LocalBusiness schema. Single source of truth.

---

## 2. Page Metadata (SEO)

**Source**: `src/lib/seo.ts`, `useLocalizedMetadata` hook

| Field | Type | Description |
|-------|------|-------------|
| title | string | Page title; unique per route |
| description | string | Meta description; unique per route |
| path | string | Canonical path (e.g., /contact) |
| image | string? | OG image URL |
| keywords | string[] | SEO keywords (optional, page or site-level) |

**Validation**: Every primary page (home, about, programs, contact, enrollment, gallery) MUST have unique title and description.

---

## 3. Contact Form Payload

**Source**: `src/app/api/contact/route.ts` (Zod schema)

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| name | string | yes | min 1, max 100 |
| email | string | yes | valid email |
| phone | string | no | - |
| childAge | string | no | - |
| message | string | yes | min 10, max 1000 |

**API Contract**: POST `/api/contact`; see `contracts/contact-api.md`.

---

## 4. ScrollSpy Section

**Source**: Client state (no persistence)

| Field | Type | Description |
|-------|------|-------------|
| sectionIds | string[] | Ordered list of section DOM ids (e.g., ['hero','about','programs','contact']) |
| activeId | string | Current section id in view (from Intersection Observer) |
| offset | number | rootMargin top offset for sticky header (e.g., 80px) |

**Validation**: Section ids must exist as `id` attributes on homepage sections. Nav links use `href="/#${id}"`.

---

## 5. LocalBusiness Schema (JSON-LD)

**Source**: `StructuredData` component; derived from business-profile

| Field | Type | Description |
|-------|------|-------------|
| @type | ["ChildCare","LocalBusiness"] | Schema types |
| name | string | Business name |
| description | string | Brief description |
| url | string | Site URL |
| telephone | string | Phone with country code |
| email | string | Email |
| address | PostalAddress | Schema.org address object |
| geo | GeoCoordinates? | lat/lng for Maps |
| openingHoursSpecification | OpeningHoursSpecification[] | Day/week hours |
| aggregateRating | AggregateRating? | If reviews available |
| sameAs | string[] | Social URLs |

**Validation**: Must pass Google Rich Results Test / Schema validator.

---

## 6. Image Asset (Audit)

**Source**: `public/`, R2, or imported paths

| Field | Type | Description |
|-------|------|-------------|
| path | string | File path or URL |
| referencedIn | string[] | File paths that import/reference this image |
| used | boolean | referencedIn.length > 0 |

**Validation**: Unused images (referencedIn empty) are candidates for removal. Dynamic paths (e.g., from CMS) require manual review.
