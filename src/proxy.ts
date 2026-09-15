import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAllProgramSlugs } from '@/data/programs';

/**
 * Permanent redirects for URLs that were live before the site was simplified
 * into a single-page layout with a few dedicated sub-pages.
 *
 * These are 308 (permanent) so search engines transfer the old URL's signals
 * to the new destination instead of treating the old URL as broken.
 */
const LEGACY_REDIRECTS: Record<string, string> = {
  // Sections that now live on the homepage
  '/about': '/#about',
  '/programs': '/#programs',
  '/contact': '/#contact',
  '/enrollment': '/#enrollment',
  '/faq': '/#faq',
  '/resources/faq': '/#faq',
  '/testimonials': '/#testimonials',
  // Pages that were renamed or consolidated
  '/gallery': '/gallery-new',
  '/team': '/our-team',
  '/pricing': '/funding',
  '/policies': '/resources',
  '/journal': '/community/journal',
  '/todays-story': '/community/todays-story',
  '/blog': '/community/journal',
};

/** `/programs/<slug>` with an optional trailing slash. */
const PROGRAM_PATH = /^\/programs\/([^/]+)\/?$/;

/**
 * Renders a real 404 for unknown program slugs.
 *
 * The program route calls `notFound()`, but because the root layout reads a
 * locale cookie every route renders dynamically and the response has already
 * streamed a 200 status by the time the not-found UI is reached — a soft 404
 * that Google can index as a duplicate of the homepage. Middleware runs before
 * rendering, so this is the only place where the status code is still ours.
 */
function notFoundResponse(request: NextRequest) {
  const home = new URL('/', request.url).toString();
  const programs = new URL('/#programs', request.url).toString();

  return new NextResponse(
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, follow" />
    <title>Program not found | Friendship Corner Daycare</title>
    <style>
      body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
             background: #F8FAFC; color: #123046; display: flex; min-height: 100vh;
             align-items: center; justify-content: center; padding: 24px; }
      main { max-width: 34rem; }
      h1 { font-size: 1.75rem; margin: 0 0 0.75rem; }
      p { line-height: 1.6; color: #475569; margin: 0 0 1.25rem; }
      a { color: #15803D; font-weight: 600; margin-right: 1rem; }
      ul { padding-left: 1.25rem; line-height: 1.7; }
    </style>
  </head>
  <body>
    <main>
      <h1>We couldn&rsquo;t find that program</h1>
      <p>
        Friendship Corner Daycare offers three licensed Montessori programs in
        Coquitlam for children 30 months to 5 years.
      </p>
      <ul>
        <li><a href="/programs/toddler">Toddler program (30 months &ndash; 3 years)</a></li>
        <li><a href="/programs/preschool">Preschool program (3 &ndash; 4 years)</a></li>
        <li><a href="/programs/prekindergarten">Pre-kindergarten (4 &ndash; 5 years)</a></li>
      </ul>
      <p><a href="${home}">Home</a><a href="${programs}">All programs</a></p>
    </main>
  </body>
</html>`,
    {
      status: 404,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'x-robots-tag': 'noindex, follow',
      },
    }
  );
}

/**
 * Redirects retired URLs and returns a true 404 for unknown program slugs.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Normalise `/team/` to `/team` so trailing slashes still match.
  const normalised = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;

  const redirectTarget = LEGACY_REDIRECTS[normalised];
  if (redirectTarget) {
    return NextResponse.redirect(new URL(redirectTarget, request.url), 308);
  }

  const programMatch = pathname.match(PROGRAM_PATH);
  const knownSlugs: string[] = getAllProgramSlugs();
  if (programMatch && !knownSlugs.includes(programMatch[1])) {
    return notFoundResponse(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/about',
    '/programs',
    '/programs/:slug',
    '/contact',
    '/enrollment',
    '/faq',
    '/resources/faq',
    '/testimonials',
    '/gallery',
    '/team',
    '/pricing',
    '/policies',
    '/journal',
    '/todays-story',
    '/blog',
  ],
};
