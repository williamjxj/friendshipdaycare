# Draft: SEO Improvement Plan for Friendship Corner Daycare

## Research Summary

### Current Website State (from live site and code)
- Single-page scrollable design with anchor sections
- Already has LocalBusinessSchema, OrganizationSchema, WebSiteSchema
- Social links to Facebook and Instagram present
- Phone, address, hours clearly displayed
- Reviews section showing Google reviews

### Critical Issues Found (from code audit)
| Issue | Current State | Required Fix |
|-------|--------------|--------------|
| Postal code | V3C 2J4 | Change to V3C 6E7 |
| Google Business Profile URL | Commented out | Uncomment and add real URL |
| Google Fonts | 6 fonts loaded | Reduce to 2 |
| Geo coordinates | Approximate (49.25, -122.79) | Get exact from Google Maps |
| Opening hours in schema | Inconsistent | Verify matches business-profile.ts |
| FAQ Schema | Not implemented | Add FAQPage schema |

### Target Keywords
- "Coquitlam Daycare"
- "Coquitlam Montessori Daycare"
- "Montessori daycare Coquitlam"
- "Daycare near Coquitlam Station"
- "Tri-Cities childcare"
- "Port Coquitlam daycare"
- "Licensed daycare BC"
- "Montessori preschool Coquitlam"

### SEO Audit Document Reference
The docs/04-18.md already provides a comprehensive audit with:
- 🔴 Critical issues (fix this week)
- 🟡 High Impact issues (next 7 days)
- 🟢 Content Strategy (this month)
- 🔵 Advanced ongoing maintenance

## Technical Decisions
- Keep single-page ScrollSpy design (already implemented)
- Fix critical schema issues first
- Add FAQ schema for rich results
- Reduce font loading for Core Web Vitals
- Add more content/citations for long-term authority

## Scope
- IN: Fix all critical and high-impact SEO issues from the audit
- IN: Add FAQ schema
- IN: Optimize Core Web Vitals (fonts)
- IN: Verify/fix NAP consistency
- OUT: Content marketing strategy (blog posts) - defer to later
- OUT: Social media posting schedule - defer to later