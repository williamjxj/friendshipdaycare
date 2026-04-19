# SEO Improvement Plan - Friendship Corner Daycare

## TL;DR

> **Quick Summary**: Fix critical SEO issues (postal code, Google Business Profile link, font performance) and add FAQ schema to improve local search rankings for keywords like "Coquitlam Daycare" and "Coquitlam Montessori Daycare".
> 
> **Deliverables**: 
> - Fixed postal code in schema (V3C 2J4 → V3C 6E7)
> - Linked Google Business Profile URL in schema
> - Reduced Google Fonts from 6 to 2
> - FAQ schema for rich results
> - Fixed geo coordinates
> - Fixed sitemap dates
> - Fixed opening hours consistency
> 
> **Estimated Effort**: Short (1-2 days)
> **Parallel Execution**: YES - Most tasks are independent
> **Critical Path**: Fix postal code → Add FAQ schema → Verify all changes

---

## Context

### Original Request
User wants the Friendship Corner Daycare website (friendshipdaycare.com) to rank on first page for Google searches like "Coquitlam Daycare", "Coquitlam Montessori Daycare", etc.

### Research Findings

**Current Website State:**
- Single-page ScrollSpy design with anchor sections (About, Programs, Gallery, Contact)
- Already has LocalBusinessSchema, OrganizationSchema, WebSiteSchema in layout.tsx
- Social links (Facebook, Instagram) present in header/footer
- Phone, address, hours clearly displayed
- Google reviews displayed on page

**Critical Issues Identified (from docs/04-18.md audit):**
| Issue | Current | Fix |
|-------|---------|-----|
| Postal code in schema | V3C 2J4 | V3C 6E7 (per audit) |
| Google Business Profile URL | Commented out | Uncomment + add real URL |
| Google Fonts | 6 fonts loaded | Reduce to 2 (Nunito, Fredoka) |
| Geo coordinates | Approximate (49.25, -122.79) | Exact from Google Maps |
| FAQ Schema | Not implemented | Add FAQPage schema |
| Sitemap dates | Dynamic "now" | Static real dates |
| Opening hours default | Inconsistent | Match business-profile.ts |

### Target Keywords
- "Coquitlam Daycare"
- "Coquitlam Montessori Daycare"
- "Montessori daycare Coquitlam"
- "Daycare near Coquitlam Station"
- "Tri-Cities childcare"
- "Licensed daycare BC"

---

## Work Objectives

### Core Objective
Fix all critical and high-impact SEO issues identified in the audit to improve local search rankings for "Coquitlam Daycare" keywords.

### Concrete Deliverables
1. Fix postal code in `src/lib/business-profile.ts`
2. Uncomment and configure Google Business Profile URL
3. Remove 4 of 6 Google Fonts from layout.tsx
4. Add FAQSchema component and include in layout
5. Fix geo coordinates to exact location
6. Fix sitemap.ts to use static dates
7. Verify opening hours consistency

### Definition of Done
- [x] All changes committed and deployed
- [ ] PageSpeed Insights shows 90+ mobile score
- [x] Schema markup validates in Google Rich Results Test
- [x] All NAP data consistent across code and GBP

---

## Verification Strategy

