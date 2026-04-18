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
import { motion, type Variants } from 'framer-motion';
import { getHeroMarqueeChips, HeroMarqueeChipRow } from '@/lib/hero-marquee-chips';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Sparkles, Heart, Star, PhoneCall, ArrowRight, BookOpen, Calendar, Mail } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { getImageUrl } from '@/lib/image-utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { businessProfile } from '@/lib/business-profile';
import { useLocalizedMetadata } from '@/lib/use-localized-metadata';
import { BorderBeam } from '@/components/ui/border-beam';
import { cn } from '@/lib/utils';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Dynamically import VideoPlayer
const VideoPlayer = dynamic(() => import('@/components/ui/VideoPlayer').then(mod => ({ default: mod.VideoPlayer })), { ssr: false });

/** Matches desktop header Book a Tour: `.warm-button` + gradient shine + lift/shadow (see Header.tsx). */
const heroInfoWarmChipBase = cn(
  'warm-button relative overflow-hidden group/cta shadow-md',
  'hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300',
  '!inline-flex !h-auto !min-h-0 !items-center !justify-start gap-3',
  '!rounded-xl !py-3 !px-4 text-sm leading-snug md:text-[0.9375rem]',
);

/**
 * Gradient hover layer — same structure/classes as the Book a Tour CTA.
 */
function HeroInfoWarmChipShine() {
  return (
    <div
      className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 transition-opacity duration-500 bg-[length:200%_auto] group-hover/cta:opacity-100 group-hover/cta:animate-[gradient_3s_linear_infinite]"
      aria-hidden
    />
  );
}

const heroInfoChipVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      when: 'beforeChildren',
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
};

const heroInfoIconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
};

/** Must define `hidden` so nested word items exit the initial opacity:0 state (empty {} breaks propagation in FM). */
const heroInfoWordsParentVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
  },
};

const heroInfoWordVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Staggered word (or single-line) reveal for hero info chips.
 */
