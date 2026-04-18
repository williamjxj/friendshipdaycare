'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const auroraPalettes = {
  sunrise: ['#f97316', '#fbbf24', '#fb7185'],
  coastal: ['#22d3ee', '#2563eb', '#7c3aed'],
  forest: ['#84cc16', '#22c55e', '#0f766e'],
};

const blobLayout = [
  { top: '-25%', left: '-5%', size: '55vw' },
  { top: '5%', right: '-15%', size: '60vw' },
  { bottom: '-30%', left: '15%', size: '45vw' },
];

type AuroraBackgroundProps = {
  className?: string;
  palette?: keyof typeof auroraPalettes;
  blur?: number;
  animate?: boolean;
};

/**
 * Animated aurora wash used behind hero + feature sections.
 */
export function AuroraBackground({
  className,
  palette = 'sunrise',
  blur = 120,
  animate = true,
}: AuroraBackgroundProps) {
  const colors = auroraPalettes[palette] ?? auroraPalettes.sunrise;

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden [mask-image:radial-gradient(circle_at_center,white,transparent_85%)]',
        className,
      )}
    >
      {colors.map((color, index) => {
        const layout = blobLayout[index] ?? blobLayout[0];
        return (
          <motion.span
            key={`${color}-${index}`}
            className="fdc-aurora-blob absolute aspect-square rounded-full opacity-70"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${color}, transparent 65%)`,
              width: layout.size,
              height: layout.size,
              top: layout.top,
              right: layout.right,
              bottom: layout.bottom,
              left: layout.left,
              filter: `blur(${blur}px)`,
            }}
            animate={
              animate
                ? {
                    opacity: [0.45, 0.8, 0.55],
                    scale: [1, 1.08, 1],
                    x: [0, 25, -15, 0],
                    y: [0, -35, 10, 0],
                  }
                : undefined
            }
            transition={{
              duration: 18 + index * 3,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
          />
        );
      })}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/20 to-background" />
    </div>
  );
}
