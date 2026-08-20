import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/** Paths that redirect to single-page anchors (SPA sections). */
const SPA_REDIRECTS: Record<string, string> = {
  '/about': '/#about',
  '/programs': '/#programs',
  '/contact': '/#contact',
  '/gallery': '/#gallery',
  '/enrollment': '/#enrollment',
  '/resources/faq': '/#faq',
};

/**
 * Redirects old multi-route paths to single-page anchor links.
 * Keeps URLs like /programs/toddler -> /#programs (program slug pages become programs section).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Exact match (includes /resources/faq -> /#faq)
  const redirectTarget = SPA_REDIRECTS[pathname];
  if (redirectTarget) {
    return NextResponse.redirect(new URL(redirectTarget, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/about', '/programs', '/contact', '/gallery', '/enrollment', '/resources/faq'],
};
