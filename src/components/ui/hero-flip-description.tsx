'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FLIP_INTERVAL_MS = 2800;

/**
 * Hero description with flip-over carousel animation.
 * Cycles through phrases with a 3D flip effect (images-hub-pim style).
 */
export function HeroFlipDescription({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (phrases.length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, FLIP_INTERVAL_MS);
    return () => clearInterval(id);
  }, [phrases.length]);

  const currentPhrase = phrases[index] ?? phrases[0];

  return (
    <h3
      className="text-base sm:text-lg md:text-xl lg:text-2xl font-normal text-white/90 leading-relaxed drop-shadow-md max-w-4xl mx-auto min-h-[2.5em] flex items-center justify-center [perspective:400px]"
      style={{
        fontFamily: 'var(--font-fredoka)',
        letterSpacing: '0.01em',
      }}
    >
      <span className="relative inline-block overflow-visible">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentPhrase}
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -90, opacity: 0 }}
            transition={{
              duration: 0.45,
              ease: [0.33, 1, 0.68, 1],
            }}
            className="inline-block origin-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {currentPhrase}
          </motion.span>
        </AnimatePresence>
      </span>
    </h3>
  );
}
