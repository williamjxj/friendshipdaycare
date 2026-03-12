'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { TestimonialsMarquee } from '@/components/sections/TestimonialsMarquee';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProgramsSection } from '@/components/sections/ProgramsSection';
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
import { Download, Sparkles, Heart, Shield, Star } from 'lucide-react';
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
  const marqueeRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  useLocalizedMetadata({
    title: t('seo.home.title'),
    description: t('seo.home.description'),
  });

  // GSAP animations for scroll-triggered sections and hero text effects
  useGSAP(() => {
    // Logo gentle float animation (continuous) - subtle for top-left position
    if (heroLogoRef.current) {
      gsap.to(heroLogoRef.current, {
        y: -5,
        duration: 2.5,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    // Headline text split animation
    if (heroTitleRef.current) {
      const words = heroTitleRef.current.querySelectorAll('.word');
      gsap.from(words, {
        opacity: 0,
        y: 50,
        rotationX: -90,
        stagger: 0.15,
        duration: 1,
        ease: 'back.out(1.7)',
        delay: 0.3,
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

        {/* Logo - Top Left Corner (no wrapper) */}
        <motion.div
          ref={heroLogoRef}
          className="absolute top-20 left-4 sm:left-6 lg:left-8 z-20 w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44"
          initial={{ scale: 0.8, opacity: 0, x: -50 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/daycare-logo.png"
            alt={businessProfile.name}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 176px"
            priority
          />
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-start md:gap-12 gap-8 pt-8 pb-12 lg:pt-12 lg:pb-20">
          {/* Left Content Section */}
          <div className="min-w-0 flex-1 order-1 flex flex-col items-start mt-24 sm:mt-28 md:mt-8">
            {/* Badge - Enrollment Status with Download */}
            <motion.a
              href="/assets/Registration form 2026.pdf"
              download="Friendship-Corner-Daycare-Registration-2026.pdf"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full mb-4 border-2 border-white/30 cursor-pointer group relative shadow-2xl"
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(16px)'
              }}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(15, 23, 42, 0.95)' }}
              whileTap={{ scale: 0.95 }}
              title="Click to Download Enrollment Application Form"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-sm md:text-base font-semibold text-white drop-shadow-lg">
                {t('home.hero.badge')}
              </span>
              <Download className="w-4 h-4 text-white group-hover:animate-bounce drop-shadow-lg" />
            </motion.a>

            {/* Main Title with GSAP word animation */}
            <h1
              ref={heroTitleRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4"
              style={{
                textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.4), 0 8px 16px rgba(0,0,0,0.3), 0 0 40px rgba(0,0,0,0.2)'
              }}
            >
              <span className="word inline-block text-white" style={{ WebkitTextStroke: '1px rgba(0,0,0,0.3)' }}>{t('home.hero.headlineBefore')}</span>{' '}
              <span className="word inline-block" style={{ color: '#fbbf24', WebkitTextStroke: '1px rgba(0,0,0,0.3)' }}>{t('home.hero.headlineHighlight')}</span>{' '}
              <span className="word inline-block text-white" style={{ WebkitTextStroke: '1px rgba(0,0,0,0.3)' }}>{t('home.hero.headlineAfter')}</span>
            </h1>

            {/* Subtitle - Bluish gray like reference site screenshot */}
            <motion.h2
              ref={subtitleRef}
              className="text-lg sm:text-xl md:text-2xl mb-8 font-semibold leading-relaxed w-full"
              style={{ 
                color: '#f1f5f9',
                fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                lineHeight: '1.6',
                letterSpacing: '0.01em',
                fontWeight: '600',
                textShadow: '0 2px 4px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.4)'
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {t('home.hero.subtitle')}
            </motion.h2>

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
                className="px-6 py-3 rounded-lg border-2 border-white/30 shadow-2xl"
                style={{
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(16px)'
                }}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
                }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(15, 23, 42, 0.95)', y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-2xl font-extrabold text-white drop-shadow-lg">{t('home.hero.stats.years')}</div>
                <div className="text-sm text-white/90 font-semibold drop-shadow-md">{t('home.hero.stats.yearsLabel')}</div>
              </motion.div>

              <motion.div
                className="px-6 py-3 rounded-lg border-2 border-white/30 shadow-2xl"
                style={{
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(16px)'
                }}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
                }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(15, 23, 42, 0.95)', y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-2xl font-extrabold text-white drop-shadow-lg">{t('home.hero.stats.ageRange')}</div>
                <div className="text-sm text-white/90 font-semibold drop-shadow-md">{t('home.hero.stats.ageRangeLabel')}</div>
              </motion.div>

              <motion.div
                className="px-6 py-3 rounded-lg border-2 border-white/30 shadow-2xl"
                style={{
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(16px)'
                }}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
                }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(15, 23, 42, 0.95)', y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-2xl font-extrabold text-white drop-shadow-lg">{t('home.hero.stats.staffRatio')}</div>
                <div className="text-sm text-white/90 font-semibold drop-shadow-md">{t('home.hero.stats.staffRatioLabel')}</div>
              </motion.div>

              <motion.div
                className="px-6 py-3 rounded-lg border-2 border-white/30 shadow-2xl"
                style={{
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(16px)'
                }}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
                }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(15, 23, 42, 0.95)', y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-base font-extrabold text-white drop-shadow-lg">{t('home.hero.stats.eceLicensed')}</div>
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
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg bg-blue-600 text-white text-lg font-bold shadow-2xl"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
                whileHover={{ scale: 1.05, backgroundColor: '#1d4ed8' }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {t('home.hero.callNow')}
              </motion.a>

              <motion.a
                href="/#programs"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-white/40 text-white text-lg font-bold shadow-2xl"
                style={{
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(16px)',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(15, 23, 42, 0.95)' }}
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

        {/* Marquee Feature Cards - Infinite scrolling marquee */}
        <div className="absolute bottom-32 left-0 right-0 w-full overflow-hidden z-10 pointer-events-none">
          <div className="relative w-full flex">
            {/* First marquee track */}
            <div 
              ref={marqueeRef}
              className="flex items-center gap-4 px-4 animate-marquee-infinite"
              style={{ width: 'max-content' }}
            >
              {/* Feature Card 1 - Montessori */}
              <div className="shrink-0 px-5 py-3 rounded-full backdrop-blur-sm border-2 border-white/30 shadow-xl flex items-center gap-2 pointer-events-auto group hover:scale-105 transition-transform" style={{ background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.95), rgba(244, 63, 94, 0.95))' }}>
                <Sparkles className="w-4 h-4 text-white group-hover:animate-spin drop-shadow-lg" />
                <span className="text-white font-bold text-sm whitespace-nowrap" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Authentic Montessori</span>
              </div>

              {/* Feature Card 2 - Safety */}
              <div className="shrink-0 px-5 py-3 rounded-full backdrop-blur-sm border-2 border-white/30 shadow-xl flex items-center gap-2 pointer-events-auto group hover:scale-105 transition-transform" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(6, 182, 212, 0.95))' }}>
                <Shield className="w-4 h-4 text-white group-hover:animate-pulse drop-shadow-lg" />
                <span className="text-white font-bold text-sm whitespace-nowrap" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>BC Licensed & Safe</span>
              </div>

              {/* Feature Card 3 - Love */}
              <div className="shrink-0 px-5 py-3 rounded-full backdrop-blur-sm border-2 border-white/30 shadow-xl flex items-center gap-2 pointer-events-auto group hover:scale-105 transition-transform" style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.95), rgba(236, 72, 153, 0.95))' }}>
                <Heart className="w-4 h-4 text-white group-hover:animate-bounce fill-white/50 drop-shadow-lg" />
                <span className="text-white font-bold text-sm whitespace-nowrap" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Loving Community</span>
              </div>

              {/* Feature Card 4 - Excellence */}
              <div className="shrink-0 px-5 py-3 rounded-full backdrop-blur-sm border-2 border-white/30 shadow-xl flex items-center gap-2 pointer-events-auto group hover:scale-105 transition-transform" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.95), rgba(249, 115, 22, 0.95))' }}>
                <Star className="w-4 h-4 text-white group-hover:animate-spin fill-white/50 drop-shadow-lg" />
                <span className="text-white font-bold text-sm whitespace-nowrap" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>16+ Years Excellence</span>
              </div>
            </div>
            
            {/* Duplicate marquee track for seamless loop */}
            <div 
              className="flex items-center gap-4 px-4 animate-marquee-infinite"
              style={{ width: 'max-content' }}
              aria-hidden="true"
            >
              <div className="shrink-0 px-5 py-3 rounded-full backdrop-blur-sm border-2 border-white/30 shadow-xl flex items-center gap-2 pointer-events-auto group hover:scale-105 transition-transform" style={{ background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.95), rgba(244, 63, 94, 0.95))' }}>
                <Sparkles className="w-4 h-4 text-white group-hover:animate-spin drop-shadow-lg" />
                <span className="text-white font-bold text-sm whitespace-nowrap" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Authentic Montessori</span>
              </div>
              <div className="shrink-0 px-5 py-3 rounded-full backdrop-blur-sm border-2 border-white/30 shadow-xl flex items-center gap-2 pointer-events-auto group hover:scale-105 transition-transform" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(6, 182, 212, 0.95))' }}>
                <Shield className="w-4 h-4 text-white group-hover:animate-pulse drop-shadow-lg" />
                <span className="text-white font-bold text-sm whitespace-nowrap" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>BC Licensed & Safe</span>
              </div>
              <div className="shrink-0 px-5 py-3 rounded-full backdrop-blur-sm border-2 border-white/30 shadow-xl flex items-center gap-2 pointer-events-auto group hover:scale-105 transition-transform" style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.95), rgba(236, 72, 153, 0.95))' }}>
                <Heart className="w-4 h-4 text-white group-hover:animate-bounce fill-white/50 drop-shadow-lg" />
                <span className="text-white font-bold text-sm whitespace-nowrap" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Loving Community</span>
              </div>
              <div className="shrink-0 px-5 py-3 rounded-full backdrop-blur-sm border-2 border-white/30 shadow-xl flex items-center gap-2 pointer-events-auto group hover:scale-105 transition-transform" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.95), rgba(249, 115, 22, 0.95))' }}>
                <Star className="w-4 h-4 text-white group-hover:animate-spin fill-white/50 drop-shadow-lg" />
                <span className="text-white font-bold text-sm whitespace-nowrap" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>16+ Years Excellence</span>
              </div>
            </div>
          </div>
        </div>

        <a href="/#about" className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white hover:text-white text-xs uppercase tracking-widest font-bold flex flex-col items-center gap-1 z-20" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 4px 16px rgba(0,0,0,0.6)' }}>
          {t('home.hero.scrollToAbout')}
          <svg className="w-5 h-5 animate-bounce drop-shadow-2xl" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </a>

        {/* Curved bottom edge - reference clone */}
        <div className="absolute bottom-0 left-0 right-0 w-full h-24 overflow-visible pointer-events-none" aria-hidden>
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full block">
            <path style={{ fill: 'var(--card)' }} d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" />
          </svg>
        </div>
      </section>

      <AboutSection />

      <ProgramsSection />

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
