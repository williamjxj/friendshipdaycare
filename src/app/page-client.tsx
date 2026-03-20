'use client';

import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
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
import { gridPattern } from '@/lib/magicui-animations';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Sparkles, Heart, Shield, Star, PhoneCall, ArrowRight, BookOpen, Facebook, Instagram, Calendar } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getImageUrl } from '@/lib/image-utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { businessProfile } from '@/lib/business-profile';
import { useLocalizedMetadata } from '@/lib/use-localized-metadata';
import { BorderBeam } from '@/components/ui/border-beam';
import { AuroraBackground } from '@/components/ui/aurora-background';

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
  const [, setHeroSlideIndex] = useState(0);
  const facebookUrl = businessProfile.sameAs?.find((url) => url.includes('facebook'));
  const instagramUrl = businessProfile.sameAs?.find((url) => url.includes('instagram'));

  useLocalizedMetadata({
    title: t('seo.home.title'),
    description: t('seo.home.description'),
  });

  // GSAP animations for scroll-triggered sections and hero text effects
  useGSAP(() => {
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
    gsap.utils.toArray<HTMLElement>('.section-header').forEach((header) => {
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
        className="relative min-h-svh md:min-h-screen flex items-start w-full overflow-hidden -mt-16 pt-16"
      >
        <HeroImageCarousel
          images={heroCarouselImages}
          intervalMs={5000}
          onIndexChange={setHeroSlideIndex}
        />
        
        {/* Playful Floating Shapes - Childlike Background Elements */}
        <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden hidden md:block">
          {/* Colorful Circles */}
          <motion.div 
            className="absolute top-[15%] right-[10%] w-20 h-20 rounded-full bg-yellow-400/30 blur-2xl"
            animate={{ 
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-[20%] left-[15%] w-32 h-32 rounded-full bg-pink-400/25 blur-2xl"
            animate={{ 
              y: [0, 40, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div 
            className="absolute top-[40%] left-[8%] w-24 h-24 rounded-full bg-blue-400/20 blur-xl"
            animate={{ 
              y: [0, -25, 0],
              x: [0, 15, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div 
            className="absolute top-[25%] right-[25%] w-16 h-16 rounded-full bg-green-400/25 blur-xl"
            animate={{ 
              y: [0, 35, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          
          {/* Playful Stars */}
          <motion.div
            className="absolute top-[30%] right-[20%]"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-8 h-8 text-yellow-300/40" />
          </motion.div>
          <motion.div
            className="absolute bottom-[30%] right-[12%]"
            animate={{ 
              rotate: [0, -360],
              y: [0, -20, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          >
            <Star className="w-6 h-6 text-pink-300/40" />
          </motion.div>
          <motion.div
            className="absolute top-[50%] left-[20%]"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 3 }}
          >
            <Heart className="w-7 h-7 text-red-300/30" />
          </motion.div>
        </div>

        {/* Logo - Top Left Corner (below header, fully visible) */}
        <motion.div
          ref={heroLogoRef}
          className="absolute top-20 left-4 sm:top-24 sm:left-8 lg:left-10 z-20 w-16 h-16 sm:w-28 sm:h-28 md:w-40 md:h-40 shrink-0"
          initial={{ scale: 0.8, opacity: 0, x: -50 }}
          animate={{
            opacity: 1,
            x: 0,
            scale: [1, 1.08, 0.96, 1.05, 1],
            rotate: [0, 360],
            y: [0, -14, 5, -10, 0],
          }}
          transition={{
            opacity: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            x: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
            rotate: { duration: 12, repeat: Infinity, ease: 'linear' },
            y: { duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/daycare-logo.png"
              alt={businessProfile.name}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 64px, (max-width: 768px) 112px, 160px"
              priority
            />
          </div>
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-start gap-3 md:gap-12 pt-4 pb-12 sm:pt-8 sm:pb-12 lg:pt-12 lg:pb-20">
          {/* Left Content Section - minimal on mobile: logo, h1, badge, CTAs */}
          <div className="min-w-0 flex-1 order-1 flex flex-col items-start mt-10 sm:mt-20 md:mt-8 w-full">
            {/* Badge - Enrollment Status with Download */}
            <motion.a
              href="/assets/Registration form 2026.pdf"
              download="Friendship-Corner-Daycare-Registration-2026.pdf"
              className="inline-flex items-center gap-2 px-3 sm:px-6 py-2.5 sm:py-4 rounded-full mb-2 sm:mb-4 border-2 border-white/30 cursor-pointer group relative shadow-2xl overflow-visible"
              style={{ background: 'none', backdropFilter: 'none' }}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
              title="Click to Download Enrollment Application Form"
            >
              <AuroraBackground className="z-0! rounded-full!" />
              <span className="relative flex h-2.5 w-2.5 z-10">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="relative z-10 text-sm md:text-base font-extrabold text-white drop-shadow-lg tracking-wide uppercase" style={{ letterSpacing: '0.04em', textShadow: '0 2px 8px #000, 0 4px 16px #0006' }}>
                {t('home.hero.badge')}
              </span>
              <Download className="w-4 h-4 text-white group-hover:animate-bounce drop-shadow-lg relative z-10" />
            </motion.a>

            {/* Main Title with GSAP word animation */}
            <h1
              ref={heroTitleRef}
              className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-3 sm:mb-4"
              style={{
                textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.4), 0 8px 16px rgba(0,0,0,0.3), 0 0 40px rgba(0,0,0,0.2)'
              }}
            >
              <span className="word inline-block text-white" style={{ WebkitTextStroke: '1px rgba(0,0,0,0.3)' }}>{t('home.hero.headlineBefore')}</span>{' '}
              <span className="word inline-block" style={{ color: '#fbbf24', WebkitTextStroke: '1px rgba(0,0,0,0.3)' }}>{t('home.hero.headlineHighlight')}</span>{' '}
              <span className="word inline-block" style={{ color: '#fbbf24', WebkitTextStroke: '1px rgba(0,0,0,0.3)' }}>{t('home.hero.headlineAfter')}</span>
            </h1>

            {/* Subtitle - Desktop only; mobile hero is minimal */}
            <motion.h2
              ref={subtitleRef}
              className="hidden md:block text-sm sm:text-xl md:text-2xl mb-4 sm:mb-8 font-semibold leading-relaxed w-full vivid-children-font"
              style={{ 
                color: '#fbbf24',
                fontFamily: 'var(--font-display), var(--font-accent), "Comic Sans MS", "Comic Sans", "Baloo", "Fredoka", cursive, sans-serif',
                fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                lineHeight: '1.6',
                letterSpacing: '0.01em',
                fontWeight: '700',
                textShadow: '0 2px 8px #000, 0 4px 16px #0006'
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {t('home.hero.subtitle')}
            </motion.h2>

            {/* Stats Row - Desktop only; mobile hero is minimal */}
            <motion.div
              className="hidden md:grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3 mb-4 sm:mb-6 w-full"
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
              {/* Address Card */}
              <motion.div
                className="w-full sm:w-auto px-2 sm:px-4 py-2 sm:py-3 rounded-lg border border-orange-400/30 shadow-md bg-linear-to-br from-orange-100/60 to-orange-200/40 flex flex-col justify-center"
                variants={{
                  hidden: { y: 16, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.18 }}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-700" />
                  <div className="text-base sm:text-lg font-bold text-orange-900 drop-shadow">{t('home.hero.address')}</div>
                </div>
              </motion.div>

              {/* Phone/Email Card */}
              <motion.div
                className="w-full sm:w-auto px-2 sm:px-4 py-2 sm:py-3 rounded-lg border border-green-400/30 shadow-md bg-linear-to-br from-green-100/60 to-green-200/40 flex flex-col justify-center"
                variants={{
                  hidden: { y: 16, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.18 }}
              >
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-5 h-5 text-green-700" />
                  <div className="text-base sm:text-lg font-bold text-green-900 drop-shadow">{businessProfile.telephone} &nbsp;|&nbsp; {businessProfile.email}</div>
                </div>
              </motion.div>

              {/* Age Range Card */}
              <motion.div
                className="w-full sm:w-auto px-2 sm:px-4 py-2 sm:py-3 rounded-lg border border-primary/30 shadow-md bg-linear-to-br from-blue-100/60 to-blue-200/40 flex flex-col justify-center"
                variants={{
                  hidden: { y: 16, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.18 }}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-700" />
                  <div className="text-base sm:text-lg font-bold text-blue-900 drop-shadow">Age 2.5 - 5 years old</div>
                </div>
              </motion.div>

              {/* Social Links Card */}
              <motion.div
                className="w-full sm:w-auto px-2 sm:px-4 py-2 sm:py-3 rounded-lg border border-purple-400/30 shadow-md bg-gradient-to-br from-purple-700/80 to-purple-400/60 flex flex-row items-center gap-3 justify-center"
                variants={{
                  hidden: { y: 16, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.18 }}
              >
                <span className="text-base sm:text-lg font-bold text-white drop-shadow">Follow us:</span>
                {facebookUrl && (
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-blue-700 shadow transition-colors duration-150 w-8 h-8 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                )}
                {instagramUrl && (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-pink-600 shadow transition-colors duration-150 w-8 h-8 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
              </motion.div>
            </motion.div>

            {/* CTA Buttons - Simple on mobile, animated on desktop */}
            <motion.div
              className="grid w-full min-w-0 max-w-xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Call Now - simple link on mobile to avoid icon/rendering issues */}
              <a
                href={`tel:${businessProfile.telephone.replace(/\D/g, '')}`}
                className="flex sm:hidden items-center justify-center gap-2 w-full min-w-0 rounded-xl border-2 border-white/30 bg-slate-900/90 px-4 py-3.5 font-bold text-white backdrop-blur-xl transition-all hover:bg-slate-800/95 active:scale-[0.98]"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.35)' }}
              >
                <PhoneCall className="h-5 w-5 shrink-0" aria-hidden />
                <span className="text-center">{t('home.hero.callNow')}</span>
              </a>
              <motion.div
                className="hidden sm:block group relative overflow-hidden rounded-2xl p-px"
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="absolute -inset-[140%] bg-[conic-gradient(from_0deg,rgba(59,130,246,0),rgba(56,189,248,0.95),rgba(59,130,246,0.15),rgba(59,130,246,0))]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                />
                <div className="relative rounded-[15px] border border-white/20 bg-slate-900/85 p-1 backdrop-blur-xl shadow-[0_20px_60px_rgba(2,6,23,0.55)]">
                  <Button
                    asChild
                    variant="ghost"
                    className="h-auto w-full justify-between rounded-xl px-4 py-3 text-white hover:bg-white/10"
                  >
                    <a href={`tel:${businessProfile.telephone.replace(/\D/g, '')}`}>
                      <span className="flex items-center gap-3 text-base font-bold" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.35)' }}>
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/20 ring-1 ring-cyan-200/60">
                          <PhoneCall className="h-4 w-4 text-cyan-100" />
                        </span>
                        {t('home.hero.callNow')}
                      </span>
                      <ArrowRight className="h-4 w-4 text-cyan-100 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </Button>
                </div>
              </motion.div>

              {/* View Programs */}
              <Link
                href="/#programs"
                className="flex sm:hidden items-center justify-center gap-2 w-full min-w-0 rounded-xl border-2 border-white/30 bg-slate-900/90 px-4 py-3.5 font-bold text-white backdrop-blur-xl transition-all hover:bg-slate-800/95 active:scale-[0.98]"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.35)' }}
              >
                <BookOpen className="h-5 w-5 shrink-0" aria-hidden />
                <span className="text-center">{t('home.hero.viewPrograms')}</span>
              </Link>
              <motion.div
                className="hidden sm:block group relative overflow-hidden rounded-2xl p-px"
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="absolute -inset-[140%] bg-[conic-gradient(from_0deg,rgba(244,114,182,0),rgba(251,146,60,0.95),rgba(244,114,182,0.2),rgba(244,114,182,0))]"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
                />
                <div className="relative rounded-[15px] border border-white/20 bg-slate-900/85 p-1 backdrop-blur-xl shadow-[0_20px_60px_rgba(2,6,23,0.55)]">
                  <Button
                    asChild
                    variant="ghost"
                    className="h-auto w-full justify-between rounded-xl px-4 py-3 text-white hover:bg-white/10"
                  >
                    <Link href="/#programs">
                      <span className="flex items-center gap-3 text-base font-bold" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.35)' }}>
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange-400/20 ring-1 ring-orange-200/60">
                          <BookOpen className="h-4 w-4 text-orange-100" />
                        </span>
                        {t('home.hero.viewPrograms')}
                      </span>
                      <ArrowRight className="h-4 w-4 text-orange-100 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </motion.div>

              {/* Schedule a Tour - mobile only */}
              <Link
                href="/#contact-form"
                className="flex sm:hidden items-center justify-center gap-2 w-full min-w-0 rounded-xl border-2 border-white/30 bg-slate-900/90 px-4 py-3.5 font-bold text-white backdrop-blur-xl transition-all hover:bg-slate-800/95 active:scale-[0.98]"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.35)' }}
              >
                <Calendar className="h-5 w-5 shrink-0" aria-hidden />
                <span className="text-center">{t('home.hero.scheduleTour')}</span>
              </Link>
            </motion.div>

            {/* Social links row removed; now in card above */}
          </div>

          {/* Contact form: desktop only; mobile uses Schedule a Tour link above */}
          <div className="relative z-20 order-2 hidden md:block w-full max-w-sm md:max-w-90 mx-auto md:mx-0 shrink-0 mt-1 md:mt-0">
            <div className="relative overflow-hidden rounded-2xl">
              <HeroContactForm />
              <BorderBeam size={60} duration={7} colorFrom="#6366f1" colorTo="#f472b6" borderWidth={3} />
            </div>
          </div>
        </div>

        {/* Marquee Feature Cards - Infinite scrolling marquee */}
        <div className="absolute bottom-32 left-0 right-0 z-10 pointer-events-none hidden md:block">
          <div className="relative w-full max-w-7xl mx-auto overflow-hidden px-4 sm:px-6 lg:px-8">
            <div className="flex w-max min-w-full">
            {/* First marquee track */}
            <div 
              ref={marqueeRef}
              className="flex items-center gap-4 animate-marquee-infinite pr-4"
              style={{ width: 'max-content' }}
            >
              {/* Feature Card 1 - Montessori */}
              <motion.div
                className="shrink-0 px-5 py-3 rounded-full border-2 border-white/30 shadow-xl flex items-center gap-2 pointer-events-auto group hover:scale-105 transition-transform magic-grid"
                style={{ 
                  ...gridPattern, 
                  background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.95), rgba(244, 63, 94, 0.95))',
                  position: 'relative',
                  zIndex: 1
                }}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
              >
                <Sparkles className="w-4 h-4 text-white group-hover:animate-spin drop-shadow-lg" />
                <span className="text-white font-bold text-sm whitespace-nowrap magic-grid-text" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Authentic Montessori</span>
              </motion.div>

              {/* Feature Card 2 - Safety */}
              <motion.div
                className="shrink-0 px-5 py-3 rounded-full border-2 border-white/30 shadow-xl flex items-center gap-2 pointer-events-auto group hover:scale-105 transition-transform magic-grid"
                style={{ 
                  ...gridPattern, 
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(6, 182, 212, 0.95))',
                  position: 'relative',
                  zIndex: 1
                }}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
              >
                <Shield className="w-4 h-4 text-white group-hover:animate-pulse drop-shadow-lg" />
                <span className="text-white font-bold text-sm whitespace-nowrap magic-grid-text" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>ECE Licensed</span>
              </motion.div>

              {/* Feature Card 3 - Love */}
              <motion.div
                className="shrink-0 px-5 py-3 rounded-full border-2 border-white/30 shadow-xl flex items-center gap-2 pointer-events-auto group hover:scale-105 transition-transform magic-grid"
                style={{ 
                  ...gridPattern, 
                  background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.95), rgba(236, 72, 153, 0.95))',
                  position: 'relative',
                  zIndex: 1
                }}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
              >
                <Heart className="w-4 h-4 text-white group-hover:animate-bounce fill-white/50 drop-shadow-lg" />
                <span className="text-white font-bold text-sm whitespace-nowrap magic-grid-text" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Loving Community</span>
              </motion.div>

              {/* Feature Card 4 - Excellence */}
              <motion.div
                className="shrink-0 px-5 py-3 rounded-full border-2 border-white/30 shadow-xl flex items-center gap-2 pointer-events-auto group hover:scale-105 transition-transform magic-grid"
                style={{ 
                  ...gridPattern, 
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.95), rgba(249, 115, 22, 0.95))',
                  position: 'relative',
                  zIndex: 1
                }}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
              >
                <Star className="w-4 h-4 text-white group-hover:animate-spin fill-white/50 drop-shadow-lg" />
                <span className="text-white font-bold text-sm whitespace-nowrap magic-grid-text" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Since 2008</span>
              </motion.div>
            </div>
            
            {/* Duplicate marquee track for seamless loop */}
            <div 
              className="flex items-center gap-4 animate-marquee-infinite pr-4"
              style={{ width: 'max-content' }}
              aria-hidden="true"
            >
              {/* Feature Card 1 - Montessori (duplicate) */}
              <motion.div
                className="shrink-0 px-5 py-3 rounded-full border-2 border-white/30 shadow-xl flex items-center gap-2 pointer-events-auto group hover:scale-105 transition-transform magic-grid"
                style={{ 
                  ...gridPattern, 
                  background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.95), rgba(244, 63, 94, 0.95))',
                  position: 'relative',
                  zIndex: 1
                }}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
              >
                <Sparkles className="w-4 h-4 text-white group-hover:animate-spin drop-shadow-lg" />
                <span className="text-white font-bold text-sm whitespace-nowrap magic-grid-text" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Authentic Montessori</span>
              </motion.div>
              {/* Feature Card 2 - Safety (duplicate) */}
              <motion.div
                className="shrink-0 px-5 py-3 rounded-full border-2 border-white/30 shadow-xl flex items-center gap-2 pointer-events-auto group hover:scale-105 transition-transform magic-grid"
                style={{ 
                  ...gridPattern, 
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(6, 182, 212, 0.95))',
                  position: 'relative',
                  zIndex: 1
                }}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
              >
                <Shield className="w-4 h-4 text-white group-hover:animate-pulse drop-shadow-lg" />
                <span className="text-white font-bold text-sm whitespace-nowrap magic-grid-text" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>ECE Licensed</span>
              </motion.div>
              {/* Feature Card 3 - Love (duplicate) */}
              <motion.div
                className="shrink-0 px-5 py-3 rounded-full border-2 border-white/30 shadow-xl flex items-center gap-2 pointer-events-auto group hover:scale-105 transition-transform magic-grid"
                style={{ 
                  ...gridPattern, 
                  background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.95), rgba(236, 72, 153, 0.95))',
                  position: 'relative',
                  zIndex: 1
                }}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
              >
                <Heart className="w-4 h-4 text-white group-hover:animate-bounce fill-white/50 drop-shadow-lg" />
                <span className="text-white font-bold text-sm whitespace-nowrap magic-grid-text" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Loving Community</span>
              </motion.div>
              {/* Feature Card 4 - Excellence (duplicate) */}
              <motion.div
                className="shrink-0 px-5 py-3 rounded-full border-2 border-white/30 shadow-xl flex items-center gap-2 pointer-events-auto group hover:scale-105 transition-transform magic-grid"
                style={{ 
                  ...gridPattern, 
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.95), rgba(249, 115, 22, 0.95))',
                  position: 'relative',
                  zIndex: 1
                }}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
              >
                <Star className="w-4 h-4 text-white group-hover:animate-spin fill-white/50 drop-shadow-lg" />
                <span className="text-white font-bold text-sm whitespace-nowrap magic-grid-text" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Since 2008</span>
              </motion.div>
            </div>
            </div>
          </div>
        </div>

        <Link href="/#about" className="absolute bottom-8 sm:bottom-16 left-1/2 -translate-x-1/2 text-white hover:text-white text-xs uppercase tracking-widest font-bold flex flex-col items-center gap-1 z-20" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 4px 16px rgba(0,0,0,0.6)' }}>
          {t('home.hero.scrollToAbout')}
          <svg className="w-5 h-5 animate-bounce drop-shadow-2xl" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </Link>

        {/* Curved bottom edge - reference clone */}
        <div className="absolute bottom-0 left-0 right-0 w-full h-24 overflow-visible pointer-events-none" aria-hidden>
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full block">
            <path style={{ fill: 'var(--card)' }} d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" />
          </svg>
        </div>
      </section>

      <AboutSection />

      <ProgramsSection />

      {/* Gallery Section - Prominently placed for visual impact */}
      <GallerySectionContent />

      {/* Testimonials */}
      <TestimonialsMarquee />
      
      {/* Daily Videos Section - Moved up for more dynamic content */}
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

      <EnrollmentSectionContent />

      <ContactFormSection />
    </main>
  );
}
