/**
 * Scroll Reveal Component Templates
 * 
 * Ready-to-use components for scroll-triggered animations including:
 * - FadeInUp: Fades in while sliding up
 * - StaggerList: Animates list items sequentially
 * - ScrollProgress: Shows reading progress
 * - ParallaxSection: Creates depth with parallax effect
 * 
 * All components respect reduced motion preferences.
 */

'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { prefersReducedMotion } from '@/lib/animations';

// ============================================================================
// 1. Fade In Up on Scroll
// ============================================================================

interface FadeInUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function FadeInUp({ children, delay = 0, className = '' }: FadeInUpProps) {
  const shouldReduce = prefersReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: shouldReduce ? 0 : 0.6, 
        delay: shouldReduce ? 0 : delay,
        ease: 'easeOut'
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// 2. Stagger List Animation
// ============================================================================

interface StaggerListProps {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
}

export function StaggerList({ 
  children, 
  className = '',
  staggerDelay = 0.1 
}: StaggerListProps) {
  const shouldReduce = prefersReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduce ? 0 : staggerDelay,
        delayChildren: shouldReduce ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduce ? 0 : 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={className}
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// ============================================================================
// 3. Scroll Progress Bar
// ============================================================================

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
      style={{ scaleX }}
    />
  );
}

// ============================================================================
// 4. Section Progress Indicator
// ============================================================================

interface SectionProgressProps {
  sections: string[];
}

export function SectionProgress({ sections }: SectionProgressProps) {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 
      hidden md:flex flex-col gap-3">
      {sections.map((section, i) => {
        const progress = i / sections.length;
        const isActive = scrollYProgress.get() >= progress;

        return (
          <motion.a
            key={section}
            href={`#${section.toLowerCase()}`}
            className="group flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            {/* Dot */}
            <motion.div
              className="w-3 h-3 rounded-full border-2 transition-colors"
              animate={{
                backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                borderColor: isActive ? 'var(--primary)' : 'var(--muted-foreground)'
              }}
            />

            {/* Label (shows on hover) */}
            <span className="absolute right-6 px-2 py-1 rounded bg-card 
              border text-sm whitespace-nowrap opacity-0 group-hover:opacity-100
              transition-opacity pointer-events-none">
              {section}
            </span>
          </motion.a>
        );
      })}
    </div>
  );
}

// ============================================================================
// 5. Parallax Section
// ============================================================================

interface ParallaxSectionProps {
  children: ReactNode;
  backgroundImage?: string;
  speed?: number; // 0.5 = slower, 2 = faster
  className?: string;
}

export function ParallaxSection({ 
  children, 
  backgroundImage,
  speed = 0.5,
  className = '' 
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = prefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    ['0%', shouldReduce ? '0%' : `${speed * 100}%`]
  );

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Parallax Background */}
      {backgroundImage && (
        <motion.div
          style={{ y }}
          className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// ============================================================================
// 6. Scale In on Scroll
// ============================================================================

interface ScaleInProps {
  children: ReactNode;
  className?: string;
}

export function ScaleIn({ children, className = '' }: ScaleInProps) {
  const shouldReduce = prefersReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ 
        duration: shouldReduce ? 0 : 0.6,
        ease: 'easeOut'
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// Usage Examples
// ============================================================================

/*
// Simple fade in:
<FadeInUp>
  <h2>This heading fades in on scroll</h2>
</FadeInUp>

// Stagger children:
<StaggerList>
  {items.map(item => <Card key={item.id} {...item} />)}
</StaggerList>

// Reading progress:
<ScrollProgress />

// Section indicators:
<SectionProgress sections={['Home', 'About', 'Programs', 'Contact']} />

// Parallax background:
<ParallaxSection backgroundImage="/hero-bg.jpg" speed={0.5}>
  <h1>Hero Content</h1>
</ParallaxSection>

// Scale in effect:
<ScaleIn>
  <Card />
</ScaleIn>
*/
