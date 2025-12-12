'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';


export function HeroSection() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-muted">
      {/* Background Image - High Quality, somewhat desaturated or warm overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.svg" // Ideally this should be a real photo of the center
          alt="Daycare background"
          fill
          className="object-cover opacity-30"
          priority
        />
        {/* Warm Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase mb-4">
              Licensed Montessori Daycare in Coquitlam
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className={cn(
              "text-4xl md:text-6xl lg:text-7xl font-bold",
              "text-foreground leading-tight tracking-tight"
            )}
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className={cn(
              "text-xl md:text-2xl text-muted-foreground",
              "w-full max-w-2xl mx-auto leading-relaxed"
            )}
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <Link
              href="/contact"
              className="warm-button shadow-lg hover:shadow-xl text-lg px-8 py-4"
            >
              {t('hero.enrollNow')}
            </Link>

            <Link
              href="/about"
              className="warm-button-secondary text-lg px-8 py-4 bg-white/50 backdrop-blur-sm"
            >
              {t('hero.cta')}
            </Link>
          </motion.div>

          {/* Trust Indicators - Clean & Professional */}
          <motion.div
            variants={itemVariants}
            className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 text-left md:text-center"
          >
            <div className="flex flex-col md:items-center space-y-2">
              <div className="flex items-center md:justify-center p-3 bg-white rounded-full shadow-sm w-12 h-12 mx-auto mb-2 md:mb-0">
                <span className="text-primary text-xl font-bold">✓</span>
              </div>
              <h3 className="font-bold text-foreground">Licensed Care</h3>
              <p className="text-sm text-muted-foreground">Fully government licensed & approved facility.</p>
            </div>

            <div className="flex flex-col md:items-center space-y-2">
              <div className="flex items-center md:justify-center p-3 bg-white rounded-full shadow-sm w-12 h-12 mx-auto mb-2 md:mb-0">
                <span className="text-secondary text-xl font-bold">M</span>
              </div>
              <h3 className="font-bold text-foreground">Montessori Method</h3>
              <p className="text-sm text-muted-foreground">Child-centered educational approach.</p>
            </div>

            <div className="flex flex-col md:items-center space-y-2">
              <div className="flex items-center md:justify-center p-3 bg-white rounded-full shadow-sm w-12 h-12 mx-auto mb-2 md:mb-0">
                <span className="text-accent-foreground text-xl font-bold">16</span>
              </div>
              <h3 className="font-bold text-foreground">Established 2008</h3>
              <p className="text-sm text-muted-foreground">Over a decade of trusted childcare.</p>
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
    </section>
  );
}
