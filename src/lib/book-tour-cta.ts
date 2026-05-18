import { cn } from '@/lib/utils';

/** Shared fill colors — use CSS variables so header and hero chips resolve identically at runtime. */
export const bookTourCtaColorClass = 'bg-[var(--primary)] text-[var(--primary-foreground)]';

export const bookTourCtaShadowClass =
  'shadow-[0_14px_30px_rgba(59,130,246,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(59,130,246,0.34)]';

/** Desktop header “Book a Tour” link (rounded pill). */
export const headerBookTourClassName = cn(
  'relative inline-flex min-h-11 items-center gap-2 overflow-hidden rounded-full px-4 text-sm font-bold',
  bookTourCtaColorClass,
  bookTourCtaShadowClass,
);

/** Hero info chip shell — same colors as header CTA, chip layout. */
export const heroInfoChipClassName = cn(
  'relative overflow-hidden group/cta font-bold',
  bookTourCtaColorClass,
  bookTourCtaShadowClass,
  'inline-flex h-auto min-h-0 items-center justify-start gap-3 rounded-xl px-4 py-3 text-sm leading-snug md:text-[0.9375rem]',
);
