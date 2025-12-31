# Design System: Friendship Corner Daycare

**Version**: 1.0  
**Date**: 2025-12-30  
**Purpose**: Codify UI patterns for consistent implementation across the website

## Principles

1. **Montessori-Inspired**: Warm, nurturing, child-centered aesthetic
2. **Accessibility First**: WCAG AA compliance, keyboard navigation, screen reader support
3. **Mobile-First**: Responsive design with 44x44px minimum touch targets
4. **Consistency**: Reusable patterns across all pages
5. **Performance**: Fast load times, smooth animations (60fps)

## Typography

### Font Families

- **Display**: Used for headings (Montessori theme)
- **Body**: Nunito (readable, friendly)

### Heading Scale

```css
h1: text-4xl md:text-6xl lg:text-7xl font-display font-bold
h2: text-3xl md:text-4xl font-display font-bold
h3: text-2xl font-semibold
h4: text-lg font-semibold
h5: text-base font-medium
h6: text-sm font-medium
```

### Body Text Scale

```css
Large: text-xl (intro text, hero subtitles)
Base: text-base (default body text)
Small: text-sm (captions, metadata)
Tiny: text-xs (labels, fine print)
```

### Line Heights

- Headings: `leading-tight`
- Body: `leading-relaxed`
- Compact: `leading-normal`

## Colors

### Theme Variables

All colors use CSS variables for theme support:

```css
--primary: Theme-specific primary color
--secondary: Theme-specific secondary color
--accent: Theme-specific accent color
--background: Page background
--foreground: Text color
--muted: Muted background/text
--border: Border color
--card: Card background
```

### Opacity Scale

- `/5`: Very subtle (backgrounds)
- `/10`: Light (hero backgrounds, subtle highlights)
- `/20`: Medium (icon backgrounds, card accents)
- `/30`: Strong (section backgrounds)
- `/40`: Very strong (hover states)

## Buttons

### Primary Button

```tsx
className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors"
```

**Usage**: Main CTAs, form submissions, primary actions

### Secondary Button

```tsx
className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary/10 transition-colors"
```

**Usage**: Secondary actions, alternative CTAs

### Large CTA Button

```tsx
className="bg-primary text-primary-foreground px-10 py-5 rounded-xl font-bold text-xl hover:bg-primary/90 transition-colors shadow-xl hover:shadow-2xl"
```

**Usage**: Hero section CTAs, prominent calls-to-action

### Button Sizes

- **Small**: `px-4 py-2 text-sm`
- **Medium**: `px-8 py-4 text-lg` (default)
- **Large**: `px-10 py-5 text-xl`

## Spacing

### Section Padding

- **Standard**: `py-20`
- **Spacious**: `py-24` (special sections)
- **Compact**: `py-16` (dense content)

### Container Padding

```css
px-4 sm:px-6 lg:px-8
```

### Gap Patterns

- **Cards**: `gap-8` (standard), `gap-12` (spacious)
- **Form fields**: `space-y-6` (standard), `space-y-4` (compact)
- **Grid items**: `gap-8`

## Cards

### Standard Card

```tsx
className="bg-card rounded-xl p-6 shadow-md"
```

### Feature Card

```tsx
className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
```

### Gradient Card

```tsx
className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8"
```

## Interactive Elements

### Hover States

**Buttons**: `hover:bg-primary/90 transition-colors`  
**Links**: `hover:text-primary transition-colors`  
**Cards**: `hover:bg-muted/40 transition-colors` or `hover:scale-105 transition-transform`

### Focus States

```css
focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
```

### Active States

- **Navigation**: `text-primary` with underline or dot indicator
- **Buttons**: `active:scale-95` for tactile feedback

## Hero Sections

### Structure

```tsx
<section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
  {/* SVG Background */}
  <svg className="absolute inset-0" />
  
  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
    <h1 className="text-4xl md:text-6xl font-display font-bold">
      {/* GSAP stagger animation */}
    </h1>
  </div>
</section>
```

### Animations

- **Text**: GSAP stagger from bottom with fade
- **Background**: ScrollTrigger parallax effect
- **Duration**: 1s with 0.2s stagger

## Forms

### Input Field

```tsx
<input
  className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
  minHeight="44px" // Mobile touch target
/>
```

### Label

```tsx
<label className="block text-sm font-medium text-foreground mb-2">
  Label Text
</label>
```

### Error State

```tsx
<input className="... border-error focus:ring-error" />
<p className="text-sm text-error mt-1">Error message</p>
```

## Navigation

### Desktop Navigation Item

```tsx
<Link
  className="flex flex-col items-center px-3 py-2 text-xs font-semibold transition-colors min-h-[44px] min-w-[44px]"
  href="/path"
>
  <Icon className="w-5 h-5" />
  <span>Label</span>
</Link>
```

### Mobile Navigation Item

```tsx
<Link
  className="flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium min-h-[44px]"
  href="/path"
>
  <Icon className="w-5 h-5" />
  <span>Label</span>
</Link>
```

## Accessibility

### Touch Targets

- **Minimum**: 44x44px on mobile
- **Recommended**: 48x48px for better usability

### Focus Indicators

- **Visible**: 2px ring with primary color
- **Contrast**: Meets WCAG AA requirements

### Color Contrast

- **Normal text**: 4.5:1 minimum
- **Large text**: 3:1 minimum

### Keyboard Navigation

- **Tab order**: Logical flow
- **Skip links**: Available for main content
- **Focus management**: Proper handling in modals/dropdowns

## Animations

### Performance

- **Target**: 60fps on standard mobile devices
- **Properties**: Use `transform` and `opacity` only
- **Respect**: `prefers-reduced-motion` media query

### Common Patterns

**Fade In**:
```tsx
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.6 }}
```

**Slide Up**:
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
```

**Stagger** (GSAP):
```tsx
gsap.from('.items > *', {
  y: 50,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: 'power3.out'
});
```

## Responsive Breakpoints

```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

## Usage Guidelines

1. **Always use design tokens** (CSS variables) for colors
2. **Follow spacing scale** for consistency
3. **Ensure mobile touch targets** meet 44x44px minimum
4. **Test keyboard navigation** for all interactive elements
5. **Verify color contrast** meets WCAG AA standards
6. **Respect prefers-reduced-motion** for animations

## Component Library

### Available Components

- `Button` (Primary, Secondary, Large CTA)
- `Card` (Standard, Feature, Gradient)
- `Input` (Text, Email, Textarea, Select)
- `Hero` (with GSAP animations)
- `Navigation` (Desktop, Mobile)
- `Footer` (5-column layout)

### Future Components

- `Modal` / `Dialog`
- `Accordion`
- `Tabs`
- `Carousel`
- `Tooltip`

