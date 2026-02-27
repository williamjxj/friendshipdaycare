import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { AboutPageClient } from "@/app/about/page-client";

export const metadata: Metadata = buildPageMetadata({
  title: "About Friendship Corner Daycare in Coquitlam",
  description:
    "About Friendship Corner Daycare: licensed Montessori daycare in Coquitlam, BC since 2008. Serving Tri-Cities families. Our mission, team & Montessori approach. Book a tour today.",
  path: "/about"
});

/**
 * Server wrapper for about page metadata.
 */
export default function AboutPage() {
  return <AboutPageClient />;
}
