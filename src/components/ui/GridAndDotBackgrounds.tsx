// src/components/ui/GridAndDotBackgrounds.tsx
// Aceternity-style grid/dot backgrounds: CSS patterns + motion (viewport or hover-driven)

import React, { useEffect, useState } from 'react';
import {
  motion,
  useReducedMotion,
  useAnimationControls,
  type HTMLMotionProps,
} from 'framer-motion';
import { cn } from '@/lib/utils';

export type GridDotBgType = 'grid' | 'grid-small' | 'dot' | 'dot-fine';

/** Distinct slow keyframe paths — each section can pick a different preset for variety */
export type GridDotAnimationPreset =
  | 'drift-ne'
  | 'drift-sw'
  | 'pan-wide'
  | 'orbit-soft'
  | 'drift-vertical';

/** When `hover`, animation runs only while the pointer is over the section (slow); stops on leave. */
export type GridDotInteraction = 'viewport' | 'hover';

const patternClassMap: Record<GridDotBgType, string> = {
  grid: 'fdc-bg-pattern-grid',
  'grid-small': 'fdc-bg-pattern-grid-small',
  dot: 'fdc-bg-pattern-dot',
  'dot-fine': 'fdc-bg-pattern-dot-fine',
};

const defaultBgSize: Record<GridDotBgType, string> = {
  grid: '40px 40px',
  'grid-small': '24px 24px',
  dot: '32px 32px',
  'dot-fine': '20px 20px',
};

/** Loop length when using scroll-into-view mode (seconds, random per instance). */
export const GRID_DOT_LOOP_DURATION_MIN_SEC = 4;
export const GRID_DOT_LOOP_DURATION_MAX_SEC = 10;

/** Slower loop while pointer is over the section (seconds, random each time hover starts). */
export const GRID_DOT_HOVER_LOOP_MIN_SEC = 24;
export const GRID_DOT_HOVER_LOOP_MAX_SEC = 48;

/**
 * Random duration in [min, max] for viewport mode.
 */
export function randomGridDotLoopDurationSeconds(
  minSec = GRID_DOT_LOOP_DURATION_MIN_SEC,
  maxSec = GRID_DOT_LOOP_DURATION_MAX_SEC
): number {
  const secs = minSec + Math.random() * (maxSec - minSec);
  return Math.floor(secs);
}

function randomHoverLoopDurationSeconds(): number {
  return (
    GRID_DOT_HOVER_LOOP_MIN_SEC +
    Math.floor(Math.random() * (GRID_DOT_HOVER_LOOP_MAX_SEC - GRID_DOT_HOVER_LOOP_MIN_SEC + 1))
  );
}

const presetKeyframes: Record<
  GridDotAnimationPreset,
  { positions: string[]; ease: 'linear' | 'easeInOut' }
> = {
  'drift-ne': {
    positions: ['0% 0%', '22% 14%', '8% 6%', '0% 0%'],
    ease: 'easeInOut',
  },
  'drift-sw': {
    positions: ['0% 0%', '-18% 12%', '12% -10%', '0% 0%'],
    ease: 'easeInOut',
  },
  'pan-wide': {
    positions: ['0% 0%', '28% 0%', '-12% 8%', '0% 0%'],
    ease: 'linear',
  },
  'orbit-soft': {
    positions: ['0% 0%', '16% 12%', '-14% 18%', '10% -6%', '0% 0%'],
    ease: 'easeInOut',
  },
  'drift-vertical': {
    positions: ['0% 0%', '6% 32%', '-4% 18%', '0% 0%'],
    ease: 'easeInOut',
  },
};

export interface GridAndDotBackgroundsProps {
  type?: GridDotBgType;
  /** Visual motion path when in view */
  animationPreset?: GridDotAnimationPreset;
  /** Master switch (e.g. respect reduced motion). */
  animate?: boolean;
  className?: string;
  children?: React.ReactNode;
  backdropOnly?: boolean;
  dotVignette?: boolean;
  dotVignetteClassName?: string;
  /** `hover` = slow drift only while pointer is over section; stops on mouse out. */
  interaction?: GridDotInteraction;
  /** Required for `interaction="hover"` — from `useSectionGridDotHover()`. */
  isSectionHovered?: boolean;
}

/**
 * Attach to the same section that contains the backdrop so hover covers content + background.
 */
export function useSectionGridDotHover(): {
  isSectionHovered: boolean;
  gridDotSectionHoverProps: Pick<
    HTMLMotionProps<'section'>,
    'onPointerEnter' | 'onPointerLeave'
  >;
} {
  const [isSectionHovered, setSectionHovered] = useState(false);
  return {
    isSectionHovered,
    gridDotSectionHoverProps: {
      onPointerEnter: () => setSectionHovered(true),
      onPointerLeave: () => setSectionHovered(false),
    },
  };
}

