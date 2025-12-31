/**
 * MagicUI-inspired animation utilities
 * Provides reusable animation patterns for enhanced UI interactions
 */

import { Variants } from 'framer-motion';

/**
 * Text reveal animation - reveals text character by character
 */
export const textReveal: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

export const textRevealItem: Variants = {
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
 * Shimmer effect - creates a shimmering gradient animation
 */
export const shimmer = {
  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 2s infinite',
};

/**
 * Border beam effect - animated border with gradient
 */
export const borderBeam: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

/**
 * Grid pattern animation - animated grid background
 */
export const gridPattern = {
  backgroundImage: `
    linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
  `,
  backgroundSize: '40px 40px',
  animation: 'gridMove 20s linear infinite',
};

/**
 * Spotlight effect - creates a spotlight that follows cursor
 */
export const spotlight = {
  position: 'relative' as const,
  background: 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.1), transparent 50%)',
};

/**
 * Ripple effect - creates expanding ripple animation
 */
export const ripple: Variants = {
  hidden: { scale: 0, opacity: 0.8 },
  visible: {
    scale: 4,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

/**
 * Flip animation - 3D flip effect
 */
export const flip: Variants = {
  hidden: { rotateY: -90, opacity: 0 },
  visible: {
    rotateY: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

/**
 * Gradient border animation
 */
export const gradientBorder = {
  position: 'relative' as const,
  background: 'linear-gradient(var(--background), var(--background)) padding-box, linear-gradient(45deg, var(--primary), var(--secondary), var(--accent)) border-box',
  border: '2px solid transparent',
  borderRadius: 'var(--radius-lg)',
};

/**
 * Pulse glow effect
 */
export const pulseGlow: Variants = {
  hidden: { boxShadow: '0 0 0 0 rgba(var(--primary-rgb), 0.4)' },
  visible: {
    boxShadow: [
      '0 0 0 0 rgba(var(--primary-rgb), 0.4)',
      '0 0 0 10px rgba(var(--primary-rgb), 0)',
      '0 0 0 0 rgba(var(--primary-rgb), 0)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Stagger children animation (MagicUI variant)
 */
export const staggerContainerMagic: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/**
 * Scale in with fade (MagicUI variant)
 */
export const scaleInMagic: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

/**
 * Slide in from direction
 */
export const slideIn = (direction: 'left' | 'right' | 'up' | 'down' = 'up'): Variants => {
  const directions = {
    left: { x: -100 },
    right: { x: 100 },
    up: { y: 100 },
    down: { y: -100 },
  };

  return {
    hidden: { ...directions[direction], opacity: 0 },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };
};

/**
 * Rotate in animation
 */
export const rotateIn: Variants = {
  hidden: { rotate: -180, opacity: 0, scale: 0.8 },
  visible: {
    rotate: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

/**
 * Bounce in animation
 */
export const bounceIn: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};

/**
 * CSS Keyframes for animations
 */
export const animationKeyframes = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  @keyframes gridMove {
    0% { background-position: 0 0; }
    100% { background-position: 40px 40px; }
  }
`;

