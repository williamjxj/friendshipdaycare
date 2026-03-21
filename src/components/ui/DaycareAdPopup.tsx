"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { fadeIn, scaleIn } from '@/lib/animations';

// Animation variant for slide up effect
import { AnimationGeneratorType } from 'framer-motion';
const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as AnimationGeneratorType, duration: 0.7 } },
};
import { AuroraBackground } from '@/components/ui/aurora-background';
import { useTranslations } from 'next-intl';

// const LOGO_IMAGE = '/logo.png';
// const REGISTRATION_FORM = '/assets/Registration form 2026.doc';
const POPUP_KEY = 'daycare_ad_popup_closed_v2';
const POPUP_DELAY = 2000;


export default function DaycareAdPopup() {
  const t = useTranslations();
  // null = not yet decided (SSR), true = open, false = closed
  const [open, setOpen] = useState<null | boolean>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Always show on every page load (remove sessionStorage check)
    const timer = setTimeout(() => setOpen(true), POPUP_DELAY);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
    // Optionally: set sessionStorage for manual testing, but not used for gating
    if (typeof window !== 'undefined') sessionStorage.setItem(POPUP_KEY, '1');
  };

  // Don't render anything until client decides (prevents hydration flash)
  if (open === null) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 px-2 sm:px-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={fadeIn}
          onClick={handleClose}
        >
          <motion.div
            className="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl mx-auto"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={scaleIn}
            onClick={e => e.stopPropagation()}
          >
            {/* AuroraBackground moved behind Card for correct stacking */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <AuroraBackground className="rounded-3xl" />
            </div>
            <Card variant="elevated" className="relative p-0 overflow-visible shadow-2xl rounded-3xl bg-white/95 backdrop-blur-lg border-2 border-brand z-10">
              <Button
                onClick={handleClose}
                variant="ghost"
                size="icon-lg"
                aria-label={t('common.close', { default: 'Close' })}
                className="absolute top-4 right-4 z-20 text-2xl text-muted-foreground hover:text-primary focus:z-30"
              >
                <span aria-hidden>✕</span>
              </Button>
              <div className="flex flex-col items-center gap-4 px-4 py-8 sm:px-10 relative z-10">
                {/* Logo and Title (reused from Header) */}
                <div className="shrink-0 min-w-fit flex items-center justify-center mb-2">
                  <Link href="/" className="flex items-center gap-0.5 min-w-0">
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 shrink-0 transition-transform duration-300 flex items-center">
                      <Image
                        src={"/logo.png"}
                        alt="Friendship Corner Daycare"
                        fill
                        sizes="(max-width: 640px) 160px, 200px"
                        className="object-contain"
                        priority
                        unoptimized
                      />
                    </div>
                    <div className="flex flex-col justify-center min-w-0 w-full h-full group">
                      <span className="font-display font-bold text-base sm:text-lg md:text-xl text-primary leading-tight group-hover:text-secondary transition-colors duration-300 whitespace-nowrap w-full">
                        Friendship Corner
                      </span>
                      <span className="text-[0.48rem] sm:text-[0.6rem] md:text-[0.7rem] text-primary/80 uppercase tracking-[0.18em] font-semibold leading-tight whitespace-nowrap w-full">
                        Montessori Daycare
                      </span>
                    </div>
                  </Link>
                </div>
                {/* New top section with motion and updated layout */}
                <motion.div className="flex-1 space-y-4" variants={slideUp}>
                  {/* Title and subtitle */}
                  <div className="text-center md:text-left">
                    <h1
                      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold leading-[1.1] wrap-break-word tracking-tight mb-2"
                      style={{ fontFamily: 'var(--font-baloo)' }}
                    >
                      <span className="block mb-2">
                        <span
                          className="drop-shadow-2xl"
                          style={{
                            backgroundImage:
                              'linear-gradient(135deg, rgb(184, 134, 11) 0%, rgb(205, 133, 63) 20%, rgb(212, 175, 55) 40%, rgb(255, 215, 0) 50%, rgb(212, 175, 55) 60%, rgb(205, 133, 63) 80%, rgb(184, 134, 11) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            color: 'transparent',
                          }}
                        >
                          Now Enrolling for September!
                        </span>
                      </span>
                    </h1>
                  </div>
                  {/* Intro text */}
                  <p className="text-lg sm:text-xl text-muted-foreground font-semibold">
                    Are you looking for a safe, nurturing, and fun environment for your little ones? Look no further!
                  </p>
                  {/* Subtitle moved here */}
                  <p className="text-base sm:text-lg font-bold text-muted-foreground">We Accept Children Aged 2.5 – 5 Years Old</p>
                  {/* Location, phone, email in a single row */}
                  <div className="w-full flex flex-col sm:flex-row gap-4 justify-center items-stretch">
                    <div className="flex-1 flex flex-col items-center sm:items-start min-w-0">
                      <p className="font-bold text-sm text-foreground">📍 Location</p>
                      <p className="text-sm text-muted-foreground leading-tight">2950 Dewdney Trunk,<br />Coquitlam, BC V3C 2J4</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center sm:items-start min-w-0">
                      <p className="font-bold text-sm text-foreground">📞 Call Us</p>
                      <p className="text-sm text-muted-foreground leading-tight">604-945-8504</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center sm:items-start min-w-0">
                      <p className="font-bold text-sm text-foreground">📧 Email</p>
                      <p className="text-sm text-muted-foreground leading-tight break-all">friendship.care@live.ca</p>
                    </div>
                  </div>
                  {/* Why Choose Us */}
                  <div>
                    <p className="text-lg sm:text-xl font-bold text-foreground mb-2">Why Choose Us?</p>
                    <ul className="list-disc list-inside text-base sm:text-lg text-muted-foreground space-y-1 pl-2">
                      <li>Licensed & experienced staff</li>
                      <li>Safe, engaging learning environment</li>
                      <li>Fun activities for social, emotional, and cognitive growth</li>
                      <li>Flexible hours for busy families</li>
                    </ul>
                  </div>
                  {/* CTA Button */}
                  <div className="pt-2">
                    <Button
                      asChild
                      size="lg"
                      className="w-full sm:w-auto px-8 text-base font-bold shadow-md"
                    >
                      <a href="mailto:friendship.care@live.ca?subject=Daycare%20Enrollment%20Inquiry" tabIndex={0}>
                        Secure Your Spot Today
                      </a>
                    </Button>
                    <p className="mt-2 text-xs text-muted-foreground text-center sm:text-left">Spaces are limited—don't wait!</p>
                  </div>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}