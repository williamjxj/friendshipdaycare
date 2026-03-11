/**
 * Magnetic Button Component Template
 * 
 * Button that follows cursor on hover with smooth spring physics.
 * Includes several variants:
 * - Basic magnetic effect
 * - With 3D rotation
 * - With ripple effect
 * - With background gradient
 * 
 * Usage:
 * <MagneticButton>Click Me</MagneticButton>
 */

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

// ============================================================================
// 1. Basic Magnetic Button
// ============================================================================

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

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'relative px-6 py-3 rounded-lg bg-primary text-primary-foreground',
        'font-semibold transition-colors hover:bg-primary/90',
        className
      )}
    >
      {children}
    </motion.button>
  );
}

// ============================================================================
// 2. Magnetic Button with 3D Rotation
// ============================================================================

export function MagneticButton3D({ 
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

  // 3D rotation based on position
  const rotateX = useTransform(ySpring, [-30, 30], [10, -10]);
  const rotateY = useTransform(xSpring, [-30, 30], [-10, 10]);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (shouldReduce || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ 
        x: xSpring, 
        y: ySpring,
        rotateX: shouldReduce ? 0 : rotateX,
        rotateY: shouldReduce ? 0 : rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: '1000px'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'relative px-6 py-3 rounded-lg bg-primary text-primary-foreground',
        'font-semibold transition-colors hover:bg-primary/90',
        className
      )}
    >
      {children}
    </motion.button>
  );
}

// ============================================================================
// 3. Magnetic Button with Gradient Follow
// ============================================================================

export function MagneticButtonGradient({ 
  children, 
  strength = 0.3,
  className = '',
  onClick 
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const shouldReduce = prefersReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  // Gradient that follows cursor
  const background = useMotionTemplate`
    radial-gradient(
      350px circle at ${mouseX}px ${mouseY}px,
      rgba(255, 255, 255, 0.15),
      transparent 80%
    )
  `;

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Magnetic pull
    if (!shouldReduce) {
      x.set((e.clientX - centerX) * strength);
      y.set((e.clientY - centerY) * strength);
    }

    // Gradient position
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'relative px-6 py-3 rounded-lg bg-primary text-primary-foreground',
        'font-semibold overflow-hidden',
        className
      )}
    >
      {/* Gradient overlay */}
      <motion.div
        style={{ background }}
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
      />
      
      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// ============================================================================
// 4. Magnetic Button with Ripple Effect
// ============================================================================

export function MagneticButtonRipple({ 
  children, 
  strength = 0.3,
  className = '',
  onClick 
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const shouldReduce = prefersReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rippleX = useMotionValue(0);
  const rippleY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    if (!shouldReduce) {
      x.set((e.clientX - centerX) * strength);
      y.set((e.clientY - centerY) * strength);
    }

    // Ripple position
    rippleX.set(e.clientX - rect.left);
    rippleY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'relative px-6 py-3 rounded-lg bg-primary text-primary-foreground',
        'font-semibold overflow-hidden',
        className
      )}
    >
      {/* Ripple effect */}
      <motion.span
        className="absolute w-4 h-4 bg-white/30 rounded-full pointer-events-none"
        style={{
          left: rippleX,
          top: rippleY,
          x: '-50%',
          y: '-50%'
        }}
        initial={{ scale: 0, opacity: 0.5 }}
        whileHover={{ scale: 10, opacity: 0 }}
        transition={{ duration: 0.6 }}
      />

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// ============================================================================
// Usage Examples
// ============================================================================

/*
// Basic magnetic:
<MagneticButton onClick={handleClick}>
  Click Me
</MagneticButton>

// 3D rotation:
<MagneticButton3D strength={0.4}>
  Hover Me
</MagneticButton3D>

// With gradient:
<MagneticButtonGradient>
  Gradient Effect
</MagneticButtonGradient>

// With ripple:
<MagneticButtonRipple>
  Ripple Effect
</MagneticButtonRipple>

// Custom styling:
<MagneticButton 
  strength={0.5}
  className="bg-accent text-accent-foreground"
  onClick={() => console.log('clicked')}
>
  Custom Colors
</MagneticButton>
*/
