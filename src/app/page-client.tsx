'use client';

import { Suspense, useMemo, useRef } from 'react';
import { RealEnvironmentShowcase } from '@/components/sections/RealEnvironmentShowcase';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import dynamic from 'next/dynamic';
import { HeroImageCarousel } from '@/components/ui/hero-image-carousel';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Leaf, Heart, Shield, GraduationCap } from 'lucide-react';
import { getImageUrl } from '@/lib/image-utils';
import { Card } from '@/components/ui/card';
import { AnimatedPlaceholder } from '@/components/ui/AnimatedPlaceholder';
import { useLanguage } from '@/contexts/LanguageContext';
import { businessProfile } from '@/lib/business-profile';
import { useLocalizedMetadata } from '@/lib/use-localized-metadata';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Dynamically import VideoPlayer
const VideoPlayer = dynamic(() => import('@/components/ui/VideoPlayer').then(mod => ({ default: mod.VideoPlayer })), { ssr: false });

/**
 * Homepage client component with interactive hero and sections.
 */
export function HomePageClient() {
  const mainRef = useRef<HTMLElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const readyAddressRef = useRef<HTMLParagraphElement>(null);
  const readyHoursRef = useRef<HTMLParagraphElement>(null);
  const readyCTAsRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  /** Fixed gradient for hero title (theme-independent). Same as former "in Coquitlam, BC" style. */
  const heroTitleGradientStyle = {
    backgroundImage: 'linear-gradient(135deg, rgb(184, 134, 11) 0%, rgb(205, 133, 63) 20%, rgb(212, 175, 55) 40%, rgb(255, 215, 0) 50%, rgb(212, 175, 55) 60%, rgb(205, 133, 63) 80%, rgb(184, 134, 11) 100%)',
    WebkitBackgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    backgroundClip: 'text' as const,
    color: 'transparent' as const,
  };

  useLocalizedMetadata({
    title: t('seo.home.title'),
    description: t('seo.home.description'),
  });

  // Hero title + subtitle GSAP text animation (on load)
  useGSAP(() => {
    const titleEl = heroTitleRef.current;
    const subtitleEl = subtitleRef.current;

    // Badge: fade/slide in
    gsap.from('.hero-badge', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.3,
    });

    // Title: two-line stagger (runs on load so headlines show on first paint)
    if (titleEl) {
      const headlineLine = titleEl.querySelector('.hero-headline-line');
      const highlightLine = titleEl.querySelector('.hero-highlight-line');
      const lines = [headlineLine, highlightLine].filter(Boolean) as HTMLElement[];
      gsap.fromTo(
        lines,
        { y: 56, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.18,
          ease: 'power3.out',
          delay: 0.5,
        }
      );
    }

    // Subtitle: word-by-word text reveal (runs on load)
    if (subtitleEl) {
      const text = subtitleEl.textContent || subtitleEl.innerText || '';
      if (text.trim()) {
        const words = text.split(/\s+/).filter(Boolean);
        subtitleEl.innerHTML = words
          .map((word, i) => `<span class="hero-subtitle-word inline-block">${word}${i < words.length - 1 ? '\u00A0' : ''}</span>`)
          .join('');
        const wordEls = subtitleEl.querySelectorAll('.hero-subtitle-word');
        gsap.set(wordEls, { y: 24, opacity: 0, immediateRender: false });
        gsap.to(wordEls, {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.045,
          ease: 'power2.out',
          delay: 1.0,
        });
      }
    }

    // Buttons: fade in after title/subtitle
    gsap.from('.hero-cta-buttons', {
      y: 30,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      delay: 1.2,
    });

    // Floating Logo Animation - Enhanced
    gsap.to('.floating-logo', {
      y: 25,
      rotation: 12,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Animate Section Headers
    gsap.utils.toArray('.section-header').forEach((header: any) => {
      gsap.from(header, {
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8
      });
    });

    // Ready to Visit: scroll-driven staggered reveal (address, hours, CTAs)
    const readySection = mainRef.current?.querySelector('#contact');
    if (readySection) {
      const els = [readyAddressRef.current, readyHoursRef.current, readyCTAsRef.current].filter(Boolean) as HTMLElement[];
      if (els.length) {
        gsap.fromTo(els, { y: 24, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: readySection,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        });
      }
    }

    // Discover Our Difference: subtle card stagger on scroll (does not block core value/CTA)
    const aboutSection = mainRef.current?.querySelector('#about');
    if (aboutSection) {
      const cards = aboutSection.querySelectorAll('.grid.max-w-6xl > *');
      if (cards.length) {
        gsap.fromTo(cards, { y: 20, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: aboutSection,
            start: 'top 78%',
            toggleActions: 'play none none reverse'
          }
        });
      }
    }
  }, { scope: mainRef });

  const heroCarouselImages = useMemo(() => [
    getImageUrl('/images/slidetop-bg.jpg'),
    getImageUrl('/images/playground.jpg'),
    getImageUrl('/images/toys.jpg'),
    getImageUrl('/images/circle-time-area.jpg'),
  ], []);

  const videos = useMemo(() => [
    {
      url: getImageUrl('/videos/friendship-daycare.mp4'),
      title: t('home.dailyAdventures.videoTitle'),
      description: t('home.dailyAdventures.videoDescription'),
    }
  ], [t]);

  return (
    <main id="main-content" ref={mainRef} className="flex-1 overflow-x-hidden">
      {/* Magical Hero Section - Full viewport height minus header height (4rem/64px) */}
      <section id="home" className="relative h-[calc(100vh-4rem)] min-h-[600px] flex items-center justify-center overflow-hidden">

        <HeroImageCarousel
          images={heroCarouselImages}
          intervalMs={5000}
          overlayColor="bg-gradient-to-br from-blue-900/40 via-blue-600/40 to-sky-400/30"
        />

        {/* Floating Logo - Top Left - Enhanced Size */}
        <div className="absolute top-6 left-6 md:top-10 md:left-10 z-20 floating-logo hidden sm:block">
          <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 filter drop-shadow-2xl">
            <Image
              src="/daycare-logo.png"
              alt="Friendship Daycare Logo"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 96px, (max-width: 1024px) 128px, 160px"
            />
          </div>
        </div>

        {/* Animated Decorative Elements - Subtle for Video BG */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center hero-content">
          <div className="space-y-8">
            <div className="space-y-6">
              <span className="hero-badge inline-block px-6 py-3 rounded-full bg-white/15 backdrop-blur-lg border border-white/30 text-white font-bold text-sm tracking-widest uppercase shadow-xl hover:bg-white/20 transition-all duration-300">
                {t('home.hero.badgePrefix')}
                <span className="mx-1" aria-hidden="true">•</span>
                <a href={`tel:${businessProfile.telephone.replace(/\s/g, '')}`} className="text-white hover:underline underline-offset-2 transition-colors" aria-label={t('contact.phone')}>
                  {businessProfile.telephone}
                </a>
                <span className="mx-1" aria-hidden="true">•</span>
                <a href={`mailto:${businessProfile.email}`} className="text-white hover:underline underline-offset-2 transition-colors break-all" aria-label={t('contact.form.email')}>
                  {businessProfile.email}
                </a>
              </span>
              <h1 ref={heroTitleRef} className="text-5xl md:text-7xl lg:text-8xl font-display font-bold drop-shadow-2xl leading-tight tracking-tight">
                <span className="hero-headline-line block" style={heroTitleGradientStyle}>
                  {t('home.hero.headline')}
                </span>
                <span className="hero-highlight-line block drop-shadow-lg mt-1" style={{ color: '#ffffff' }}>
                  {t('home.hero.highlight')}
                </span>
              </h1>
              <p
                ref={subtitleRef}
                className="hero-subtitle w-full max-w-5xl mx-auto px-4 text-2xl md:text-4xl lg:text-5xl xl:text-[2.75rem] font-medium leading-snug md:leading-relaxed tracking-tight"
                style={{
                  color: '#ffffff',
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '0.02em',
                  textShadow: '0 2px 4px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.3)',
                }}
              >
                {t('home.hero.subtitle')}
              </p>
            </div>

            <div className="hero-cta-buttons flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <a href="/contact" className="btn-clay px-12 py-5 text-xl font-bold rounded-full shadow-2xl ring-4 ring-white/40 hover:ring-white/60 hover:scale-105 transition-all min-h-[56px] flex items-center justify-center" aria-label={t('home.hero.scheduleTour')}>
                {t('home.hero.scheduleTour')}
              </a>
              <a href="/programs" className="px-10 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/40 text-white font-bold text-lg hover:bg-white/20 transition-all hover:scale-105 shadow-xl flex items-center justify-center">
                {t('home.hero.viewPrograms')}
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/70">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        {/* R2 collects decorative background - key must match R2 bucket (e.g. collects/decoration.png) */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none bg-cover bg-center bg-no-repeat" aria-hidden="true" style={{ backgroundImage: `url(${getImageUrl('/collects/decoration.png')})` }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 section-header">
            {/* Logo Display REMOVED */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              {t('home.discoverDifference.title')}
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground w-full max-w-5xl mx-auto leading-relaxed font-medium">
              {t('home.discoverDifference.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
            {/* Item 1: Montessori Method - with image for consistency */}
            <Card variant="clay" className="p-0 overflow-visible group cursor-pointer hover:shadow-2xl transition-shadow duration-500 border-2 border-transparent hover:border-primary/30">
              <div className="relative h-56 lg:h-64 w-full overflow-hidden group/image">
                <AnimatedPlaceholder className="absolute inset-0 z-0" />
                <Image
                  src={getImageUrl('/images/sensorial-shelf.jpg')}
                  alt="Montessori sensorial materials"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover/image:scale-110 transition-transform duration-700 z-10 origin-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-20" />
              </div>
              <div className="relative -mt-6 flex justify-center z-30">
                <div className="rounded-full bg-background dark:bg-card border-2 border-primary/30 shadow-lg p-2.5 group-hover:border-primary transition-colors duration-300">
                  <Leaf className="w-10 h-10 text-primary" aria-hidden />
                </div>
              </div>
              <div className="p-8 lg:p-10 pt-4">
                <h3 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {t('home.discoverDifference.authenticMontessori.title')}
                </h3>
                <p className="text-base lg:text-lg text-muted-foreground leading-relaxed font-medium">
                  {t('home.discoverDifference.authenticMontessori.description')}
                </p>
              </div>
            </Card>

            {/* Item 2: Community */}
            <Card variant="clay" className="p-0 overflow-visible group cursor-pointer hover:shadow-2xl transition-shadow duration-500 border-2 border-transparent hover:border-secondary/30">
              <div className="relative h-56 lg:h-64 w-full overflow-hidden group/image">
                <AnimatedPlaceholder className="absolute inset-0 z-0" />
                <Image
                  src={getImageUrl("/images/circle-time-board-2.jpg")}
                  alt="Circle Time"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover/image:scale-110 transition-transform duration-700 z-10 origin-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-20" />
              </div>
              <div className="relative -mt-6 flex justify-center z-30">
                <div className="rounded-full bg-background dark:bg-card border-2 border-secondary/30 shadow-lg p-2.5 group-hover:border-secondary transition-colors duration-300">
                  <Heart className="w-10 h-10 text-secondary" aria-hidden />
                </div>
              </div>
              <div className="p-8 lg:p-10 pt-4">
                <h3 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-4 group-hover:text-secondary transition-colors duration-300">
                  {t('home.discoverDifference.lovingCommunity.title')}
                </h3>
                <p className="text-base lg:text-lg text-muted-foreground leading-relaxed font-medium">
                  {t('home.discoverDifference.lovingCommunity.description')}
                </p>
              </div>
            </Card>

            {/* Item 3: Safety */}
            <Card variant="clay" className="p-0 overflow-visible group cursor-pointer hover:shadow-2xl transition-shadow duration-500 border-2 border-transparent hover:border-accent/30">
              <div className="relative h-56 lg:h-64 w-full overflow-hidden group/image">
                <AnimatedPlaceholder className="absolute inset-0 z-0" />
                <Image
                  src={getImageUrl("/images/playground.jpg")}
                  alt="Playground"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover/image:scale-110 transition-transform duration-700 z-10 origin-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-20" />
              </div>
              <div className="relative -mt-6 flex justify-center z-30">
                <div className="rounded-full bg-background dark:bg-card border-2 border-accent/30 shadow-lg p-2.5 group-hover:border-accent transition-colors duration-300">
                  <Shield className="w-10 h-10 text-accent" aria-hidden />
                </div>
              </div>
              <div className="p-8 lg:p-10 pt-4">
                <h3 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
                  {t('home.discoverDifference.safetyFirst.title')}
                </h3>
                <p className="text-base lg:text-lg text-muted-foreground leading-relaxed font-medium">
                  {t('home.discoverDifference.safetyFirst.description')}
                </p>
              </div>
            </Card>

            {/* Item 4: Teachers - with image for consistency */}
            <Card variant="clay" className="p-0 overflow-visible group cursor-pointer hover:shadow-2xl transition-shadow duration-500 border-2 border-transparent hover:border-primary/30">
              <div className="relative h-56 lg:h-64 w-full overflow-hidden group/image">
                <AnimatedPlaceholder className="absolute inset-0 z-0" />
                <Image
                  src={getImageUrl('/images/language-shelf.jpg')}
                  alt="Language and learning materials"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover/image:scale-110 transition-transform duration-700 z-10 origin-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-20" />
              </div>
              <div className="relative -mt-6 flex justify-center z-30">
                <div className="rounded-full bg-background dark:bg-card border-2 border-primary/30 shadow-lg p-2.5 group-hover:border-primary transition-colors duration-300">
                  <GraduationCap className="w-10 h-10 text-primary" aria-hidden />
                </div>
              </div>
              <div className="p-8 lg:p-10 pt-4">
                <h3 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {t('home.discoverDifference.dedicatedEducators.title')}
                </h3>
                <p className="text-base lg:text-lg text-muted-foreground leading-relaxed font-medium">
                  {t('home.discoverDifference.dedicatedEducators.description')}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Programs Section - Hidden: daycare open to all suitable ages; View Programs link in hero */}
      {false && (
      <section id="programs" className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6 mb-20 section-header">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              {t('home.programs.title')}
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground w-full max-w-5xl mx-auto leading-relaxed font-medium">
              {t('home.programs.subtitle')}
            </p>
          </div>
        </div>
      </section>
      )}

      {/* Real Environment Showcase */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center"><LoadingSpinner /></div>}>
        <RealEnvironmentShowcase />
      </Suspense>

      {/* Daily Videos Section */}
      <section id="videos" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16 section-header">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
              {t('home.dailyAdventures.title')}
            </h2>
            <p className="text-xl text-muted-foreground w-full max-w-5xl mx-auto">
              {t('home.dailyAdventures.subtitle')}
            </p>
          </div>

          <VideoPlayer videos={videos} />
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-32 relative overflow-hidden">
        {/* Premium Gradient Background with Animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-secondary/85 z-0" />

        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 2px, transparent 0)',
            backgroundSize: '48px 48px',
            maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
          }}>
        </div>

        {/* Enhanced Decorative Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/25 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-10 section-header">
          <div className="inline-block px-8 py-3 rounded-full bg-white/25 backdrop-blur-lg border-2 border-white/40 text-white font-bold tracking-widest uppercase text-sm mb-4 shadow-2xl hover:bg-white/30 hover:scale-105 transition-all duration-300">
            Accepting New Enrollments
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white drop-shadow-2xl leading-tight tracking-tight">
            {t('home.readyToVisit.title')}
          </h2>

          <p className="text-2xl md:text-3xl lg:text-4xl text-white/95 w-full max-w-6xl mx-auto font-medium leading-relaxed drop-shadow-lg px-4">
            {t('home.readyToVisit.subtitle')}
          </p>

          <div className="flex flex-col items-center gap-6 text-white/95 text-lg md:text-xl">
            <p ref={readyAddressRef} className="flex items-center justify-center gap-3 font-semibold drop-shadow-lg">
              <span className="text-accent text-2xl" aria-hidden="true">📍</span>
              <span className="text-center">
                {businessProfile.address.streetAddress}, {businessProfile.address.addressLocality}, {businessProfile.address.addressRegion}
              </span>
            </p>
            <p ref={readyHoursRef} className="flex items-center justify-center gap-3 font-semibold drop-shadow-lg">
              <span className="text-accent text-2xl" aria-hidden="true">🕒</span>
              <span>{t('common.hours.weekdays')}</span>
            </p>
          </div>

          <div ref={readyCTAsRef} className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <a
              href="/contact"
              className="bg-white text-primary text-xl md:text-2xl px-12 py-6 rounded-full font-bold hover:bg-white/95 transition-all hover:scale-110 shadow-2xl hover:shadow-white/50 ring-4 ring-white/40 min-h-[60px] flex items-center justify-center group"
            >
              {t('home.readyToVisit.bookTour')}
              <svg className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="tel:6049458504"
              className="bg-transparent border-3 border-white text-white px-10 py-6 rounded-full font-bold text-xl md:text-2xl hover:bg-white/15 transition-all hover:scale-110 backdrop-blur-sm shadow-xl hover:shadow-white/30 min-h-[60px] flex items-center justify-center"
            >
              604.945.8504
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
