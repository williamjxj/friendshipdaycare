'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import { Heart, Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { testimonialsByLocale } from '@/data/testimonials';

const TRUNCATE_LENGTH = 120;

/**
 * Single testimonial card for marquee display.
 * Uses translated quote when available via testimonials.quotes.{id} in messages.
 */
function TestimonialCard({
  id,
  quote,
  authorName,
  authorRole,
  datePublished,
  authorImageUrl,
  rating,
  isExpanded,
  onToggleExpand,
  getTranslatedQuote,
}: {
  id: string;
  quote: string;
  authorName: string;
  authorRole?: string;
  datePublished?: string;
  authorImageUrl?: string | null;
  rating: 4.5 | 5;
  isExpanded: boolean;
  onToggleExpand: (id: string) => void;
  getTranslatedQuote: (id: string) => string;
}) {
  const displayQuoteSource = getTranslatedQuote(id) || quote;
  const showMore = displayQuoteSource.length > TRUNCATE_LENGTH;
  const displayQuote = isExpanded || !showMore
    ? displayQuoteSource
    : `${displayQuoteSource.slice(0, TRUNCATE_LENGTH).trim()}…`;

  return (
    <blockquote className="shrink-0 w-[min(380px,85vw)] bg-white/50 dark:bg-card/80 backdrop-blur-sm border-0 rounded-xl p-6 md:p-8 shadow hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between gap-4 mb-3">
        <Image
          src={rating === 4.5 ? '/collects/stars-4.5.png' : '/collects/stars-5.png'}
          alt={`${rating} star rating`}
          width={100}
          height={20}
          className="h-4 w-auto object-contain"
          unoptimized
        />
        <Heart className="w-4 h-4 text-rose-400 fill-rose-400/60 shrink-0" aria-hidden />
      </div>
      <Quote className="w-8 h-8 text-primary/30 mb-2" aria-hidden />
      <div className="mb-4">
        <p className="text-base md:text-lg text-foreground leading-relaxed">
          &ldquo;{displayQuote}&rdquo;
        </p>
        {showMore && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand(id);
            }}
            className="mt-2 text-sm font-medium text-primary hover:underline"
          >
            {isExpanded ? 'Less' : 'More…'}
          </button>
        )}
      </div>
      <footer className="flex items-center gap-3 pt-3 border-t border-border/50">
        {authorImageUrl ? (
          <img
            src={authorImageUrl}
            alt=""
            className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-primary/10"
            width={40}
            height={40}
          />
        ) : (
          <div
            className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center bg-primary/20 text-primary font-semibold text-sm ring-2 ring-primary/10"
            aria-hidden
          >
            {(authorName[0] ?? '?').toUpperCase()}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <cite className="not-italic font-semibold text-foreground text-sm flex items-center gap-1.5">
            {authorName}
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400/80 shrink-0" aria-hidden />
          </cite>
          {(authorRole || datePublished) && (
            <span className="text-muted-foreground text-xs block mt-0.5">
              {[authorRole, datePublished].filter(Boolean).join(' · ')}
            </span>
          )}
        </div>
      </footer>
    </blockquote>
  );
}

interface TestimonialItem {
  id: string;
  quote: string;
  authorName: string;
  authorRole?: string;
  datePublished?: string;
  authorImageUrl?: string | null;
  rating: 4.5 | 5;
}

/**
 * Single marquee row - infinite scroll in one direction. Pauses on hover.
 * Uses CSS animation for reliable infinite scroll (framer-motion controls had issues).
 */
function MarqueeRow({
  testimonials,
  direction,
  expandedIds,
  onToggleExpand,
  getTranslatedQuote,
}: {
  testimonials: TestimonialItem[];
  direction: 'ltr' | 'rtl';
  expandedIds: Set<string>;
  onToggleExpand: (id: string) => void;
  getTranslatedQuote: (id: string) => string;
}) {
  const duplicated = [...testimonials, ...testimonials];
  const animationClass = direction === 'ltr' ? 'marquee-ltr' : 'marquee-rtl';

  return (
    <div className="marquee-row overflow-hidden">
      <div
        className={`marquee-inner flex gap-6 py-4 ${animationClass}`}
        style={{ width: 'max-content' }}
      >
        {duplicated.map((t, i) => (
          <TestimonialCard
            key={`${t.id}-${direction}-${i}`}
            {...t}
            isExpanded={expandedIds.has(t.id)}
            onToggleExpand={onToggleExpand}
            getTranslatedQuote={getTranslatedQuote}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Two-row testimonials marquee for homepage - social proof from parents.
 * Row 1: left-to-right scroll. Row 2: right-to-left scroll.
 * Uses framer-motion for smooth infinite animation.
 */
export function TestimonialsMarquee() {
  const { language, t } = useLanguage();
  const testimonials = testimonialsByLocale[language] ?? testimonialsByLocale.en ?? [];
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const getTranslatedQuote = useCallback((id: string) => {
    const translated = t(`testimonials.quotes.${id}`);
    return translated && !translated.startsWith('testimonials.quotes.') ? translated : '';
  }, [t]);

  const toggleExpand = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  if (testimonials.length === 0) return null;

  const row1 = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const row2 = testimonials.slice(Math.ceil(testimonials.length / 2));

  return (
    <section id="testimonials" className="py-24 bg-muted/30" aria-label="Parent testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 w-full">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-4 whitespace-nowrap">
            What Parents Say
          </h2>
          <p className="text-lg text-muted-foreground text-center w-full max-w-none">
            Families in Coquitlam and the Tri-Cities trust Friendship Corner Daycare
          </p>
        </header>

        <div className="space-y-2">
          <MarqueeRow
            testimonials={row1.length > 0 ? row1 : testimonials}
            direction="ltr"
            expandedIds={expandedIds}
            onToggleExpand={toggleExpand}
            getTranslatedQuote={getTranslatedQuote}
          />
          <MarqueeRow
            testimonials={row2.length > 0 ? row2 : testimonials}
            direction="rtl"
            expandedIds={expandedIds}
            onToggleExpand={toggleExpand}
            getTranslatedQuote={getTranslatedQuote}
          />
        </div>
      </div>
    </section>
  );
}
