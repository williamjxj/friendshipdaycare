'use client';

import Link from 'next/link';

/**
 * Jump-to row for the single-page homepage.
 *
 * The homepage measures ~21,000px (~25 screens) on a 390x844 phone, with fees
 * around 16 screens down and the FAQ around 21. The header scrollspy helps on
 * desktop, but on mobile there was no way to reach a section without scrolling
 * past everything. This row gives each destination a 44px tap target.
 */
const JUMPS: Array<{ label: string; href: string }> = [
  { label: 'Programs', href: '#programs' },
  { label: 'Fees & hours', href: '#enrollment' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export function QuickJumpNav() {
  return (
    <nav
      aria-label="Jump to a section"
      className="border-y border-border/70 bg-card/80 px-3 py-2 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto">
        <span className="hidden shrink-0 px-1 text-xs font-bold uppercase tracking-wider text-muted-foreground sm:inline">
          Jump to
        </span>
        {JUMPS.map((jump) => (
          <Link
            key={jump.href}
            href={jump.href}
            className="fdc-tap-target shrink-0 rounded-full border border-primary/20 bg-primary/5 px-4 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
          >
            {jump.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
