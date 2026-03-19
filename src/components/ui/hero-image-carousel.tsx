'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

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

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  return (
    <div className={cn('absolute inset-0 overflow-hidden -z-10', className)}>
      {images.map((src, i) => (
        <div
          key={src}
          className={cn(
            'absolute inset-0 min-w-full min-h-full bg-no-repeat bg-center transition-opacity duration-1000 bg-cover',
            i === index ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            backgroundImage: `url(${src})`,
          }}
          aria-hidden={i !== index}
        />
      ))}
      {/* Gradient overlay: on mobile, blend with image (warm tones); on desktop, darken for text contrast */}
      <div
        className="absolute inset-0 md:bg-linear-to-b md:from-black/50 md:via-black/40 md:to-black/60"
        aria-hidden="true"
      />
      {/* Mobile: gradient that blends with daycare imagery (warm greens, ambers) to hide any letterboxing */}
      <div
        className="absolute inset-0 bg-linear-to-b from-slate-900/70 via-amber-950/30 to-slate-900/80 md:hidden"
        aria-hidden="true"
      />
    </div>
  );
}
