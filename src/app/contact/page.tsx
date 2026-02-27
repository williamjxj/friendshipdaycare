import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { ContactPageClient } from "@/app/contact/page-client";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Friendship Corner Daycare",
  description:
    "Contact Friendship Corner Daycare in Coquitlam, BC. Schedule a tour, ask questions, or begin enrollment. Tri-Cities families: call 604.945.8504 or send a message.",
  path: "/contact"
});

/**
 * Server wrapper for contact page metadata.
 */
export default function ContactPage() {
  return <ContactPageClient />;
}
