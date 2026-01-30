'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export interface HeroImageCarouselProps {
  /** Image URLs to cycle through (e.g. from getImageUrl). */
  images: string[];
  /** Interval in ms between slides. Default 5000. */
  intervalMs?: number;
  overlayColor?: string;
  className?: string;
}

/**
 * Hero background that cycles through images with a crossfade.
 * Use for landing hero when a static or video background is replaced by a carousel.
 */
export function HeroImageCarousel({
  images,
  intervalMs = 5000,
  overlayColor = 'bg-black/30',
  className,
}: HeroImageCarouselProps) {
  const [index, setIndex] = useState(0);

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
            'absolute inset-0 bg-cover bg-center transition-opacity duration-1000',
            i === index ? 'opacity-100' : 'opacity-0'
          )}
          style={{ backgroundImage: `url(${src})` }}
          aria-hidden={i !== index}
        />
      ))}
      <div className={cn('absolute inset-0', overlayColor)} />
      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-background/90" />
    </div>
  );
}
