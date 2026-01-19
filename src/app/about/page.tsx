import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { AboutPageClient } from "@/app/about/page-client";

export const metadata: Metadata = buildPageMetadata({
  title: "About Friendship Corner Daycare in Coquitlam",
  description:
    "Learn about Friendship Corner Daycare, a licensed Montessori daycare in Coquitlam, BC serving Tri-Cities families since 2008.",
  path: "/about"
});

/**
 * Server wrapper for about page metadata.
 */
export default function AboutPage() {
  return <AboutPageClient />;
}
