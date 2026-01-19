import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { HomePageClient } from "@/app/page-client";

export const metadata: Metadata = buildPageMetadata({
  title: "Montessori Daycare in Coquitlam, BC",
  description:
    "Friendship Corner Daycare is a licensed Montessori daycare in Coquitlam, BC serving Tri-Cities families. Schedule a tour today.",
  path: "/"
});

/**
 * Server wrapper for homepage metadata.
 */
export default function HomePage() {
  return <HomePageClient />;
}
