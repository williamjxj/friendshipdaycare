import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { ContactPageClient } from "@/app/contact/page-client";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Friendship Corner Daycare",
  description:
    "Contact Friendship Corner Daycare in Coquitlam, BC to schedule a tour, ask questions, or begin enrollment.",
  path: "/contact"
});

/**
 * Server wrapper for contact page metadata.
 */
export default function ContactPage() {
  return <ContactPageClient />;
}
