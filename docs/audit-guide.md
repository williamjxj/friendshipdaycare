# Performance & Accessibility Audit Guide

**Date**: 2025-12-30  
**Feature**: UI Improvement (001-ui-improvement)  
**Purpose**: Guide for running performance and accessibility audits

## Performance Audits

### 1. Lighthouse Audit (Chrome DevTools)

**Steps**:
1. Open Chrome DevTools (F12 or Cmd+Option+I)
2. Navigate to the "Lighthouse" tab
3. Select categories:
   - ✅ Performance
   - ✅ Accessibility
   - ✅ Best Practices
   - ✅ SEO
4. Select device: Desktop or Mobile
5. Click "Analyze page load"
6. Review scores and recommendations

**Target Scores**:
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 90

**Key Metrics to Check**:
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **FCP (First Contentful Paint)**: < 1.8s
- **TTI (Time to Interactive)**: < 3.8s

**Pages to Audit**:
- `/` (Homepage)
- `/about`
- `/programs`
- `/contact`
- `/enrollment`
- `/gallery`
- `/community/todays-story`
- `/community/journal`

### 2. Core Web Vitals (PageSpeed Insights)

**Steps**:
1. Go to https://pagespeed.web.dev/
2. Enter your site URL
3. Click "Analyze"
4. Review Core Web Vitals scores
5. Check both Mobile and Desktop

**Target Metrics**:
- LCP: < 2.5s (Good)
- FID: < 100ms (Good)
- CLS: < 0.1 (Good)

### 3. WebPageTest

**Steps**:
1. Go to https://www.webpagetest.org/
2. Enter your site URL
3. Select test location and browser
4. Run test
5. Review waterfall chart and performance metrics

## Accessibility Audits

### 1. WAVE (Web Accessibility Evaluation Tool)

**Browser Extension**:
1. Install WAVE extension for Chrome/Firefox
2. Navigate to your page
3. Click WAVE icon in toolbar
4. Review errors, alerts, and features
5. Fix issues identified

**Online Tool**:
1. Go to https://wave.webaim.org/
2. Enter your site URL
3. Review results
4. Fix errors and warnings

**Key Areas to Check**:
- Missing alt text on images
- Missing form labels
- Color contrast issues
- Missing heading hierarchy
- Missing ARIA labels
- Keyboard navigation issues

### 2. axe DevTools

**Steps**:
1. Install axe DevTools extension
2. Open Chrome DevTools
3. Navigate to "axe DevTools" tab
4. Click "Scan" button
5. Review violations and recommendations
6. Fix issues

**Target**: Zero violations

### 3. Lighthouse Accessibility Audit

**Steps**:
1. Run Lighthouse audit (see Performance section)
2. Review Accessibility section
3. Check all recommendations
4. Fix issues

**Key Checks**:
- ✅ Color contrast ratios (WCAG AA: 4.5:1 for text, 3:1 for large text)
- ✅ Alt text on images
- ✅ Form labels
- ✅ Heading hierarchy
- ✅ ARIA attributes
- ✅ Keyboard navigation
- ✅ Focus indicators

### 4. Keyboard Navigation Testing

**Manual Test**:
1. Use Tab key to navigate through page
2. Ensure all interactive elements are reachable
3. Check focus indicators are visible
4. Test Enter/Space on buttons
5. Test Escape on modals/dropdowns
6. Ensure logical tab order

**Pages to Test**:
- All pages with forms
- Navigation menu
- Dropdown menus
- Modal dialogs
- Image carousels

### 5. Screen Reader Testing

**Tools**:
- **NVDA** (Windows, free): https://www.nvaccess.org/
- **JAWS** (Windows, paid): https://www.freedomscientific.com/
- **VoiceOver** (Mac, built-in): Cmd+F5

**Test Checklist**:
- ✅ All images have descriptive alt text
- ✅ Form inputs have labels
- ✅ Buttons have accessible names
- ✅ Headings are properly structured
- ✅ Links have descriptive text
- ✅ ARIA landmarks are used correctly
- ✅ Error messages are announced

## Cross-Browser Testing

### Browsers to Test

1. **Chrome** (Latest 2 versions)
   - Desktop: Windows, macOS, Linux
   - Mobile: Android

2. **Firefox** (Latest 2 versions)
   - Desktop: Windows, macOS, Linux
   - Mobile: Android

3. **Safari** (Latest 2 versions)
   - Desktop: macOS
   - Mobile: iOS

4. **Edge** (Latest 2 versions)
   - Desktop: Windows, macOS

### Testing Checklist

**Visual**:
- ✅ Layout renders correctly
- ✅ Colors display properly
- ✅ Fonts load correctly
- ✅ Images display properly
- ✅ Animations work smoothly

**Functional**:
- ✅ Navigation works
- ✅ Forms submit correctly
- ✅ Links work
- ✅ Buttons function
- ✅ Dropdowns open/close
- ✅ Modals open/close
- ✅ Carousels work
- ✅ Video players work

**Responsive**:
- ✅ Mobile (< 768px)
- ✅ Tablet (768px - 1024px)
- ✅ Desktop (> 1024px)
- ✅ Large screens (> 1920px)

## Device Testing

### Desktop Resolutions
- 1920x1080 (Full HD)
- 1440x900
- 1280x720
- 2560x1440 (2K)

### Tablet
- iPad (768x1024)
- iPad Pro (1024x1366)
- Android tablets (various)

### Mobile
- iPhone SE (375x667)
- iPhone 12/13/14 (390x844)
- iPhone 14 Pro Max (430x932)
- Android phones (various)

## Testing Tools

### BrowserStack / Sauce Labs
- Cross-browser testing service
- Test on real devices
- Screenshot comparison

### Responsive Design Mode
- Chrome DevTools: Cmd+Shift+M
- Firefox DevTools: Cmd+Shift+M
- Safari: Develop > Enter Responsive Design Mode

## Common Issues to Fix

### Performance
- Large image files → Optimize/compress
- Unused CSS/JS → Remove or code split
- Render-blocking resources → Defer/async
- Missing image dimensions → Add width/height
- Large bundle size → Code splitting

### Accessibility
- Missing alt text → Add descriptive alt text
- Low contrast → Increase contrast ratio
- Missing labels → Add form labels
- Missing headings → Add proper heading hierarchy
- Keyboard traps → Fix focus management
- Missing ARIA → Add appropriate ARIA attributes

## Reporting

After completing audits, document:
1. Scores/metrics for each page
2. Issues found and fixed
3. Remaining issues (if any)
4. Recommendations for future improvements

## Next Steps

1. Run Lighthouse audit on all pages
2. Run WAVE audit on all pages
3. Test keyboard navigation
4. Test on multiple browsers
5. Test on multiple devices
6. Fix any issues found
7. Re-audit to verify fixes

