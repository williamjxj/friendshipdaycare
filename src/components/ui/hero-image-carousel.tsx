'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface HeroImageCarouselProps {
  /** Image URLs to cycle through (e.g. from getImageUrl). */
  images: string[];
  /** Interval in ms between slides. Default 5000. */
  intervalMs?: number;
  className?: string;
  /** Called when the visible slide index changes (for syncing hero text with carousel). */
  onIndexChange?: (index: number) => void;
}

/**
 * Hero background that cycles through images with a crossfade.
 * Use for landing hero when a static or video background is replaced by a carousel.
 */
export function HeroImageCarousel({
  images,
  intervalMs = 5000,
  className,
  onIndexChange,
}: HeroImageCarouselProps) {
  const [index, setIndex] = useState(0);


  useEffect(() => {
    onIndexChange?.(index);
  }, [index, onIndexChange]);

  // Auto-advance
  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);


  return (
    <div className={cn('absolute inset-0 overflow-hidden -z-10', className)}>
      <AnimatePresence initial={false}>
        {images.map((src, i) =>
          i === index ? (
            <motion.div
              key={src}
              className="absolute inset-0 min-w-full min-h-full bg-no-repeat bg-center bg-cover"
              style={{
                backgroundImage: `url(${src})`,
              }}
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ scale: { duration: 3, ease: 'easeInOut' }, opacity: { duration: 1 } }}
              aria-hidden={false}
            />
          ) : null
        )}
      </AnimatePresence>
      {/* Gradient overlay: on mobile, blend with image (warm tones); on desktop, darken for text contrast */}
      <div
        className="absolute inset-0 md:bg-linear-to-b md:from-black/20 md:via-black/10 md:to-black/30"
        aria-hidden="true"
      />
      {/* Mobile: gradient that blends with daycare imagery (warm greens, ambers) to hide any letterboxing */}
      <div
        className="absolute inset-0 bg-linear-to-b from-slate-900/30 via-amber-950/10 to-slate-900/40 md:hidden"
        aria-hidden="true"
      />

      {/* Manual Controls */}
      {images.length > 1 && (
        <>
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-black/30 hover:bg-black/60 transition-colors border-2 border-white/60"
            aria-label="Previous background image"
            onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
            style={{ color: 'white' }}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-black/30 hover:bg-black/60 transition-colors border-2 border-white/60"
            aria-label="Next background image"
            onClick={() => setIndex((i) => (i + 1) % images.length)}
            style={{ color: 'white' }}
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}
    </div>
  );
}
