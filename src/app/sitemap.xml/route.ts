import { siteMapEntries } from "@/lib/site-map-entries";
import { SEO_BASE_URL } from "@/lib/seo";
import { getImageUrl } from "@/lib/image-utils";

const GALLERY_IMAGES: Array<{ path: string; title: string }> = [
  { path: "/images/circle-time-board-2.jpg", title: "Circle time activities at Friendship Daycare Coquitlam" },
  { path: "/images/circle-time-area.jpg", title: "Circle time learning space at Friendship Daycare Coquitlam" },
  { path: "/images/practical-life-shelf-1.jpg", title: "Practical life Montessori materials at Friendship Daycare Coquitlam" },
  { path: "/images/practical-life-shelf-2.jpg", title: "Practical life activities at Friendship Daycare Coquitlam" },
  { path: "/images/sensorial-shelf.jpg", title: "Sensorial learning materials at Friendship Daycare Coquitlam" },
  { path: "/images/language-shelf.jpg", title: "Language materials at Friendship Daycare Coquitlam" },
  { path: "/images/math-shelf.jpg", title: "Mathematics learning materials at Friendship Daycare Coquitlam" },
  { path: "/images/culture-shelf.jpg", title: "Cultural studies materials at Friendship Daycare Coquitlam" },
  { path: "/images/art-themed-board-2.jpg", title: "Children's creative art display at Friendship Daycare Coquitlam" },
  { path: "/images/toys.jpg", title: "Toys and pretend play area at Friendship Daycare Coquitlam" },
  { path: "/images/playground.jpg", title: "Playground and outdoor play at Friendship Daycare Coquitlam" },
  { path: "/images/slidetop-bg.jpg", title: "Montessori classroom environment at Friendship Daycare Coquitlam" },
];

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function imageUrl(localPath: string): string {
  try {
    return getImageUrl(localPath);
  } catch {
    return `${SEO_BASE_URL}${localPath}`;
  }
}

export function GET() {
  const urlEntries = siteMapEntries
    .map(({ path, lastModified, changeFrequency, priority }) => {
      const url = path === "/" ? SEO_BASE_URL : `${SEO_BASE_URL}${path}`;
      const images =
        path === "/" || path === "/gallery-new"
          ? GALLERY_IMAGES.map(
              (img) =>
                `    <image:image>\n      <image:loc>${escapeXml(imageUrl(img.path))}</image:loc>\n      <image:title>${escapeXml(img.title)}</image:title>\n      <image:caption>${escapeXml(img.title)} — Friendship Corner Daycare, Coquitlam BC</image:caption>\n    </image:image>`
            ).join("\n")
          : "";
      return `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
${images}  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
