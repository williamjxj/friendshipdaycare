'use client';

import { Suspense, useMemo, useRef } from 'react';
import { RealEnvironmentShowcase } from '@/components/sections/RealEnvironmentShowcase';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import dynamic from 'next/dynamic';
import { HeroVideoBackground } from '@/components/ui/hero-video-background';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { getImageUrl } from '@/lib/image-utils';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
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
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const { t } = useLanguage();

  useLocalizedMetadata({
    title: t('seo.home.title'),
    description: t('seo.home.description'),
  });

  // Animations
  useGSAP(() => {
    // Animate Hero Content (badge and title)
    gsap.from('.hero-content > div:first-child > *', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      delay: 0.5
    });

    // Animate subtitle with word-by-word effect
    if (subtitleRef.current) {
      // Wait a bit to ensure DOM is ready and text is visible
      setTimeout(() => {
        if (subtitleRef.current) {
          const subtitleText = subtitleRef.current.textContent || subtitleRef.current.innerText || '';
          if (subtitleText.trim()) {
            const words = subtitleText.split(' ').filter(w => w.trim());

            // Split into words for animation - keep visible initially
            subtitleRef.current.innerHTML = words
              .map((word, i) => `<span class="hero-subtitle-word inline-block" style="opacity: 1; transform: translateY(0);">${word}${i < words.length - 1 ? '&nbsp;' : ''}</span>`)
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
                stagger: 0.06,
                ease: 'power2.out',
                delay: 1.0,
              });
            }
          }
        }
      }, 100);
    }

    // Animate buttons
    gsap.from('.hero-content > div:last-child', {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 1.4,
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

  }, { scope: mainRef });

  const videos = useMemo(() => [
    {
      url: getImageUrl('/videos/friendship-daycare.mp4'),
      title: t('home.dailyAdventures.videoTitle'),
      description: t('home.dailyAdventures.videoDescription'),
    }
  ], [t]);

  return (
    <main id="main-content" ref={mainRef} className="flex-1 overflow-x-hidden">
      {/* Magical Hero Section */}
      <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">

        <HeroVideoBackground
          videoId="jNQXAC9IVRw" // Montessori sample video
          fallbackImage={getImageUrl("/images/slidetop-bg.jpg")}
          overlayColor="bg-gradient-to-br from-blue-900/40 via-blue-600/40 to-sky-400/30"
        />

        {/* Animated Decorative Elements - Subtle for Video BG */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center hero-content">
          <div className="space-y-8">
            <div className="space-y-6">
              <span className="inline-block px-6 py-3 rounded-full bg-white/15 backdrop-blur-lg border border-white/30 text-white font-bold text-sm tracking-widest uppercase shadow-xl hover:bg-white/20 transition-all duration-300">
                {t('home.hero.badge')}
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white drop-shadow-2xl leading-tight tracking-tight">
                {t('home.hero.headline')} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-white to-yellow-200 drop-shadow-lg">
                  {t('home.hero.highlight')}
                </span>
              </h1>
              <p
                ref={subtitleRef}
                className="text-xl md:text-3xl lg:text-4xl font-medium text-white/95 w-full max-w-4xl mx-auto drop-shadow-lg leading-relaxed px-4"
                style={{
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '0.01em',
                  textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                }}
              >
                {t('home.hero.subtitle')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <a href="/contact" className="btn-premium">
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 section-header">
            {/* Logo Display */}
            <div className="flex justify-center mb-8">
              <div className="relative w-48 h-32 md:w-64 md:h-40 lg:w-80 lg:h-48 transition-transform duration-500 hover:scale-105">
                <Image
                  src="/friendship-corner-daycare-logo.png"
                  alt="Friendship Corner Daycare Logo"
                  fill
                  sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 320px"
                  className="object-contain drop-shadow-lg"
                  priority
                />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              {t('home.discoverDifference.title')}
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground w-full max-w-5xl mx-auto leading-relaxed font-medium">
              {t('home.discoverDifference.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
            {/* Item 1: Montessori Method */}
            <Card variant="premium" className="p-8 lg:p-10 group cursor-pointer hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-primary/30">
              <div className="bg-gradient-to-br from-green-100 to-emerald-50 dark:from-green-900/40 dark:to-emerald-900/20 w-20 h-20 rounded-3xl flex items-center justify-center text-5xl mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">🌱</div>
              <h3 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                {t('home.discoverDifference.authenticMontessori.title')}
              </h3>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed font-medium">
                {t('home.discoverDifference.authenticMontessori.description')}
              </p>
            </Card>

            {/* Item 2: Community */}
            <Card variant="premium" className="p-0 overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-secondary/30">
              <div className="relative h-56 lg:h-64 w-full overflow-hidden">
                <AnimatedPlaceholder className="absolute inset-0 z-0" />
                <Image
                  src={getImageUrl("/images/circle-time-board-2.jpg")}
                  alt="Circle Time"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-20" />
                <div className="absolute bottom-6 left-6 text-5xl z-30 drop-shadow-lg">❤️</div>
              </div>
              <div className="p-8 lg:p-10 pt-6">
                <h3 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-4 group-hover:text-secondary transition-colors duration-300">
                  {t('home.discoverDifference.lovingCommunity.title')}
                </h3>
                <p className="text-base lg:text-lg text-muted-foreground leading-relaxed font-medium">
                  {t('home.discoverDifference.lovingCommunity.description')}
                </p>
              </div>
            </Card>

            {/* Item 3: Safety */}
            <Card variant="premium" className="p-0 overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-accent/30">
              <div className="relative h-56 lg:h-64 w-full overflow-hidden">
                <AnimatedPlaceholder className="absolute inset-0 z-0" />
                <Image
                  src={getImageUrl("/images/playground.jpg")}
                  alt="Playground"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-20" />
                <div className="absolute bottom-6 left-6 text-5xl z-30 drop-shadow-lg">🛡️</div>
              </div>
              <div className="p-8 lg:p-10 pt-6">
                <h3 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
                  {t('home.discoverDifference.safetyFirst.title')}
                </h3>
                <p className="text-base lg:text-lg text-muted-foreground leading-relaxed font-medium">
                  {t('home.discoverDifference.safetyFirst.description')}
                </p>
              </div>
            </Card>

            {/* Item 4: Teachers */}
            <Card variant="premium" className="p-8 lg:p-10 group cursor-pointer hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-primary/30">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-50 dark:from-blue-900/40 dark:to-cyan-900/20 w-20 h-20 rounded-3xl flex items-center justify-center text-5xl mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">👩‍🏫</div>
              <h3 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                {t('home.discoverDifference.dedicatedEducators.title')}
              </h3>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed font-medium">
                {t('home.discoverDifference.dedicatedEducators.description')}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6 mb-20 section-header">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              {t('home.programs.title')}
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground w-full max-w-5xl mx-auto leading-relaxed font-medium">
              {t('home.programs.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {/* Program Cards with Enhanced Styling */}
            {[
              { id: 'toddler', key: 'toddler', color: 'primary', icon: '🧸', gradient: 'from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/20' },
              { id: 'preschool', key: 'preschool', color: 'secondary', icon: '🎨', gradient: 'from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/20' },
              { id: 'prek', key: 'prek', color: 'accent', icon: '🚀', gradient: 'from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/20' },
            ].map((prog) => (
              <Card
                key={prog.id}
                variant="premium"
                className={cn(
                  "p-8 lg:p-10 flex flex-col h-full section-header group cursor-pointer",
                  "hover:shadow-2xl hover:-translate-y-2 transition-all duration-500",
                  "border-2 border-transparent hover:border-primary/40",
                  `bg-gradient-to-br ${prog.gradient}`
                )}
              >
                <CardHeader className="p-0 mb-6">
                  <div className={cn(
                    "w-24 h-24 rounded-3xl flex items-center justify-center text-6xl",
                    "group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl",
                    "bg-white/80 dark:bg-card/80 backdrop-blur-sm",
                    prog.color === 'primary' ? 'bg-gradient-to-br from-primary/20 to-primary/10' :
                      prog.color === 'secondary' ? 'bg-gradient-to-br from-secondary/20 to-secondary/10' :
                        'bg-gradient-to-br from-accent/20 to-accent/10'
                  )}>
                    {prog.icon}
                  </div>
                </CardHeader>
                <CardContent className="p-0 flex-grow space-y-4">
                  <CardTitle className="text-2xl lg:text-3xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {t(`home.programs.${prog.key}.title`)}
                  </CardTitle>
                  <CardDescription className="text-xs font-bold text-foreground/70 uppercase tracking-widest mb-4 bg-white/60 dark:bg-card/60 backdrop-blur-sm inline-block px-4 py-2 rounded-full border border-border/50 shadow-sm">
                    {t(`home.programs.${prog.key}.range`)}
                  </CardDescription>
                  <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-8 font-medium">
                    {t(`home.programs.${prog.key}.description`)}
                  </p>
                </CardContent>
                <div className="mt-auto pt-4 border-t border-border/50">
                  <a
                    href="/programs"
                    className={cn(
                      "inline-flex items-center font-bold text-lg group/link",
                      "hover:translate-x-2 transition-all duration-300",
                      prog.color === 'primary' ? 'text-primary hover:text-primary/80' :
                        prog.color === 'secondary' ? 'text-secondary hover:text-secondary/80' :
                          'text-accent-foreground hover:text-accent-foreground/80'
                    )}
                  >
                    {t('home.programs.learnDetails')}
                    <svg className="w-5 h-5 ml-2 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

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

          <div className="text-white/90 text-lg md:text-xl space-y-4 bg-white/15 backdrop-blur-md rounded-3xl p-8 lg:p-10 inline-block border-2 border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300 w-full max-w-4xl">
            <p className="flex items-center justify-center gap-3 font-semibold">
              <span className="text-accent text-2xl drop-shadow-lg">📍</span>
              <span className="text-left">
                {businessProfile.address.streetAddress}, {businessProfile.address.addressLocality}, {businessProfile.address.addressRegion}
              </span>
            </p>
            <p className="flex items-center justify-center gap-3 font-semibold">
              <span className="text-accent text-2xl drop-shadow-lg">🕒</span>
              <span>{t('common.hours.weekdays')}</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
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