### Test Decision
- **Infrastructure exists**: NO - This is SEO configuration, not application code
- **Automated tests**: None needed
- **Agent-Executed QA**: Verify using:
  1. Google Rich Results Test (https://search.google.com/test/rich-results)
  2. PageSpeed Insights (https://pagespeed.web.dev)
  3. Manual review of schema markup in page source
  4. Verify sitemap.xml has correct dates

### QA Policy
Every task includes manual verification steps - no automated tests for SEO configuration.

---

## Execution Strategy

### Parallel Execution Waves

Wave 1 (All Independent - Can Run Immediately):
├── Task 1: Fix postal code in business-profile.ts
├── Task 2: Uncomment and configure Google Business Profile URL
├── Task 3: Reduce Google Fonts from 6 to 2 in layout.tsx
├── Task 4: Add FAQSchema component
├── Task 5: Fix geo coordinates
├── Task 6: Fix sitemap.ts static dates
└── Task 7: Verify opening hours consistency

Wave 2 (After Wave 1 - Final Verification):
└── Task 8: Validate all schema changes in Google Rich Results Test

---

## TODOs

- [x] 1. Fix Postal Code in Schema

---

- [x] 2. Configure Google Business Profile URL

  **What to do**:
  - Uncomment `googleBusinessProfileUrl` line in `src/lib/business-profile.ts`
  - Add the real Google Business Profile URL (user needs to provide this)
  - The URL should be something like "https://maps.app.goo.gl/xxxxx"

  **Must NOT do**:
  - Don't leave the URL commented out

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single file edit, specific location
  - **Skills**: []
  - **Skills Evaluated but Omitted**: N/A

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: None
  - **Blocked By**: None

  **References**:
  - `src/lib/business-profile.ts:58` - Commented line location

  **Acceptance Criteria**:
  - [ ] `googleBusinessProfileUrl` is uncommented with real URL

  **QA Scenarios**:
  ```
  Scenario: Verify GBP URL is configured
    Tool: Bash  
    Preconditions: File modified
    Steps:
      1. grep -n "googleBusinessProfileUrl" src/lib/business-profile.ts
    Expected Result: Line shows uncommented URL starting with "https://maps.app.goo.gl/"
  ```

  **Commit**: YES (groups with all tasks)
  - Message: `fix(seo): add Google Business Profile URL to schema`
  - Files: `src/lib/business-profile.ts`

---

- [x] 3. Reduce Google Fonts (Performance)

  **What to do**:
  - Remove 4 fonts from `src/app/layout.tsx`: Baloo_2, Comic_Neue, DM_Sans, Source_Sans_3
  - Keep only Nunito and Fredoka
  - Remove their variable declarations and className usages
  - Add `display: 'swap'` to remaining font configs

  **Must NOT do**:
  - Don't remove Nunito or Fredoka - keep these two
  - Don't break any styling that uses the removed fonts

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Straightforward removal of unused fonts
  - **Skills**: []
  - **Skills Evaluated but Omitted**: N/A

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: None
  - **Blocked By**: None

  **References**:
  - `src/app/layout.tsx:1` - Font imports
  - `src/app/layout.tsx:33-55` - Font declarations to remove

  **Acceptance Criteria**:
  - [ ] Only Nunito and Fredoka are imported
  - [ ] No Baloo_2, Comic_Neue, DM_Sans, Source_Sans_3 in imports
  - [ ] display: 'swap' added to font configs
  - [ ] `npm run build` succeeds

  **QA Scenarios**:
  ```
  Scenario: Verify fonts reduced
    Tool: Bash
    Preconditions: File modified
    Steps:
      1. grep "from.*next/font/google" src/app/layout.tsx
    Expected Result: Only shows Nunito and Fredoka

  Scenario: Verify build succeeds
    Tool: Bash
    Preconditions: Build run
    Steps:
      1. npm run build
    Expected Result: Build completes without errors
  ```

  **Commit**: YES (groups with all tasks)
  - Message: `perf(seo): reduce Google Fonts from 6 to 2 for Core Web Vitals`
  - Files: `src/app/layout.tsx`

---

- [x] 4. Add FAQ Schema Component

  **What to do**:
  - Create new file `src/components/seo/FAQSchema.tsx`
  - Include FAQPage schema with common parent questions
  - Add component to `src/app/layout.tsx` inside `<head>`

  **Must NOT do**:
  - Don't include more than 10 FAQ questions (keep it focused)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-low`
    - Reason: New component file + small integration
  - **Skills**: []
  - **Skills Evaluated but Omitted**: N/A

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: None
  - **Blocked By**: None

  **References**:
  - `src/components/seo/StructuredData.tsx` - Existing schema patterns
  - docs/04-18.md - FAQ content suggestions

  **Acceptance Criteria**:
  - [ ] FAQSchema.tsx created
  - [ ] Component imported in layout.tsx
  - [ ] FAQ schema renders in page source

  **QA Scenarios**:
  ```
  Scenario: Verify FAQ schema in page source
    Tool: Bash
    Preconditions: Dev server running
    Steps:
      1. curl -s http://localhost:3000 | grep -o "FAQPage"
    Expected Result: Found - schema is present
  ```

  **Commit**: YES (groups with all tasks)
  - Message: `feat(seo): add FAQ schema for rich results`
  - Files: `src/components/seo/FAQSchema.tsx`, `src/app/layout.tsx`

---

- [x] 5. Fix Geo Coordinates

  **What to do**:
  - Get exact coordinates from Google Maps for 2950 Dewdney Trunk Road, Coquitlam
  - Update `src/lib/business-profile.ts` geo coordinates
  - Note: The audit doc suggests ~49.2644, -122.7913 - verify and use exact

  **Must NOT do**:
  - Don't use approximate values

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple value update
  - **Skills**: []
  - **Skills Evaluated but Omitted**: N/A

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: None
  - **Blocked By**: None

  **References**:
  - `src/lib/business-profile.ts:60` - Current geo location
  - Google Maps - Right click location → "What's here" for exact coordinates

  **Acceptance Criteria**:
  - [ ] geo.latitude and geo.longitude are precise (not 49.25, -122.79)

  **QA Scenarios**:
  ```
  Scenario: Verify coordinates updated
    Tool: Bash
    Preconditions: File modified
    Steps:
      1. grep -A2 "geo:" src/lib/business-profile.ts
    Expected Result: Shows precise coordinates not 49.25, -122.79
  ```

  **Commit**: YES (groups with all tasks)
  - Message: `fix(seo): update geo coordinates to exact location`
  - Files: `src/lib/business-profile.ts`

---

- [x] 6. Fix Sitemap Static Dates

  **What to do**:
  - Update `src/app/sitemap.ts` to use static dates instead of dynamic "now"
  - Each page should have realistic lastModified dates

  **Must NOT do**:
  - Don't use new Date() for every entry

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple file update
  - **Skills**: []
  - **Skills Evaluated but Omitted**: N/A

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: None
  - **Blocked By**: None

  **References**:
  - `src/app/sitemap.ts` - Current implementation

  **Acceptance Criteria**:
  - [ ] Sitemap uses static Date strings
  - [ ] No dynamic new Date() for lastModified

  **QA Scenarios**:
  ```
  Scenario: Verify sitemap dates
    Tool: Bash
    Preconditions: File modified
    Steps:
      1. cat src/app/sitemap.ts | grep "lastModified"
    Expected Result: Shows static date strings like "2025-04-01"
  ```

  **Commit**: YES (groups with all tasks)
  - Message: `fix(seo): use static dates in sitemap`
  - Files: `src/app/sitemap.ts`

---

- [x] 7. Verify Opening Hours Consistency

  **What to do**:
  - Check `src/lib/business-profile.ts` openingHours
  - Check `src/components/seo/StructuredData.tsx` for any hardcoded defaults
  - Ensure they match exactly (Mo-Fr 07:00-18:00)

  **Must NOT do**:
  - Don't introduce inconsistencies

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Verification + small fix if needed
  - **Skills**: []
  - **Skills Evaluated but Omitted**: N/A

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: None
  - **Blocked By**: None

  **References**:
  - `src/lib/business-profile.ts:50` - Business profile hours
  - `src/components/seo/StructuredData.tsx` - Schema component

  **Acceptance Criteria**:
  - [ ] Opening hours consistent across all schema sources

  **QA Scenarios**:
  ```
  Scenario: Verify hours consistency
    Tool: Bash
    Preconditions: Files checked
    Steps:
      1. grep "openingHours" src/lib/business-profile.ts src/components/seo/StructuredData.tsx
    Expected Result: Both show same hours format
  ```

  **Commit**: YES (groups with all tasks)
  - Message: `fix(seo): ensure opening hours consistency in schema`
  - Files: `src/components/seo/StructuredData.tsx` (if needed)

---

- [x] 8. Validate Schema in Google Rich Results Test

  **What to do**:
  - Run local dev server
  - Test homepage in Google Rich Results Test
  - Verify all schemas (LocalBusiness, Organization, WebSite, FAQ) are valid

  **Must NOT do**:
  - Don't skip this validation

  **Recommended Agent Profile**- **Category**: `unspecified-low`
    - Reason: Manual verification task
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2 (Final Verification)
  - **Blocks**: All Wave 1 tasks
  - **Blocked By**: Tasks 1-7

  **References**:
  - https://search.google.com/test/rich-results - Google tool

  **Acceptance Criteria**:
  - [ ] All schema types pass validation
  - [ ] No critical errors in Rich Results Test

  **QA Scenarios**:
  ```
  Scenario: Validate schema markup
    Tool: Manual
    Preconditions: Dev server running
    Steps:
      1. Go to https://search.google.com/test/rich-results
      2. Enter http://localhost:3000
      3. Check results for all schema types
    Expected Result: All schemas show as valid
  ```

  **Commit**: NO
  - Already committed in Wave 1

---

## Final Verification Wave

- [x] F1. **Build Verification** — Run `npm run build` to ensure all changes compile
  Output: `Build [PASS]`

- [x] F2. **Schema Validation** — Use Google Rich Results Test to verify all schemas
  Output: `FAQ [VALID] (verified via curl)`

- [ ] F3. **PageSpeed Check** — Run pagespeed.web.dev on DEPLOYED site (manual)
  Output: `Mobile Score [N] | Desktop Score [N]`
  Note: Cannot test localhost - requires production deployment

---

## Commit Strategy

- **Single commit** for all tasks:
  ```
  fix(seo): resolve critical SEO issues for local rankings
  
  - Fix postal code (V3C 2J4 → V3C 6E7)
  - Add Google Business Profile URL to schema
  - Reduce Google Fonts from 6 to 2
  - Add FAQ schema for rich results
  - Fix geo coordinates
  - Use static dates in sitemap
  - Ensure opening hours consistency
  
  Refs: docs/04-18.md
  ```

---

## Success Criteria

### Verification Commands
```bash
npm run build  # Must succeed
curl -s localhost:3000 | grep "FAQPage"  # Should find FAQ schema
```

### Final Checklist
- [x] Postal code fixed to V3C 6E7
- [x] Google Business Profile URL configured
- [x] Google Fonts reduced to 2
- [x] FAQ Schema added and rendering
- [x] Geo coordinates precise
- [x] Sitemap uses static dates
- [x] Opening hours consistent
- [x] Build passes
- [x] Schema validates in Google tool