/**
 * Animated grid or dot background.
 * Default: **hover** — moves slowly only while pointer is over the section; **stops** on pointer leave.
 */
export function GridAndDotBackgrounds({
  type = 'grid',
  animationPreset = 'drift-ne',
  animate = true,
  className = '',
  children,
  backdropOnly = false,
  dotVignette = false,
  dotVignetteClassName = 'bg-background',
  interaction = 'hover',
  isSectionHovered = false,
}: GridAndDotBackgroundsProps) {
  const prefersReducedMotion = useReducedMotion();
  const allowMotion = animate && !prefersReducedMotion;
  const { positions, ease } = presetKeyframes[animationPreset];
  const isHoverMode = interaction === 'hover';

  const controls = useAnimationControls();

  const [loopDurationSec, setLoopDurationSec] = useState(
    (GRID_DOT_LOOP_DURATION_MIN_SEC + GRID_DOT_LOOP_DURATION_MAX_SEC) / 2
  );

  useEffect(() => {
    if (isHoverMode) return;
    queueMicrotask(() => setLoopDurationSec(randomGridDotLoopDurationSeconds()));
  }, [isHoverMode]);

  useEffect(() => {
    if (!isHoverMode || !allowMotion) {
      void controls.stop();
      return;
    }
    if (!isSectionHovered) {
      void controls.stop();
      return;
    }
    const duration = randomHoverLoopDurationSeconds();
    void controls.start({
      backgroundPosition: positions,
      transition: {
        duration,
        repeat: Infinity,
        ease,
      },
    });
    return () => {
      void controls.stop();
    };
  }, [
    isHoverMode,
    allowMotion,
    isSectionHovered,
    positions,
    ease,
    controls,
  ]);

  const bgSize = defaultBgSize[type];
  const showDotVignette = dotVignette && (type === 'dot' || type === 'dot-fine');

  const layerClassName = cn(
    'pointer-events-none',
    patternClassMap[type],
    'absolute inset-0 z-0',
    backdropOnly && className
  );

  const viewportLayer = (
    <motion.div
      aria-hidden
      className={layerClassName}
      style={{ backgroundSize: bgSize }}
      initial={{ backgroundPosition: '0% 0%' }}
      {...(allowMotion
        ? {
            whileInView: { backgroundPosition: positions },
            transition: {
              duration: loopDurationSec,
              repeat: Infinity,
              ease,
            },
            viewport: { once: false, amount: 0.15, margin: '0px 0px -8% 0px' },
          }
        : {})}
    />
  );

  const hoverLayer = (
    <motion.div
      aria-hidden
      className={layerClassName}
      style={{ backgroundSize: bgSize }}
      initial={{ backgroundPosition: '0% 0%' }}
      animate={controls}
    />
  );

  const layer = isHoverMode ? hoverLayer : viewportLayer;

  const vignetteLayer =
    showDotVignette ? (
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 z-1 mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]',
          dotVignetteClassName
        )}
      />
    ) : null;

  if (backdropOnly) {
    return (
      <>
        {layer}
        {vignetteLayer}
      </>
    );
  }

  return (
    <div className={cn('relative', className)}>
      {layer}
      {vignetteLayer}
      {children != null ? <div className="relative z-10">{children}</div> : null}
    </div>
  );
}

/**
 * Maps homepage sections → Aceternity’s 3 pattern families ([grid / grid-small / dot](https://ui.aceternity.com/components/grid-and-dot-backgrounds)).
 * Six sections use backdrops: split **2 + 2 + 2** (no majority on dots).
 */
export const sectionGridDotPresets = {
  about: {
    type: 'grid' as const,
    animationPreset: 'drift-ne' as const,
    dotVignette: false as const,
  },
  programs: {
    type: 'grid-small' as const,
    animationPreset: 'drift-sw' as const,
    dotVignette: false as const,
  },
  gallery: {
    type: 'dot-fine' as const,
    animationPreset: 'orbit-soft' as const,
    dotVignette: true as const,
    dotVignetteClassName: 'bg-card',
  },
  enrollment: {
    type: 'grid' as const,
    animationPreset: 'pan-wide' as const,
    dotVignette: false as const,
  },
  contactForm: {
    type: 'dot-fine' as const,
    animationPreset: 'drift-vertical' as const,
    dotVignette: true as const,
    dotVignetteClassName: 'bg-card',
  },
  contactInfo: {
    type: 'grid-small' as const,
    animationPreset: 'drift-ne' as const,
    dotVignette: false as const,
  },
} as const;
