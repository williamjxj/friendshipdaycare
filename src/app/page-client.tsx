'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { TestimonialsMarquee } from '@/components/sections/TestimonialsMarquee';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProgramsDetailSection } from '@/components/sections/ProgramsDetailSection';
import { GallerySectionContent } from '@/components/sections/GallerySectionContent';
import { EnrollmentSectionContent } from '@/components/sections/EnrollmentSectionContent';
import { ContactFormSection } from '@/components/sections/ContactFormSection';
import dynamic from 'next/dynamic';
import { HeroImageCarousel } from '@/components/ui/hero-image-carousel';
import { HeroContactForm } from '@/components/ui/hero-contact-form';
import { motion } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getImageUrl } from '@/lib/image-utils';
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
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroLogoRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const { t } = useLanguage();
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  useLocalizedMetadata({
    title: t('seo.home.title'),
    description: t('seo.home.description'),
  });

  // GSAP animations for scroll-triggered sections
  useGSAP(() => {
    // Logo floating animation (continuous)
    if (heroLogoRef.current) {
      gsap.to(heroLogoRef.current, {
        y: -10,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    // Animate Section Headers on scroll
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
      {/* Hero Section - Clone of frienddaycare-hbvktcxj.manus.space (full-screen, nav overflow, curved bottom) */}
      <section
        id="home"
        ref={heroSectionRef}
        className="relative min-h-screen flex items-start w-full overflow-hidden -mt-16 pt-16"
      >
        <HeroImageCarousel
          images={heroCarouselImages}
          intervalMs={5000}
          onIndexChange={setHeroSlideIndex}
        />
        <div className="absolute inset-0 bg-slate-900/50 -z-5" aria-hidden />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-start md:gap-12 gap-8 py-12 lg:py-20">
          {/* Left Content Section */}
          <div className="min-w-0 flex-1 order-1 flex flex-col items-start">
            {/* Badge - Enrollment Status */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full mb-6 border border-white/20"
              style={{
                backgroundColor: 'rgba(30, 41, 59, 0.6)',
                backdropFilter: 'blur(10px)'
              }}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm md:text-base font-medium text-white">
                {t('home.hero.badge')}
              </span>
            </motion.div>

            {/* Logo - Large, clean, no box, animated */}
            <motion.div
              ref={heroLogoRef}
              className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mb-8 shrink-0"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/daycare-logo.png"
                alt={businessProfile.name}
                fill
                className="object-contain drop-shadow-2xl"
                sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 256px"
                priority
              />
            </motion.div>

            {/* Main Title - "Where Young Minds Flourish" with Minds highlighted */}
            <motion.h1
              ref={heroTitleRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-white">{t('home.hero.headlineBefore')}</span>
              <span style={{ color: '#efa201' }}>{t('home.hero.headlineHighlight')}</span>
              <span className="text-white">{t('home.hero.headlineAfter')}</span>
            </motion.h1>

            {/* Subtitle - Bluish gray like reference site screenshot */}
            <motion.p
              ref={subtitleRef}
              className="text-base sm:text-lg md:text-xl mb-10 font-bold leading-relaxed w-full"
              style={{ 
                color: '#7c8db0',
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                lineHeight: '1.75',
                letterSpacing: '0.01em'
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {t('home.hero.subtitle')}
            </motion.p>

            {/* Stats Row - Clean horizontal layout like reference site */}
            <motion.div
              className="flex flex-wrap gap-4 mb-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    delayChildren: 0.6,
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              <motion.div
                className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg"
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
                }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)', y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-2xl font-bold text-white">{t('home.hero.stats.years')}</div>
                <div className="text-sm text-white/80 font-medium">{t('home.hero.stats.yearsLabel')}</div>
              </motion.div>

              <motion.div
                className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg"
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
                }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)', y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-2xl font-bold text-white">{t('home.hero.stats.ageRange')}</div>
                <div className="text-sm text-white/80 font-medium">{t('home.hero.stats.ageRangeLabel')}</div>
              </motion.div>

              <motion.div
                className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg"
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
                }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)', y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-2xl font-bold text-white">{t('home.hero.stats.staffRatio')}</div>
                <div className="text-sm text-white/80 font-medium">{t('home.hero.stats.staffRatioLabel')}</div>
              </motion.div>

              <motion.div
                className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg"
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
                }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)', y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-base font-bold text-white">{t('home.hero.stats.eceLicensed')}</div>
              </motion.div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.a
                href={`tel:${businessProfile.telephone.replace(/\D/g, '')}`}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg bg-blue-600 text-white text-lg font-semibold shadow-xl"
                whileHover={{ scale: 1.05, backgroundColor: '#2563eb' }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {t('home.hero.callNow')}
              </motion.a>

              <motion.a
                href="/#programs"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white text-lg font-semibold"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {t('home.hero.viewPrograms')}
              </motion.a>
            </motion.div>
          </div>

          <div className="relative z-20 order-2 w-full max-w-sm md:max-w-90 mx-auto md:mx-0 shrink-0">
            <HeroContactForm />
          </div>
        </div>

        <a href="/#about" className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white/70 hover:text-white text-xs uppercase tracking-widest font-medium flex flex-col items-center gap-1 z-20">
          {t('home.hero.scrollToAbout')}
          <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </a>

        {/* Curved bottom edge - reference clone */}
        <div className="absolute bottom-0 left-0 right-0 w-full h-24 overflow-visible pointer-events-none" aria-hidden>
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full block">
            <path style={{ fill: 'var(--card)' }} d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" />
          </svg>
        </div>
      </section>

      <AboutSection />

      <ProgramsDetailSection />

      <GallerySectionContent />

      {/* Testimonials */}
      <TestimonialsMarquee />

      <EnrollmentSectionContent />

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

      <ContactFormSection />
    </main>
  );
}
