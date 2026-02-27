'use client';

import { useId } from 'react';
import { motion } from 'framer-motion';

interface ProcessStepConnectorProps {
  /** Direction: horizontal (between cards) or vertical (mobile stack) */
  direction?: 'horizontal' | 'vertical';
  /** Animate the connector on appear */
  animate?: boolean;
  className?: string;
}

/**
 * Animated dotted line / arrow connector between process steps.
 * Flowing dot animation (images-hub style).
 */
export function ProcessStepConnector({
  direction = 'horizontal',
  animate = true,
  className = '',
}: ProcessStepConnectorProps) {
  const isHorizontal = direction === 'horizontal';
  const gradientId = useId();

  const motionProps = animate
    ? {
        initial: { opacity: 0, scale: 0.5 } as const,
        whileInView: { opacity: 1, scale: 1 } as const,
        viewport: { once: true, margin: '-20px' } as const,
        transition: { duration: 0.5, delay: 0.2 },
      }
    : {};

  return (
    <motion.div
      className={`process-step-connector flex items-center justify-center shrink-0 ${className}`}
      {...motionProps}
      style={{
        width: isHorizontal ? 40 : 24,
        height: isHorizontal ? 24 : 40,
      }}
      aria-hidden
    >
      <svg
        viewBox="0 0 40 24"
        className={isHorizontal ? 'w-10 h-6' : 'w-6 h-10 rotate-90'}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Flowing dotted line */}
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
            <stop offset="50%" stopColor="var(--primary)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <line
          x1="0"
          y1="12"
          x2="40"
          y2="12"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
          strokeDasharray="4 6"
          strokeLinecap="round"
          className="connector-line-animate"
        />
        {/* Arrow head */}
        <path
          d="M34 6L40 12L34 18"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className="opacity-80"
        />
      </svg>
    </motion.div>
  );
}
