import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { GalleryPageClient } from "@/app/gallery/page-client";

export const metadata: Metadata = buildPageMetadata({
  title: "Daycare Gallery in Coquitlam",
  description:
    "Browse photos and videos from Friendship Corner Daycare in Coquitlam, BC. See Montessori classrooms, activities, and spaces.",
  path: "/gallery"
});

/**
 * Server wrapper for gallery page metadata.
 */
export default function GalleryPage() {
  return <GalleryPageClient />;
}
