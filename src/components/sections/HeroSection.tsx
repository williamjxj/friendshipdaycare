'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { scaleInMagic, slideIn, staggerContainerMagic } from '@/lib/magicui-animations';

/**
 * Hero section with animated headline and CTAs.
 */
export function HeroSection() {
  const { t } = useLanguage();
  const slideUp = slideIn('up');

  return (
    <div className="relative grid place-items-center w-full min-h-[90vh] bg-muted overflow-hidden">
      {/* Background Image & Overlay (DaisyUI .hero-overlay equivalent) */}
      <div className="absolute inset-0 z-0 grid place-items-center w-full h-full">
        <Image
          src="/hero-bg.svg"
          alt="Daycare background"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/80 via-background/60 to-background/90" />
      </div>

      {/* Main Content (DaisyUI .hero-content text-center equivalent) */}
      <div className="relative z-10 w-full max-w-4xl p-4 flex flex-col items-center justify-center gap-8 text-center">
        <motion.div
          variants={staggerContainerMagic}
          initial="hidden"
          animate="visible"
          className="w-full max-w-4xl mx-auto flex flex-col gap-6"
        >
          {/* Badge */}
          <motion.div variants={scaleInMagic} className="flex justify-center">
            <span className="inline-block py-2 px-4 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide uppercase border border-primary/20">
              Licensed Montessori Daycare in Coquitlam
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={slideUp}
            className={cn(
              "text-5xl md:text-6xl lg:text-7xl font-bold",
              "text-foreground leading-tight tracking-tight drop-shadow-sm"
            )}
          >
            {t('hero.title')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={slideUp}
            className="text-xl md:text-2xl text-muted-foreground leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Buttons - DaisyUI .btn equivalents */}
          <motion.div
            variants={slideUp}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-2"
          >
            <Link
              href="/contact#contact-form"
              className={cn(
                "inline-flex items-center justify-center h-14 px-8",
                "rounded-lg font-bold text-lg transition-all duration-200",
                "bg-primary text-primary-foreground shadow-lg",
                "hover:brightness-110 hover:shadow-xl active:scale-95"
              )}
            >
              {t('hero.enrollNow')}
            </Link>

            <Link
              href="/about"
              className={cn(
                "inline-flex items-center justify-center h-14 px-8",
                "rounded-lg font-bold text-lg transition-all duration-200",
                "bg-transparent border-2 border-primary text-primary",
                "hover:bg-primary/5 active:scale-95"
              )}
            >
              {t('hero.cta')}
            </Link>
          </motion.div>

          {/* Trust Indicators - Simple Stats grid */}
          <motion.div
            variants={scaleInMagic}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center w-full"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold">✓</div>
              <div className="flex flex-col">
                <span className="font-bold text-foreground">Licensed Care</span>
                <span className="text-sm text-muted-foreground">Government approved</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary text-xl font-bold">M</div>
              <div className="flex flex-col">
                <span className="font-bold text-foreground">Montessori</span>
                <span className="text-sm text-muted-foreground">Child-centered</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent-foreground text-xl font-bold">16</div>
              <div className="flex flex-col">
                <span className="font-bold text-foreground">Est. 2008</span>
                <span className="text-sm text-muted-foreground">Trusted care</span>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
      >
        <div className="w-5 h-8 border-2 border-foreground/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-foreground/30 rounded-full" />
        </div>
      </motion.div>
    </div>
  );
}
