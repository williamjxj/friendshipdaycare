"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { fadeIn, slideUp, scaleIn } from '@/lib/animations';

const LOGO_IMAGE = '/daycare-logo.png';
const POPUP_KEY = 'daycare_ad_popup_closed_v2';
const POPUP_DELAY = 2000;


export default function DaycareAdPopup() {
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
            className="relative w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={scaleIn}
            onClick={e => e.stopPropagation()}
          >
            <Card variant="elevated" className="relative p-0 overflow-visible shadow-2xl rounded-2xl bg-card/95 backdrop-blur-lg border border-border">
              <Button
                onClick={handleClose}
                variant="ghost"
                size="icon-lg"
                aria-label="Close"
                className="absolute top-4 right-4 z-10 text-2xl text-muted-foreground hover:text-primary"
              >
                <span aria-hidden>✕</span>
              </Button>
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 p-6 sm:p-10">
                {/* Left: Logo and highlight */}
                <motion.div className="flex flex-col items-center md:items-start gap-4 md:w-1/3" variants={slideUp}>
                  <div className="w-24 h-24 sm:w-28 sm:h-28 relative rounded-full border-4 border-primary/30 shadow-lg overflow-hidden bg-white">
                    <Image
                      src={LOGO_IMAGE}
                      alt="Friendship Corner Daycare Logo"
                      fill
                      sizes="112px"
                      style={{ objectFit: 'contain' }}
                      priority
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">🌸 Friendship Corner Montessori Daycare 🌸</p>
                    <h1
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.1] drop-shadow-2xl break-words tracking-tight mb-2"
                      style={{ fontFamily: 'var(--font-baloo)' }}
                    >
                      <span className="block mb-2">
                        <span
                          style={{
                            backgroundImage:
                              'linear-gradient(135deg, rgb(184, 134, 11) 0%, rgb(205, 133, 63) 20%, rgb(212, 175, 55) 40%, rgb(255, 215, 0) 50%, rgb(212, 175, 55) 60%, rgb(205, 133, 63) 80%, rgb(184, 134, 11) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            color: 'transparent',
                          }}
                        >
                          Now Enrolling for
                        </span>{' '}
                        <span style={{ color: 'white' }}>September!</span>
                      </span>
                    </h1>
                    <p className="text-sm font-medium text-muted-foreground">Ages 2.5 – 5 years</p>
                  </div>
                </motion.div>
                {/* Right: Details */}
                <motion.div className="flex-1 space-y-4" variants={slideUp}>
                  <p className="text-base text-muted-foreground font-medium">
                    Are you looking for a safe, nurturing, and fun environment for your little ones? Look no further!
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="font-bold text-sm text-foreground">📍 Location</p>
                      <p className="text-sm text-muted-foreground leading-tight">2950 Dewdney Trunk,<br />Coquitlam, BC V3C 2J4</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-sm text-foreground">📞 Call Us</p>
                      <p className="text-sm text-muted-foreground leading-tight">604-945-8504</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-sm text-foreground">📧 Email</p>
                      <p className="text-sm text-muted-foreground leading-tight break-all">friendship.care@live.ca</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-foreground mb-2">Why Choose Us?</p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-2">
                      <li>Licensed & experienced staff</li>
                      <li>Safe, engaging learning environment</li>
                      <li>Fun activities for social, emotional, and cognitive growth</li>
                      <li>Flexible hours for busy families</li>
                    </ul>
                  </div>
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