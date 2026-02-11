import { SEO_BASE_URL } from "@/lib/seo";

/**
 * A single breadcrumb item for UI + JSON-LD.
 */
export interface BreadcrumbItem {
  name: string;
  href: string;
}

/**
 * Build absolute URL for structured data items.
 */
function toAbsoluteUrl(href: string): string {
  if (href.startsWith("http://") || href.startsWith("https://")) return href;
  if (href.startsWith("/")) return `${SEO_BASE_URL}${href}`;
  return `${SEO_BASE_URL}/${href}`;
}

/**
 * Convert UI breadcrumbs to BreadcrumbSchema items (absolute URLs).
 */
export function toBreadcrumbSchemaItems(items: BreadcrumbItem[]): Array<{ name: string; url: string }> {
  return items.map((item) => ({ name: item.name, url: toAbsoluteUrl(item.href) }));
}

/**
 * Get breadcrumbs for core routes.
 * Falls back to a simple path-segment based breadcrumb if route is unknown.
 */
export function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const path = pathname.split("?")[0].split("#")[0];

  const map: Record<string, BreadcrumbItem[]> = {
    "/about": [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
    ],
    "/programs": [
      { name: "Home", href: "/" },
      { name: "Programs", href: "/programs" },
    ],
    "/enrollment": [
      { name: "Home", href: "/" },
      { name: "Enrollment", href: "/enrollment" },
    ],
    "/gallery": [
      { name: "Home", href: "/" },
      { name: "Gallery", href: "/gallery" },
    ],
    "/contact": [
      { name: "Home", href: "/" },
      { name: "Contact", href: "/contact" },
    ],
    "/community/todays-story": [
      { name: "Home", href: "/" },
      { name: "Community", href: "/community/todays-story" },
      { name: "Today's Story", href: "/community/todays-story" },
    ],
    "/community/journal": [
      { name: "Home", href: "/" },
      { name: "Community", href: "/community/journal" },
      { name: "Journal", href: "/community/journal" },
    ],
    "/resources": [
      { name: "Home", href: "/" },
      { name: "Resources", href: "/resources" },
    ],
    "/resources/faq": [
      { name: "Home", href: "/" },
      { name: "Resources", href: "/resources" },
      { name: "FAQ", href: "/resources/faq" },
    ],
  };

  if (map[path]) return map[path];

  const segments = path.split("/").filter(Boolean);
  if (segments.length === 0) return [{ name: "Home", href: "/" }];

  const items: BreadcrumbItem[] = [{ name: "Home", href: "/" }];
  let current = "";
  for (const segment of segments) {
    current += `/${segment}`;
    const name = segment
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    items.push({ name, href: current });
  }
  return items;
}
