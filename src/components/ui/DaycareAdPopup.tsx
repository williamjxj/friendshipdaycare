"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { fadeIn, scaleIn } from '@/lib/animations';
import { AnimationGeneratorType } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { getImageUrl } from '@/lib/image-utils';

// Animation variant for slide up effect
const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as AnimationGeneratorType, duration: 0.7 } },
};

// Popup media paths (R2 primary with local fallback)
const VIDEO_SRC = getImageUrl('/videos/enrollment-16x9.mp4');
const VIDEO_POSTER = getImageUrl('/videos/enrollment-poster.jpg');

const POPUP_KEY = 'daycare_ad_popup_closed_v2';
const POPUP_DELAY = 2000;

// Inject shimmer keyframes for MagicUI shiny button effect (only once)
function useInjectShimmerKeyframes() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const shimmerId = 'magicui-shimmer-keyframes';
    if (!document.getElementById(shimmerId)) {
      const style = document.createElement('style');
      style.id = shimmerId;
      style.innerHTML = `@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }`;
      document.head.appendChild(style);
    }
  }, []);
}

export default function DaycareAdPopup() {
  useInjectShimmerKeyframes();
  const t = useTranslations();

  // null = not yet decided (SSR), true = open, false = closed
  const [open, setOpen] = useState<null | boolean>(null);

  // Video play state — must be inside the component
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle play button click
  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const timer = setTimeout(() => setOpen(true), POPUP_DELAY);
    return () => clearTimeout(timer);
  }, []);

  // Pause video and reset on popup close
  useEffect(() => {
    if (!open && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsVideoPlaying(false);
    }
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    if (typeof window !== 'undefined') sessionStorage.setItem(POPUP_KEY, '1');
  };

  // Don't render anything until client decides (prevents hydration flash)
  if (open === null) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-9999 flex items-start justify-center overflow-y-auto bg-black/60 px-2 py-4 sm:items-center sm:px-4 sm:py-6"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={fadeIn}
          onClick={handleClose}
        >
          <motion.div
            className="relative mx-auto w-full max-w-[95vw] px-2 sm:max-w-xl sm:px-0 md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl"
            style={{ minWidth: 'min(95vw, 320px)' }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={scaleIn}
            onClick={e => e.stopPropagation()}
          >
            <Card variant="elevated" className="relative z-10 max-h-[min(92vh,980px)] overflow-y-auto rounded-3xl border-2 border-brand bg-white/95 p-0 shadow-2xl backdrop-blur-lg">
              <Button
                onClick={handleClose}
                variant="ghost"
                size="icon-lg"
                aria-label={t('common.close', { default: 'Close' })}
                className="sticky top-2 right-2 ml-auto z-30 mt-2 mr-2 bg-white/90 text-2xl text-muted-foreground shadow-sm hover:text-primary focus:z-40"
              >
                <span aria-hidden>✕</span>
              </Button>
              <div className="flex flex-col items-center gap-6 px-4 py-8 sm:px-10 relative z-10">
                {/* Logo and Title */}
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

                {/* Video box section */}
                <motion.div className="w-full flex flex-col md:flex-row gap-6 items-center justify-center" variants={slideUp}>
                  {/* Video Box */}
                  <div
                    className="w-full md:w-95 lg:w-120 aspect-video rounded-2xl overflow-hidden shadow-lg border-2 border-brand bg-black/80 flex items-center justify-center relative group cursor-pointer"
                    onClick={() => {
                      if (!isVideoPlaying) handlePlayVideo();
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label="Play daycare video"
                    onKeyDown={e => {
                      if (!isVideoPlaying && (e.key === 'Enter' || e.key === ' ')) handlePlayVideo();
                    }}
                  >
                    {!isVideoPlaying && (
                      <div
                        className="absolute inset-0 flex flex-col items-center justify-center w-full h-full bg-black/40 hover:bg-black/20 transition-colors duration-200 z-10"
                        style={{ pointerEvents: 'none' }}
                        aria-hidden="true"
                      >
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="drop-shadow-xl">
                          <circle cx="32" cy="32" r="32" fill="rgba(255,255,255,0.7)" />
                          <polygon points="26,20 48,32 26,44" fill="#d4af37" />
                        </svg>
                        <span className="mt-2 text-base font-semibold text-white drop-shadow-lg">Watch Video</span>
                      </div>
                    )}
                    <video
                      ref={videoRef}
                      src={VIDEO_SRC}
                      className="w-full h-full object-cover rounded-2xl"
                      controls={isVideoPlaying}
                      tabIndex={-1}
                      aria-label="Friendship Corner Daycare video"
                      poster={VIDEO_POSTER}
                      onEnded={() => setIsVideoPlaying(false)}
                      // Prevent click from bubbling to parent when already playing
                      onClick={e => { if (isVideoPlaying) e.stopPropagation(); }}
                    />
                  </div>

                  {/* Text content beside video */}
                  <div className="flex-1 flex flex-col gap-2 items-center md:items-start text-center md:text-left">
                    {/* Title and subtitle */}
                    <h1
                      className="text-base sm:text-lg md:text-xl lg:text-2xl font-display font-bold leading-[1.1] wrap-break-word tracking-tight mb-2"
                      style={{ fontFamily: 'var(--font-baloo)', fontSize: '3.75rem' }}
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
                    <p className="text-lg sm:text-xl text-muted-foreground font-semibold">
                      Are you looking for a safe, nurturing, and fun environment for your little ones? Look no further!
                    </p>
                    <p className="text-base sm:text-lg font-bold text-muted-foreground">We Accept Children Aged 2.5 – 5 Years Old</p>
                  </div>
                </motion.div>

                {/* Location, phone, email in a single row */}
                <div className="w-full flex flex-col sm:flex-row gap-4 justify-center items-stretch mt-2">
                  {/* <WobbleCard containerClassName="row-span-1"> */}
                    <div className="flex-1 flex flex-col items-center sm:items-start min-w-0">
                      <p className="font-bold text-sm text-foreground">📍 Location</p>
                      <p className="text-sm text-muted-foreground leading-tight">2950 Dewdney Trunk,<br />Coquitlam, BC V3C 2J4</p>
                    </div>
                  {/* </WobbleCard> */}
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
                <div className="mt-2 w-full">
                  <p className="text-lg sm:text-xl font-bold text-foreground mb-2">Why Choose Us?</p>
                  <ul className="list-disc list-inside text-base sm:text-lg text-muted-foreground space-y-1 pl-2">
                    <li>Licensed & experienced staff</li>
                    <li>Safe, engaging learning environment</li>
                    <li>Fun activities for social, emotional, and cognitive growth</li>
                    <li>Flexible hours for busy families</li>
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="pt-2 w-full flex flex-col items-center md:items-start">
                  <Button
                    asChild
                    size="lg"
                    className="w-full sm:w-auto px-8 text-base font-bold shadow-md relative overflow-hidden group"
                  >
                    <a
                      href="/assets/Registration form 2026.doc"
                      download="Friendship-Corner-Daycare-Registration-2026.doc"
                      tabIndex={0}
                      className="relative z-10 flex items-center gap-2"
                    >
                      <CheckCircle className="size-5 text-green-600 shrink-0" aria-hidden="true" />
                      Secure Your spot today, Download Registration Form!
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 z-20"
                        style={{
                          background: 'linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.25) 40%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.25) 60%, transparent 100%)',
                          backgroundSize: '200% 100%',
                          animation: 'shimmer 2.5s linear infinite',
                          mixBlendMode: 'lighten',
                          opacity: 0.7,
                          borderRadius: 'inherit',
                        }}
                      />
                    </a>
                  </Button>
                  <p className="mt-2 text-xs text-muted-foreground text-center md:text-left">Spaces are limited—don't wait!</p>
                </div>

              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
