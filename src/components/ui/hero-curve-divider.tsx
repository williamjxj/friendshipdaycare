'use client';

import { cn } from '@/lib/utils';

interface HeroCurveDividerProps {
  className?: string;
  color?: string; // Fill color, usually matches the background of the next section
  height?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Curved divider for the bottom of hero sections
 * Creates a dynamic, wave-like curve for visual appeal
 */
export function HeroCurveDivider({
  className,
  color = 'fill-card', // Default to card color (white) to match next section
  height = 'lg',
}: HeroCurveDividerProps) {
  const heightClasses = {
    sm: 'h-8 md:h-12',
    md: 'h-12 md:h-16',
    lg: 'h-16 md:h-24',
    xl: 'h-24 md:h-32',
  };

  return (
    <div
      className={cn(
        'absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] z-30 pointer-events-none scale-y-[1.02] origin-bottom will-change-transform',
        heightClasses[height],
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={cn('relative block w-full h-full', heightClasses[height])}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Large, smooth wave curve - more pronounced for dynamic visibility */}
        <path
          d="M0,100 C360,20 720,20 1080,60 C1260,80 1380,80 1440,70 L1440,120 L0,120 Z"
          className={cn(color)}
        />
      </svg>
    </div>
  );
}

