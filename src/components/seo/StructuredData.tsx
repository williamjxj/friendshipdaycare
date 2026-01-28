import { businessProfile } from "@/lib/business-profile";

/**
 * Structured Data (Schema.org) Components for SEO
 * These components add JSON-LD structured data to pages for better search engine understanding
 */

interface LocalBusinessSchemaProps {
  name: string;
  description: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  telephone: string;
  email: string;
  url: string;
  image?: string;
  priceRange?: string;
  openingHours?: string[];
  serviceArea?: string;
  sameAs?: string[];
}

export function LocalBusinessSchema({
  name,
  description,
  address,
  telephone,
  email,
  url,
  image,
  priceRange = "$$",
  openingHours = [
    "Mo-Fr 07:30-17:30"
  ],
  serviceArea,
  sameAs = [],
}: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ChildCare",
    "name": name,
    "description": description,
    "url": url,
    "telephone": telephone,
    "email": email,
    "image": image,
    "priceRange": priceRange,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address.streetAddress,
      "addressLocality": address.addressLocality,
      "addressRegion": address.addressRegion,
      "postalCode": address.postalCode,
      "addressCountry": address.addressCountry
    },
    ...(serviceArea
      ? {
          areaServed: {
            "@type": "Place",
            name: serviceArea,
          },
        }
      : {}),
    "openingHoursSpecification": openingHours.map(hours => {
      // Parse format like "Mo-Fr 07:00-18:00"
      const [dayRange, timeRange] = hours.split(" ");
      const [opens, closes] = timeRange.split("-");
      const days = dayRange.split("-");
      
      // Convert day abbreviations to full day names
      const dayMap: Record<string, string> = {
        "Mo": "Monday",
        "Tu": "Tuesday", 
        "We": "Wednesday",
        "Th": "Thursday",
        "Fr": "Friday",
        "Sa": "Saturday",
        "Su": "Sunday"
      };
      
      // Handle day ranges (e.g., "Mo-Fr" becomes ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"])
      const dayList: string[] = [];
      if (days.length === 2) {
        const startDay = dayMap[days[0]] || days[0];
        const endDay = dayMap[days[1]] || days[1];
        const allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const startIndex = allDays.indexOf(startDay);
        const endIndex = allDays.indexOf(endDay);
        if (startIndex !== -1 && endIndex !== -1) {
          for (let i = startIndex; i <= endIndex; i++) {
            dayList.push(allDays[i]);
          }
        }
      } else {
        dayList.push(dayMap[days[0]] || days[0]);
      }
      
      return {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": dayList,
        "opens": opens,
        "closes": closes
      };
    }),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface WebSiteSchemaProps {
  name: string;
  url: string;
  description: string;
  searchUrlTemplate?: string;
}

/**
 * WebSite schema (homepage/global).
 * Can enable sitelinks search box eligibility when a site search exists.
 */
export function WebSiteSchema({
  name,
  url,
  description,
  searchUrlTemplate,
}: WebSiteSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
    ...(searchUrlTemplate
      ? {
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: searchUrlTemplate,
            },
            "query-input": "required name=search_term_string",
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface OrganizationSchemaProps {
  name: string;
  url: string;
  logo: string;
  description: string;
  foundingDate?: string;
  telephone: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
}

export function OrganizationSchema({
  name,
  url,
  logo,
  description,
  foundingDate = "2008-01-01",
  telephone,
  email,
  address
}: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": name,
    "url": url,
    "logo": logo,
    "description": description,
    "foundingDate": foundingDate,
    "telephone": telephone,
    "email": email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address.streetAddress,
      "addressLocality": address.addressLocality,
      "addressRegion": address.addressRegion,
      "postalCode": address.postalCode,
      "addressCountry": address.addressCountry
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleSchemaProps {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
  publisher: {
    name: string;
    logo: string;
  };
}

export function ArticleSchema({
  headline,
  description,
  author,
  datePublished,
  dateModified,
  image,
  url,
  publisher
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "description": description,
    "author": {
      "@type": "Person",
      "name": author
    },
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "image": image,
    "url": url,
    "publisher": {
      "@type": "Organization",
      "name": publisher.name,
      "logo": {
        "@type": "ImageObject",
        "url": publisher.logo
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ReviewSchemaProps {
  itemReviewed: string;
  author: string;
  reviewRating: number;
  reviewBody: string;
  datePublished: string;
}

export function ReviewSchema({
  itemReviewed,
  author,
  reviewRating,
  reviewBody,
  datePublished
}: ReviewSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "ChildCare",
      "name": itemReviewed
    },
    "author": {
      "@type": "Person",
      "name": author
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": reviewRating,
      "bestRating": "5"
    },
    "reviewBody": reviewBody,
    "datePublished": datePublished
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface AggregateRatingSchemaProps {
  itemName: string;
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}

export function AggregateRatingSchema({
  itemName,
  ratingValue,
  reviewCount,
  bestRating = 5,
  worstRating = 1
}: AggregateRatingSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ChildCare",
    "name": itemName,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": ratingValue,
      "reviewCount": reviewCount,
      "bestRating": bestRating,
      "worstRating": worstRating
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQSchemaProps {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

export function FAQSchema({ questions }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface CourseSchemaProps {
  name: string;
  description: string;
  provider: string;
  url: string;
  image?: string;
  ageRange?: string;
  educationalLevel?: string;
}

export function CourseSchema({
  name,
  description,
  provider,
  url,
  image,
  ageRange = "30 months - 5 years",
  educationalLevel = "Preschool"
}: CourseSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": provider
    },
    "url": url,
    "image": image,
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student",
      "audienceType": ageRange
    },
    "educationalLevel": educationalLevel
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Default organization data for reuse
export const defaultOrganizationData = {
  name: businessProfile.name,
  url: businessProfile.url,
  telephone: businessProfile.telephone,
  email: businessProfile.email,
  address: businessProfile.address
};
