import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { HomePageClient } from "@/app/page-client";

export const metadata: Metadata = buildPageMetadata({
  title: "Montessori Daycare in Coquitlam, BC",
  description:
    "Authentic Montessori daycare in Coquitlam, BC. Licensed since 2008. Toddler, preschool & pre-K programs for Tri-Cities families. Experienced ECE educators. Book a free tour at Friendship Corner Daycare.",
  path: "/"
});

/**
 * Server wrapper for homepage metadata.
 */
export default function HomePage() {
  return <HomePageClient />;
}
