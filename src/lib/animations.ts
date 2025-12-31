/**
 * Animation utilities for common animation patterns
 * Uses GSAP and Framer Motion patterns
 */

import { Variants } from 'framer-motion';

/**
 * Framer Motion animation variants
 */

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

/**
 * Scroll-triggered animation variants
 */
export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

/**
 * GSAP animation configurations
 */
export const gsapConfig = {
  stagger: {
    default: {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    },
    fast: {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
    },
    slow: {
      y: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.3,
      ease: 'power3.out',
    },
  },
  scrollTrigger: {
    default: {
      trigger: null,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
    early: {
      trigger: null,
      start: 'top 90%',
      toggleActions: 'play none none reverse',
    },
    late: {
      trigger: null,
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
  },
};

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get animation duration based on user preference
 */
export function getAnimationDuration(baseDuration: number): number {
  return prefersReducedMotion() ? 0 : baseDuration;
}

/**
 * Common animation classes for Tailwind
 */
export const animationClasses = {
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  hover: 'transition-all duration-200 hover:scale-105',
  focus: 'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
};