function AnimatedHeroChipText({
  text,
  splitWords,
  className,
  tokenClassName,
}: {
  text: string;
  splitWords?: boolean;
  className?: string;
  tokenClassName?: string;
}) {
  const tokens = splitWords ? text.trim().split(/\s+/) : [text];
  return (
    <motion.span className={className} variants={heroInfoWordsParentVariants}>
      {tokens.map((token, i) => (
        <motion.span key={i} variants={heroInfoWordVariants} className={cn('inline-block', tokenClassName)}>
          {token}
        </motion.span>
      ))}
    </motion.span>
  );
}

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

  const heroMarqueeChips = useMemo(() => getHeroMarqueeChips(t), [t]);

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

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-start gap-4 md:gap-12 pt-4 pb-20 sm:pt-8 sm:pb-16 lg:pt-12 lg:pb-20">
          {/* Left Content Section - minimal on mobile: logo, h1, badge, CTAs */}
          <div className="min-w-0 flex-1 order-1 flex flex-col items-start mt-20 sm:mt-24 md:mt-8 w-full">
            {/* Badge - Enrollment Status with Download */}
            <motion.a
              href="/assets/Registration form 2026.pdf"
              download="Friendship-Corner-Daycare-Registration-2026.pdf"
              className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-2xl border-2 border-white/30 px-3 py-2.5 sm:rounded-full sm:px-6 sm:py-4 mb-3 sm:mb-4 cursor-pointer group relative shadow-2xl overflow-visible"
              style={{ background: 'none', backdropFilter: 'none' }}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
              title="Click to Download Enrollment Application Form"
            >
              <span className="relative flex h-2.5 w-2.5 z-10">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="relative z-10 min-w-0 text-xs sm:text-sm md:text-base font-extrabold text-white drop-shadow-lg tracking-wide uppercase" style={{ letterSpacing: '0.04em', textShadow: '0 2px 8px #000, 0 4px 16px #0006' }}>
                {t('home.hero.badge')}
              </span>
              <Download className="w-4 h-4 text-white group-hover:animate-bounce drop-shadow-lg relative z-10" />
            </motion.a>

            {/* Main Title with GSAP word animation */}
            <h1
              ref={heroTitleRef}
              className="w-full max-w-4xl text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-3 sm:mb-4"
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
              className="block text-sm sm:text-xl md:text-2xl mb-4 sm:mb-8 max-w-4xl font-semibold leading-relaxed w-full vivid-children-font"
              style={{ 
                color: '#ffffff',
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

            {/* Warm-button info chips (parity with header Book a Tour); sm+; data-testid for e2e */}
            <motion.div
              data-testid="hero-info-chips"
              className="mb-4 grid w-full max-w-5xl min-w-0 grid-cols-1 gap-3 sm:mb-5 sm:grid-cols-2 sm:items-stretch md:mb-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    delayChildren: 0.45,
                    staggerChildren: 0.07,
                  },
                },
              }}
            >
              <motion.div
                data-testid="hero-info-chip-address"
                className={cn(heroInfoWarmChipBase, 'min-h-0 min-w-0 w-full')}
                variants={heroInfoChipVariants}
              >
                <HeroInfoWarmChipShine />
                <motion.span className="relative z-10 shrink-0" variants={heroInfoIconVariants} aria-hidden>
                  <MapPin className="h-5 w-5 transition-transform group-hover/cta:rotate-12" strokeWidth={2.5} />
                </motion.span>
                <AnimatedHeroChipText
                  text={t('home.hero.address')}
                  splitWords
                  className="relative z-10 min-w-0 flex-1 text-pretty text-left font-bold leading-snug"
                  tokenClassName="mr-[0.18em] last:mr-0"
                />
              </motion.div>

              <motion.div
                data-testid="hero-info-chip-age"
                className={cn(heroInfoWarmChipBase, 'min-w-0 w-full')}
                variants={heroInfoChipVariants}
              >
                <HeroInfoWarmChipShine />
                <motion.span className="relative z-10 shrink-0" variants={heroInfoIconVariants} aria-hidden>
                  <BookOpen className="h-5 w-5 transition-transform group-hover/cta:rotate-12" strokeWidth={2.5} />
                </motion.span>
                <AnimatedHeroChipText
                  text={t('home.hero.ageRangeChip')}
                  splitWords={false}
                  className="relative z-10 min-w-0 flex-1 text-left font-bold"
                />
              </motion.div>

              <motion.a
                data-testid="hero-info-chip-phone"
                href={`tel:${businessProfile.telephone.replace(/\D/g, '')}`}
                className={cn(heroInfoWarmChipBase, 'min-w-0 w-full no-underline')}
                variants={heroInfoChipVariants}
                aria-label={t('contact.phone')}
              >
                <HeroInfoWarmChipShine />
                <motion.span className="relative z-10 shrink-0" variants={heroInfoIconVariants} aria-hidden>
                  <PhoneCall className="h-5 w-5 transition-transform group-hover/cta:rotate-12" strokeWidth={2.5} />
                </motion.span>
                <AnimatedHeroChipText
                  text={businessProfile.telephone}
                  splitWords={false}
                  className="relative z-10 min-w-0 flex-1 break-all text-left font-bold tabular-nums"
                />
              </motion.a>

              <motion.a
                data-testid="hero-info-chip-email"
                href={`mailto:${businessProfile.email}`}
                className={cn(heroInfoWarmChipBase, 'min-w-0 w-full max-w-full no-underline')}
                variants={heroInfoChipVariants}
                aria-label={t('contact.form.email')}
              >
                <HeroInfoWarmChipShine />
                <motion.span className="relative z-10 shrink-0" variants={heroInfoIconVariants} aria-hidden>
                  <Mail className="h-5 w-5 transition-transform group-hover/cta:rotate-12" strokeWidth={2.5} />
                </motion.span>
                <AnimatedHeroChipText
                  text={businessProfile.email}
                  splitWords={false}
                  className="relative z-10 min-w-0 max-w-full flex-1 break-all text-left font-bold"
                />
              </motion.a>
            </motion.div>

            {/* Hero CTA buttons (restored): wider + responsive */}
            <motion.div
              className="grid w-full min-w-0 max-w-6xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.a
                href={`tel:${businessProfile.telephone.replace(/\D/g, '')}`}
                className="group relative flex min-h-14 w-full min-w-0 items-center justify-between gap-3 overflow-hidden rounded-2xl border border-cyan-200/35 bg-[#0f1b2d]/88 px-4 py-3.5 text-white shadow-[0_14px_40px_rgba(2,6,23,0.42)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#13233a]/92 hover:shadow-cyan-500/20"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
                aria-label={t('home.hero.callNow')}
              >
                <span className="flex min-w-0 items-center gap-3 text-left text-base font-bold">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-400/20 ring-1 ring-cyan-200/60">
                    <PhoneCall className="h-4 w-4 text-cyan-100" aria-hidden />
                  </span>
                  <span className="truncate">{t('home.hero.callNow')}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-cyan-100 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </motion.a>

              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.99 }}>
                <Link
                  href="/#programs"
                  className="group relative flex min-h-14 w-full min-w-0 items-center justify-between gap-3 overflow-hidden rounded-2xl border border-orange-200/35 bg-zinc-900/85 px-4 py-3.5 text-white shadow-[0_14px_40px_rgba(2,6,23,0.42)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#13233a]/92 hover:shadow-orange-500/20"
                >
                  <span className="flex min-w-0 items-center gap-3 text-left text-base font-bold">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-400/20 ring-1 ring-orange-200/60">
                      <BookOpen className="h-4 w-4 text-orange-100" aria-hidden />
                    </span>
                    <span className="truncate">{t('home.hero.viewPrograms')}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-orange-100 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.99 }}>
                <Link
                  href="/#contact-form"
                  className="group relative flex min-h-14 w-full min-w-0 items-center justify-between gap-3 overflow-hidden rounded-2xl border border-fuchsia-200/35 bg-[#2a1638]/86 px-4 py-3.5 text-white shadow-[0_14px_40px_rgba(2,6,23,0.42)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#13233a]/92 hover:shadow-fuchsia-500/20"
                >
                  <span className="flex min-w-0 items-center gap-3 text-left text-base font-bold">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-fuchsia-400/20 ring-1 ring-fuchsia-200/60">
                      <Calendar className="h-4 w-4 text-fuchsia-100" aria-hidden />
                    </span>
                    <span className="truncate">{t('home.hero.scheduleTour')}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-fuchsia-100 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </Link>
              </motion.div>
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
              <HeroMarqueeChipRow
                chips={heroMarqueeChips}
                trackId="primary"
                listRef={marqueeRef}
              />
              <HeroMarqueeChipRow
                chips={heroMarqueeChips}
                trackId="duplicate"
                ariaHidden
              />
            </div>
          </div>
        </div>

        <Link href="/#about" className="absolute bottom-8 sm:bottom-16 left-1/2 hidden -translate-x-1/2 text-white hover:text-white text-xs uppercase tracking-widest font-bold sm:flex flex-col items-center gap-1 z-20" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 4px 16px rgba(0,0,0,0.6)' }}>
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
      
      {/* Daily Videos Section - hidden per request */}
      {/* 
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
      */}

      <EnrollmentSectionContent />

      <ContactFormSection />
    </main>
  );
}
