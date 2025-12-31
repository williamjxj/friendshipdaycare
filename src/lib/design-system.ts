/**
 * Design System Constants
 * Centralized design tokens for consistent styling
 */

/**
 * Spacing scale (in rem)
 */
export const spacing = {
  xs: '0.5rem',    // 8px
  sm: '0.75rem',   // 12px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
  '4xl': '5rem',   // 80px
} as const;

/**
 * Typography scale
 */
export const typography = {
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
    '7xl': '4.5rem',   // 72px
  },
  fontWeights: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  lineHeights: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
} as const;

/**
 * Border radius scale
 */
export const borderRadius = {
  none: '0',
  sm: '0.375rem',   // 6px
  md: '0.5rem',     // 8px
  lg: '0.75rem',    // 12px
  xl: '1rem',       // 16px
  '2xl': '1.5rem',  // 24px
  '3xl': '2rem',    // 32px
  full: '9999px',
} as const;

/**
 * Shadow scale
 */
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
} as const;

/**
 * Breakpoints (matching Tailwind defaults)
 */
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

/**
 * Touch target sizes (for mobile accessibility)
 */
export const touchTargets = {
  minimum: '44px',  // WCAG minimum
  recommended: '48px', // Better usability
  large: '56px',    // For important actions
} as const;

/**
 * Animation durations (in seconds)
 */
export const animationDurations = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
} as const;

/**
 * Z-index scale
 */
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

/**
 * Opacity scale
 */
export const opacity = {
  subtle: 0.05,
  light: 0.1,
  medium: 0.2,
  strong: 0.3,
  veryStrong: 0.4,
  semi: 0.5,
  heavy: 0.75,
  opaque: 1,
} as const;

/**
 * Component-specific constants
 */
export const components = {
  button: {
    padding: {
      sm: 'px-4 py-2',
      md: 'px-8 py-4',
      lg: 'px-10 py-5',
    },
    borderRadius: 'rounded-lg',
    fontSize: {
      sm: 'text-sm',
      md: 'text-lg',
      lg: 'text-xl',
    },
  },
  card: {
    padding: {
      sm: 'p-6',
      md: 'p-8',
    },
    borderRadius: {
      standard: 'rounded-xl',
      large: 'rounded-2xl',
    },
  },
  input: {
    padding: 'px-4 py-3',
    borderRadius: 'rounded-lg',
    minHeight: touchTargets.minimum,
  },
  section: {
    padding: {
      standard: 'py-20',
      spacious: 'py-24',
      compact: 'py-16',
    },
    container: 'px-4 sm:px-6 lg:px-8',
  },
} as const;

/**
 * Helper function to get responsive class
 */
export function getResponsiveClass(
  base: string,
  sm?: string,
  md?: string,
  lg?: string
): string {
  const classes = [base];
  if (sm) classes.push(`sm:${sm}`);
  if (md) classes.push(`md:${md}`);
  if (lg) classes.push(`lg:${lg}`);
  return classes.join(' ');
}

