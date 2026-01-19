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
import { AnimatedPlaceholder } from '@/components/ui/AnimatedPlaceholder';
import { useLanguage } from '@/contexts/LanguageContext';
import { businessProfile } from '@/lib/business-profile';

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
      url: '/videos/friendship-daycare.mp4',
      title: 'Daily Adventures',
      description: 'A peek into our classroom - see the joy, learning, and growth happening every day at Friendship Corner Daycare.'
    }
  ], []);

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
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium text-sm tracking-wide uppercase">
                Est. 2008 &bull; Coquitlam, BC
              </span>
              <h1 className="text-4xl md:text-7xl font-display font-bold text-foreground drop-shadow-lg">
                Montessori Daycare <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary/90 to-secondary/90">
                  in Coquitlam, BC
                </span>
              </h1>
              <p
                ref={subtitleRef}
                className="text-2xl md:text-5xl font-medium text-foreground/90 w-full max-w-4xl mx-auto drop-shadow-md leading-relaxed"
                style={{
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '0.02em',
                }}
              >
                Friendship Corner Daycare offers a safe, nurturing Montessori environment for children 30 months to school age.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <a href="/contact" className="bg-accent text-white text-lg px-8 py-4 rounded-xl font-bold hover:bg-accent/90 transition-all hover:scale-105 shadow-xl hover:shadow-2xl ring-4 ring-accent/20">
                {t('home.hero.scheduleTour')}
              </a>
              <a href="/programs" className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-md border-2 border-white/50 text-white font-bold text-lg hover:bg-white/20 transition-all hover:scale-105 shadow-xl">
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
      <section id="about" className="py-24 bg-linear-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 section-header">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              {t('home.discoverDifference.title')}
            </h2>
            <p className="text-xl text-muted-foreground">{t('home.discoverDifference.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Item 1: Montessori Method */}
            <div className="flex flex-col space-y-3">
              <div className="text-4xl">🌱</div>
              <h3 className="text-xl font-semibold text-foreground">{t('home.discoverDifference.authenticMontessori.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('home.discoverDifference.authenticMontessori.description')}
              </p>
            </div>

            {/* Item 2: Community */}
            <div className="flex flex-col space-y-3">
              <div className="relative w-full h-48 rounded-lg overflow-hidden group">
                <AnimatedPlaceholder className="absolute inset-0 z-0" />
                <Image
                  src={getImageUrl("/images/circle-time-board-2.jpg")}
                  alt="Circle Time"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 z-10"
                />
              </div>
              <div className="text-4xl">❤️</div>
              <h3 className="text-xl font-semibold text-foreground">{t('home.discoverDifference.lovingCommunity.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('home.discoverDifference.lovingCommunity.description')}
              </p>
            </div>

            {/* Item 3: Safety */}
            <div className="flex flex-col space-y-3">
              <div className="relative w-full h-48 rounded-lg overflow-hidden group">
                <AnimatedPlaceholder className="absolute inset-0 z-0" />
                <Image
                  src={getImageUrl("/images/playground.jpg")}
                  alt="Playground"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 z-10"
                />
              </div>
              <div className="text-4xl">🛡️</div>
              <h3 className="text-xl font-semibold text-foreground">{t('home.discoverDifference.safetyFirst.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('home.discoverDifference.safetyFirst.description')}
              </p>
            </div>

            {/* Item 4: Teachers */}
            <div className="flex flex-col space-y-3 p-6 rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow border border-border/50">
              <div className="text-4xl">👩‍🏫</div>
              <h3 className="text-xl font-semibold text-foreground">{t('home.discoverDifference.dedicatedEducators.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('home.discoverDifference.dedicatedEducators.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-20 section-header">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              {t('home.programs.title')}
            </h2>
            <p className="text-xl text-muted-foreground w-full max-w-4xl mx-auto">
              {t('home.programs.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Program Cards with Standardized Card Component */}
            {[
              { id: 'toddler', key: 'toddler', color: 'primary', icon: '🧸' },
              { id: 'preschool', key: 'preschool', color: 'secondary', icon: '🎨' },
              { id: 'prek', key: 'prek', color: 'accent', icon: '🚀' },
            ].map((prog) => (
              <Card key={prog.id} variant="interactive" className="p-8 border-none bg-muted/20 hover:bg-muted/40 section-header">
                <CardHeader className="p-0 mb-6">
                  <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-[1.2] transition-transform duration-500",
                    prog.color === 'primary' ? 'bg-primary/10' :
                      prog.color === 'secondary' ? 'bg-secondary/10' : 'bg-accent/10')}>
                    {prog.icon}
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <CardTitle className="text-2xl font-bold mb-2">{t(`home.programs.${prog.key}.title`)}</CardTitle>
                  <CardDescription className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">{t(`home.programs.${prog.key}.range`)}</CardDescription>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {t(`home.programs.${prog.key}.description`)}
                  </p>
                </CardContent>
                <a href="/programs" className={cn("inline-flex items-center font-bold hover:translate-x-1 transition-transform",
                  prog.color === 'primary' ? 'text-primary' :
                    prog.color === 'secondary' ? 'text-secondary' : 'text-accent')}>
                  {t('home.programs.learnDetails')} <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </a>
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
            <p className="text-xl text-muted-foreground">
              {t('home.dailyAdventures.subtitle')}
            </p>
          </div>

          <VideoPlayer videos={videos} />
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-24 bg-primary relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center space-y-8 section-header">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white">
            {t('home.readyToVisit.title')}
          </h2>
          <p className="text-xl md:text-2xl text-white/90">
            {t('home.readyToVisit.subtitle')}
          </p>
          <div className="text-white/90 text-sm md:text-base space-y-1">
            <p>
              {businessProfile.address.streetAddress}, {businessProfile.address.addressLocality}, {businessProfile.address.addressRegion} {businessProfile.address.postalCode}
            </p>
            <p>Mon - Fri: 7:00 AM - 6:00 PM</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a href="/contact" className="bg-accent text-white px-10 py-5 rounded-xl font-bold text-xl hover:bg-white hover:text-accent transition-colors shadow-xl">
              {t('home.readyToVisit.bookTour')}
            </a>
            <a href="tel:6049458504" className="border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-xl hover:bg-white/10 transition-colors">
              604.945.8504
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
