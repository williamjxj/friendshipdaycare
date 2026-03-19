// Magnetic Button implementation for lively feedback
// Copied and adapted from web-animations skill asset

'use client';

import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform,
  useMotionTemplate 
} from 'framer-motion';
import { useRef, MouseEvent, ReactNode } from 'react';
import { prefersReducedMotion } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number; // 0.3 = subtle, 0.5 = medium, 0.8 = strong
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({ 
  children, 
  strength = 0.3,
  className = '',
  onClick 
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const shouldReduce = prefersReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (shouldReduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    x.set(deltaX * strength);
    y.set(deltaY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className={cn("magnetic-btn", className)}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      tabIndex={0}
      type="button"
    >
      {children}
    </motion.button>
  );
}
