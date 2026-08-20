'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { BreadcrumbListSchema } from '@/components/seo/StructuredData';
import { businessProfile } from '@/lib/business-profile';

interface Crumb {
  name: string;
  href?: string;
}

const PAGE_TRAILS: Record<string, Crumb[]> = {
  '/funding': [{ name: 'Funding & Subsidies', href: '/funding' }],
  '/our-team': [{ name: 'Our Team', href: '/our-team' }],
  '/resources': [{ name: 'Parent Resources', href: '/resources' }],
  '/programs/toddler': [{ name: 'Programs', href: '/#programs' }, { name: 'Toddler Program', href: '/programs/toddler' }],
  '/programs/preschool': [{ name: 'Programs', href: '/#programs' }, { name: 'Preschool Program', href: '/programs/preschool' }],
  '/programs/prekindergarten': [{ name: 'Programs', href: '/#programs' }, { name: 'Pre-Kindergarten Program', href: '/programs/prekindergarten' }],
  '/community/todays-story': [{ name: 'Community', href: '/community/journal' }, { name: "Today's Story", href: '/community/todays-story' }],
  '/community/journal': [{ name: 'Community', href: '/community/journal' }, { name: 'Journal', href: '/community/journal' }],
  '/community/montessori': [{ name: 'Community', href: '/community/journal' }, { name: 'Montessori Education', href: '/community/montessori' }],
  '/community/ece': [{ name: 'Community', href: '/community/journal' }, { name: 'BC Early Learning', href: '/community/ece' }],
  '/privacy': [{ name: 'Privacy Policy', href: '/privacy' }],
  '/terms': [{ name: 'Terms of Service', href: '/terms' }],
  '/sitemap': [{ name: 'Sitemap', href: '/sitemap' }],
  '/welcome': [{ name: 'Schedule a Tour', href: '/welcome' }],
};

/**
 * Visible breadcrumbs + BreadcrumbList JSON-LD for sub-pages.
 * Hidden on the homepage (single-page anchors).
 */
export function PageBreadcrumbs() {
  const pathname = usePathname();
  const trail = PAGE_TRAILS[pathname];
  if (!trail || pathname === '/') return null;

  const crumbs: Crumb[] = [{ name: 'Home', href: '/' }, ...trail];
  const schemaItems = crumbs.map((crumb, index) => ({
    name: crumb.name,
    url: index === 0 ? businessProfile.url : `${businessProfile.url}${crumb.href ?? pathname}`,
  }));

  return (
    <>
      <BreadcrumbListSchema items={schemaItems} />
      <nav
        aria-label="Breadcrumb"
        className="mx-auto w-full max-w-7xl px-4 pt-5 sm:px-6 lg:px-8"
      >
        <ol className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
          {crumbs.map((crumb, index) => (
            <li key={`${crumb.name}-${index}`} className="flex min-h-[28px] items-center gap-1">
              {index > 0 && (
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" aria-hidden />
              )}
              {crumb.href && index < crumbs.length - 1 ? (
                <Link href={crumb.href} className="font-medium transition-colors hover:text-primary">
                  {crumb.name}
                </Link>
              ) : (
                <span aria-current="page" className="font-semibold text-foreground">
                  {crumb.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
