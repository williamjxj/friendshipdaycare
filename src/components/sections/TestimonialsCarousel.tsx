'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Heart, Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { testimonialsByLocale } from '@/data/testimonials';
import { cn } from '@/lib/utils';

const TRUNCATE_LENGTH = 180;

/**
 * Testimonials carousel for homepage - social proof from parents.
 */
export function TestimonialsCarousel() {
  const { language } = useLanguage();
  const testimonials = testimonialsByLocale[language] ?? testimonialsByLocale.en ?? [];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  const toggleExpand = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 bg-muted/30" aria-label="Parent testimonials">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 w-full">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-4 whitespace-nowrap">
            What Parents Say
          </h2>
          <p className="text-lg text-muted-foreground text-center w-full max-w-none">
            Families in Coquitlam and the Tri-Cities trust Friendship Corner Daycare
          </p>
        </header>

        <div className="relative">
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-10 rounded-full bg-background border border-border shadow-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 z-10 rounded-full bg-background border border-border shadow-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="flex-[0_0_100%] min-w-0 pl-4"
                >
                  <blockquote className="bg-white/50 dark:bg-card/80 backdrop-blur-sm border-0 rounded-xl p-8 md:p-10 shadow hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <Image
                        src={t.rating === 4.5 ? '/collects/stars-4.5.png' : '/collects/stars-5.png'}
                        alt={`${t.rating} star rating`}
                        width={120}
                        height={24}
                        className="h-5 w-auto object-contain"
                        unoptimized
                      />
                      <Heart className="w-5 h-5 text-rose-400 fill-rose-400/60 shrink-0" aria-hidden />
                    </div>
                    <Quote className="w-10 h-10 text-primary/30 mb-2" aria-hidden />
                    <div className="mb-6">
                      <p className="text-lg md:text-xl text-foreground leading-relaxed">
                        &ldquo;
                        {expandedIds.has(t.id)
                          ? t.quote
                          : t.quote.length > TRUNCATE_LENGTH
                            ? `${t.quote.slice(0, TRUNCATE_LENGTH).trim()}…`
                            : t.quote}
                        &rdquo;
                      </p>
                      {t.quote.length > TRUNCATE_LENGTH && (
                        <button
                          type="button"
                          onClick={() => toggleExpand(t.id)}
                          className="mt-2 text-sm font-medium text-primary hover:underline"
                        >
                          {expandedIds.has(t.id) ? 'Less' : 'More'}
                        </button>
                      )}
                    </div>
                    <footer className="flex items-center gap-3 mt-4 pt-4 border-t border-border/50">
                      {t.authorImageUrl ? (
                        <img
                          src={t.authorImageUrl}
                          alt=""
                          className="w-12 h-12 rounded-full object-cover shrink-0 ring-2 ring-primary/10"
                          width={48}
                          height={48}
                        />
                      ) : (
                        <div
                          className="w-12 h-12 rounded-full shrink-0 flex items-center justify-center bg-primary/20 text-primary font-semibold ring-2 ring-primary/10"
                          aria-hidden
                        >
                          {(t.authorName[0] ?? '?').toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <cite className="not-italic font-semibold text-foreground flex items-center gap-1.5">
                          {t.authorName}
                          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/80 shrink-0" aria-hidden />
                        </cite>
                        {(t.authorRole || t.datePublished) && (
                          <span className="text-muted-foreground text-sm block mt-0.5">
                            {[t.authorRole, t.datePublished].filter(Boolean).join(' · ')}
                          </span>
                        )}
                      </div>
                    </footer>
                  </blockquote>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={cn(
                  'w-2.5 h-2.5 rounded-full transition-colors',
                  i === selectedIndex ? 'bg-primary' : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
                )}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
