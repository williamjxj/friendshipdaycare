/**
 * Curated testimonials for TestimonialsCarousel.
 * Loaded from local google-reviews.json (source of truth).
 * Uses authorName + comment (full text). Excludes negative reviews.
 */

import googleReviews from './google-reviews.json';

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorRole?: string;
  datePublished?: string;
  locale: string;
  authorImageUrl?: string | null;
  /** Star rating: 4.5 or 5. Used for display; mix improves credibility. */
  rating: 4.5 | 5;
}

interface GoogleReviewRaw {
  authorName: string;
  comment?: string;
  quote?: string;
  datePublished?: string;
  authorImageUrl?: string | null;
}

/** Exclude negative/irrelevant reviewers */
const EXCLUDED_AUTHORS = new Set(['Michael Magdy']);

/** Reviews with 4.5 stars for a more believable mix (not all 5s) */
const RATING_4_5_AUTHORS = new Set(['Rachel S', 'Heidy Barros', 'Isabel Liu', '鲁南宋']);

/**
 * Transform local JSON to Testimonial[]. Prefers comment (full) over quote.
 */
const raw = googleReviews as { reviews: GoogleReviewRaw[] };
export const testimonialsAll: Testimonial[] = raw.reviews
  .filter((r) => !EXCLUDED_AUTHORS.has(r.authorName))
  .map((r, i) => {
    const text = r.comment ?? r.quote ?? '';
    return {
      id: `t${i + 1}`,
      quote: text,
      authorName: r.authorName,
      authorRole: 'Google Review',
      datePublished: r.datePublished ?? '',
      locale: /[\u4e00-\u9fff]/.test(text) ? 'zh' : 'en',
      authorImageUrl: r.authorImageUrl ?? undefined,
      rating: RATING_4_5_AUTHORS.has(r.authorName) ? 4.5 : 5,
    };
  });

/** Locale maps to same testimonials - all in original language, no translation */
export const testimonialsByLocale: Record<string, Testimonial[]> = {
  en: testimonialsAll,
  zh: testimonialsAll,
  ko: testimonialsAll,
  es: testimonialsAll,
  fr: testimonialsAll,
};

/** Aggregate rating for schema.org; only when we have reviews. */
export function getAggregateRating(): { ratingValue: number; reviewCount: number } | null {
  const count = testimonialsAll.length;
  if (count < 1) return null;
  const sum = testimonialsAll.reduce((acc, t) => acc + t.rating, 0);
  const ratingValue = Math.round((sum / count) * 10) / 10; // 1 decimal
  return { ratingValue, reviewCount: count };
}
