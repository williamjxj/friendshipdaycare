'use client';

import { useRef, ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { HeroSideBackground } from './hero-side-background';
import { HeroCurveDivider } from './hero-curve-divider';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundSvg?: string;
  className?: string;
  children?: ReactNode;
  enableScrollTrigger?: boolean;
  staggerDelay?: number;
  fullScreen?: boolean; // true for landing page, false for other pages
  backgroundPosition?: 'center' | 'top' | 'bottom' | 'left' | 'right' | string; // Image positioning for cropping
}

export function PageHero({
  title,
  subtitle,
  backgroundImage,
  backgroundSvg,
  className,
  children,
  enableScrollTrigger = true,
  staggerDelay = 0.2,
  fullScreen = false,
  backgroundPosition = 'center',
  hideSubtitle = false,
  hideTitle = false,
  showCurve = true,
}: PageHeroProps & { hideSubtitle?: boolean; hideTitle?: boolean; showCurve?: boolean }) {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!contentRef.current) return;

    // Animate title with GSAP
    if (titleRef.current && !hideTitle) {
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2,
      });
    }

    // Animate subtitle separately with a more elegant word-by-word effect
    if (subtitleRef.current && subtitle && !hideSubtitle) {
      // Wait a bit to ensure DOM is ready and text is visible
      setTimeout(() => {
        if (subtitleRef.current) {
          // Store original text
          const originalText = subtitleRef.current.textContent || subtitleRef.current.innerText || subtitle;
          if (originalText.trim()) {
            // Split subtitle into words for word-by-word animation - keep visible initially
            const words = originalText.split(' ').filter(w => w.trim());

            // Clear and rebuild with word spans (preserve spaces)
            subtitleRef.current.innerHTML = words
              .map((word, index) => `<span class="hero-subtitle-word inline-block" style="opacity: 1; transform: translateY(0);">${word}${index < words.length - 1 ? ' ' : ''}</span>`)
              .join('');

            const wordElements = subtitleRef.current.querySelectorAll('.hero-subtitle-word');
            if (wordElements.length > 0) {
              // Reset to initial state for animation
              gsap.set(wordElements, {
                y: 30,
                opacity: 0,
                immediateRender: false,
              });

              // Animate to visible
              gsap.to(wordElements, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.05,
                ease: 'power2.out',
                delay: 0.6,
              });
            }
          }
        }
      }, 100);
    }

    // Animate children if present
    if (children) {
      const childElements = contentRef.current.querySelectorAll('.hero-children > *');
      if (childElements.length > 0) {
        gsap.from(childElements, {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 1.0,
        });
      }
    }

    // ScrollTrigger for background parallax (if enabled)
    if (enableScrollTrigger && heroRef.current) {
      const bgElement = heroRef.current.querySelector('.hero-bg');
      if (bgElement) {
        gsap.to(bgElement, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
          scale: 1.1,
          opacity: 0.8,
        });
      }
    }
  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      className={cn(
        'relative flex items-center justify-center overflow-hidden',
        fullScreen
          ? 'h-screen min-h-[600px]'
          : 'aspect-[21/8] min-h-[300px] py-10',
        className
      )}
      aria-label={`${title}${subtitle ? `: ${subtitle}` : ''}`}
    >
      {/* Background Layer */}
      <div className="absolute inset-0 hero-bg">
        {/* Decorative side backgrounds for left/right blank spaces */}
        {(backgroundSvg || backgroundImage) && (
          <HeroSideBackground variant="organic" />
        )}
        
        {backgroundSvg ? (
          <div className="absolute inset-0 z-10">
            <Image
              src={backgroundSvg}
              alt=""
              fill
              sizes="100vw"
              className={cn(
                'object-contain',
                // Position the image within the container
                backgroundPosition === 'center' || !backgroundPosition
                  ? 'object-center' 
                  : backgroundPosition === 'top'
                  ? 'object-top'
                  : backgroundPosition === 'bottom'
                  ? 'object-bottom'
                  : backgroundPosition === 'left'
                  ? 'object-left'
                  : backgroundPosition === 'right'
                  ? 'object-right'
                  : typeof backgroundPosition === 'string'
                  ? `object-[${backgroundPosition}]`
                  : 'object-center'
              )}
              priority
              aria-hidden="true"
            />
          </div>
        ) : backgroundImage ? (
          <div className="absolute inset-0 z-10">
            <Image
              src={backgroundImage}
              alt=""
              fill
              sizes="100vw"
              className={cn(
                'object-contain',
                backgroundPosition === 'center' || !backgroundPosition
                  ? 'object-center' 
                  : backgroundPosition === 'top'
                  ? 'object-top'
                  : backgroundPosition === 'bottom'
                  ? 'object-bottom'
                  : backgroundPosition === 'left'
                  ? 'object-left'
                  : backgroundPosition === 'right'
                  ? 'object-right'
                  : typeof backgroundPosition === 'string'
                  ? `object-[${backgroundPosition}]`
                  : 'object-center'
              )}
              priority
              aria-hidden="true"
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10" />
        )}

        {/* Overlay for text readability - only show if text is not hidden */}
        {(!hideTitle || !hideSubtitle) && (
          <div className="absolute inset-0 bg-black/20 z-20" />
        )}
      </div>

      {/* Content Layer */}
      <div
        ref={contentRef}
        className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center hero-text"
      >
        <div className="space-y-6">
          {!hideTitle && (
            <h1
              ref={titleRef}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight drop-shadow-lg"
            >
              {title}
            </h1>
          )}
          {subtitle && !hideSubtitle && (
            <p
              ref={subtitleRef}
              className="text-lg md:text-xl lg:text-2xl font-light text-white/95 w-full max-w-4xl mx-auto leading-relaxed drop-shadow-lg tracking-wide hero-subtitle"
              style={{
                fontFamily: 'var(--font-sans)',
                letterSpacing: '0.02em',
                opacity: 1, // Ensure visible by default
              }}
            >
              {subtitle}
            </p>
          )}
          {/* Hidden title/subtitle for SEO when visually hidden */}
          {(hideTitle || hideSubtitle) && (
            <div className="sr-only">
              {hideTitle && <h1>{title}</h1>}
              {hideSubtitle && subtitle && <p>{subtitle}</p>}
            </div>
          )}
          {children && (
            <div className="pt-4 hero-children">
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Curved bottom divider - only for non-fullScreen heroes */}
      {!fullScreen && (
        <HeroCurveDivider color="fill-background" height="lg" />
      )}
    </section>
  );
}

