# Font Family Collection

This document outlines the font families used in the Friendship Corner Daycare website and how they are implemented.

## Font Families

### [Open Sans](https://fonts.google.com/specimen/Open+Sans)

- **Role**: Primary UI & Paragraph Font
- **Usage**: Applied to the `body`. Used for all paragraph text and standard UI elements.
- **Provider**: Google Fonts (`Open_Sans`)
- **Weights**: 300, 400, 500, 600, 700, 800
- **CSS Variable**: `--font-open-sans`

### [Nunito](https://fonts.google.com/specimen/Nunito)

- **Role**: Display & Heading Font
- **Usage**: Used for headings (`h1` through `h6`) and key display elements.
- **Provider**: Google Fonts (`Nunito`)
- **Weights**: 300, 400, 500, 600, 700, 800
- **CSS Variable**: `--font-nunito`

### [Fredoka](https://fonts.google.com/specimen/Fredoka)

- **Role**: Accent Font
- **Usage**: Used for specialized playful accents.
- **Provider**: Google Fonts (`Fredoka`)
- **Weights**: 300, 400, 500, 600, 700
- **CSS Variable**: `--font-fredoka`

## Implementation Mechanics

We use a two-step process to load and apply fonts, combining Next.js Font Optimization with Tailwind CSS variables.

### 1. Loading (layout.tsx)

Fonts are imported in `src/app/layout.tsx`. We use the `variable` property to expose the font files as CSS variables.

```tsx
const openSans = Open_Sans({ variable: "--font-open-sans", ... });
```

In the `body` tag, we include these variables:

```tsx
<body className={`${openSans.variable} ${nunito.variable} ...`}>
```

> [!NOTE]
> This "definition" step only makes the variable available; it doesn't change the font yet.

### 2. Application (globals.css)

In `src/app/globals.css`, we map these local Next.js variables to our theme variables **inside the `body` selector**. This ensures the variables are correctly scoped and available to all child elements.

```css
body {
  /* Step 2a: Define theme variables from loaded font variables */
  --font-sans: var(--font-open-sans), system-ui, sans-serif;
  --font-display: var(--font-nunito), system-ui, sans-serif;

  /* Step 2b: Apply the default font */
  font-family: var(--font-sans);
}

/* Step 2c: Force headings to use the display font */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
}
```

## Maintenance

To add or change fonts:

1. **Import** in `src/app/layout.tsx` and add to the `body` className.
2. **Assign** the variable in `src/app/globals.css` within the `body` selector.
3. **Verify** that headings and body text maintain their respective font families.
