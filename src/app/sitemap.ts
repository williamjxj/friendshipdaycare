import { MetadataRoute } from "next";
import { siteMapEntries } from "@/lib/site-map-entries";
import { SEO_BASE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteMapEntries.map(({ path, lastModified, changeFrequency, priority }) => ({
    url: path === "/" ? SEO_BASE_URL : `${SEO_BASE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
