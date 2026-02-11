/**
 * Get a default Open Graph image path for a route.
 *
 * Note: This returns **paths** (not absolute URLs). `buildPageMetadata` will convert to absolute.
 * If you later add dedicated OG images (1200x630), update this mapping.
 */
export function getOgImagePath(pathname: string): string {
  const path = pathname.split("?")[0].split("#")[0];

  const map: Record<string, string> = {
    "/": "/logo.png",
    "/programs": "/logo.png",
    "/enrollment": "/logo.png",
    "/contact": "/logo.png",
    "/about": "/logo.png",
    "/gallery": "/logo.png",
    "/community/todays-story": "/logo.png",
    "/community/journal": "/logo.png",
  };

  return map[path] ?? "/logo.png";
}

