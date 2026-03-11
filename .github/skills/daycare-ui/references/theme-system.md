# Theme System Reference

The Friendship Corner Daycare website supports 5 distinct themes, all implemented using CSS variables for automatic switching.

## Available Themes

1. **Playful (Default)** - Claymorphism style with soft, rounded edges
2. **Professional** - Clean corporate blue, formal
3. **Nature** - Earthy greens and browns
4. **Dark** - Dark backgrounds with high contrast
5. **Violet** - Purple/violet tones

## CSS Variables

### Color Variables

Use these CSS variables in your components for automatic theme switching:

```css
--primary              /* Main brand color */
--primary-foreground   /* Text on primary */
--secondary            /* Secondary accent */
--secondary-foreground /* Text on secondary */
--accent               /* Call-to-action color */
--accent-foreground    /* Text on accent */
--background           /* Page background */
--foreground           /* Main text color */
--muted                /* Muted backgrounds */
--muted-foreground     /* Muted text */
--border               /* Border color */
--card                 /* Card background */
--card-foreground      /* Card text */
--input                /* Input background */
--ring                 /* Focus ring color */
```

### Usage in Tailwind

```tsx
// Good - Uses theme variables
<div className="bg-primary text-primary-foreground">
<button className="bg-accent text-accent-foreground hover:bg-accent/90">
<div className="border border-border bg-card text-card-foreground">

// Bad - Hardcoded colors (won't switch themes)
<div className="bg-blue-500 text-white">
<button className="bg-orange-500">
<div className="border border-gray-300">
```

### Radius Variables

```css
--radius       /* 1rem (16px) - standard radius */
--radius-lg    /* 1.5rem (24px) - large radius */
--radius-xl    /* 2rem (32px) - extra large radius */
```

Usage:
```tsx
<div className="rounded-[var(--radius)]">
<Card className="rounded-[var(--radius-lg)]">
```

Or use Tailwind classes that map to these:
```tsx
<div className="rounded-lg">  {/* Uses theme radius */}
```

### Shadow Variables

```css
--shadow-sm    /* Small shadow */
--shadow-md    /* Medium shadow */
--shadow-lg    /* Large shadow */
--shadow-inner /* Inner shadow (claymorphism) */
```

## Theme-Specific Values

### Professional Theme
- Primary: Royal Blue (#2563EB)
- Accent: Amber (#F59E0B)
- Style: Clean, corporate, trustworthy

### Nature Theme
- Primary: Olive Green (#3F6212)
- Accent: Brown/Gold (#A16207)
- Style: Earthy, natural, organic

### Playful Theme (Default)
- Primary: Blue (#3B82F6)
- Accent: Orange (#F97316)
- Style: Soft, welcoming, claymorphism

### Dark Theme
- Primary: Light Blue (#60A5FA)
- Accent: Purple (#A78BFA)
- Style: High contrast, modern, sleek

### Violet Theme
- Primary: Purple (#7C3AED)
- Accent: Pink (#EC4899)
- Style: Creative, vibrant, distinctive

## Testing Themes

Always test your components in all 5 themes:

1. Open the page in browser
2. Click the theme switcher in the header
3. Cycle through all themes
4. Verify:
   - Colors change appropriately
   - Text remains readable (contrast)
   - Borders/shadows are visible
   - Hover states work
   - No hardcoded colors showing

## Common Issues

**"My colors don't change when switching themes"**
→ You're using hardcoded Tailwind colors like `bg-blue-500` instead of `bg-primary`

**"Text is hard to read in dark theme"**
→ Use `text-foreground` for body text and proper foreground variants

**"My custom color doesn't exist"**
→ Stick to the design system variables. If you need a new color, discuss adding it to the theme system

**"Gradient doesn't work with themes"**
→ Gradients are trickier. You can use: `bg-gradient-to-br from-primary/20 to-secondary/20`
