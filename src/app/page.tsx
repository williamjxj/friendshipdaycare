import type { Metadata } from "next";
import { CourseSchema, FAQSchema } from "@/components/seo/StructuredData";
import { faqItems } from "@/data/faq";
import { programs } from "@/data/programs";
import { businessProfile } from "@/lib/business-profile";
import { buildPageMetadata } from "@/lib/seo";
import { HomePageClient } from "@/app/page-client";

export const metadata: Metadata = buildPageMetadata({
  title: "Coquitlam Montessori Daycare | Friendship Corner Daycare",
  description:
    "Non-profit Montessori daycare in Coquitlam, BC for ages 30 months to 5. Bilingual English & Mandarin care since 2008. Book a tour.",
  path: "/"
});

/**
 * Server wrapper for homepage metadata.
 */
export default function HomePage() {
  return (
    <>
      {/* Server-rendered structured data: visible to crawlers and AI engines
          without executing client JavaScript. */}
      <FAQSchema questions={faqItems} />
      {programs.map((program) => (
        <CourseSchema
          key={program.slug}
          name={`${program.title} at Friendship Corner Daycare`}
          description={program.metaDescription}
          provider={businessProfile.name}
          url={`${businessProfile.url}/programs/${program.slug}`}
          image={`${businessProfile.url}/og/home.png`}
          ageRange={program.ageRange}
          educationalLevel="Preschool"
        />
      ))}
      <HomePageClient />
    </>
  );
}
