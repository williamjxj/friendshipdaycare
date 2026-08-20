/**
 * Get a default Open Graph image path for a route.
 *
 * Note: This returns **paths** (not absolute URLs). `buildPageMetadata` will convert to absolute.
 * If you later add dedicated OG images (1200x630), update this mapping.
 */
export function getOgImagePath(pathname: string): string {
  const path = pathname.split("?")[0].split("#")[0];

  const map: Record<string, string> = {
    "/": "/og/home.png",
    "/programs": "/og/home.png",
    "/programs/toddler": "/og/home.png",
    "/programs/preschool": "/og/home.png",
    "/programs/prekindergarten": "/og/home.png",
    "/enrollment": "/og/home.png",
    "/contact": "/og/home.png",
    "/about": "/og/home.png",
    "/gallery": "/og/gallery.png",
    "/gallery-new": "/og/gallery.png",
    "/funding": "/og/funding.png",
    "/resources": "/og/resources.png",
    "/our-team": "/og/our-team.png",
    "/welcome": "/og/welcome.png",
    "/community/todays-story": "/og/todays-story.png",
    "/community/journal": "/og/journal.png",
    "/community/montessori": "/og/montessori.png",
    "/community/ece": "/og/ece.png",
  };

  return map[path] ?? "/og/default.png";
}
