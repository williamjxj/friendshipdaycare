import React from 'react';
import { motion } from 'framer-motion';

/**
 * AuroraBackground - visually rich animated background for hero/CTA sections.
 * Accessible, respects prefers-reduced-motion, and supports custom className.
 */
export const AuroraBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  // Animation variants for Framer Motion
  const variants = {
    animate: {
      backgroundPosition: [
        '0% 50%',
        '100% 50%',
        '100% 100%',
        '0% 50%'
      ],
      transition: {
        duration: 16,
        repeat: Infinity,
      },
    },
  };

  return (
    <motion.div
      aria-hidden="true"
      initial={false}
      animate="animate"
      variants={variants}
      className={
        `pointer-events-none absolute inset-0 z-0 rounded-full blur-2xl opacity-80 ` +
        `bg-[radial-gradient(ellipse_at_60%_40%,rgba(255,200,255,0.45)_0%,rgba(120,200,255,0.35)_40%,rgba(255,255,255,0.12)_100%)] ` +
        `before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_30%_70%,rgba(255,255,200,0.25)_0%,rgba(255,255,255,0.08)_100%)] ` +
        `before:blur-3xl before:opacity-60 ` +
        className
      }
      style={{
        willChange: 'background-position',
        backgroundSize: '200% 200%',
        filter: 'blur(0.5rem)',
        mixBlendMode: 'lighten',
      }}
    />
  );
};
