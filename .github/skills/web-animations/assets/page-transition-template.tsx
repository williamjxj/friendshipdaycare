/**
 * Page Transition Templates
 * 
 * Ready-to-use page transition effects for Next.js App Router including:
 * - Fade transition
 * - Slide transition (left/right/up/down)
 * - Scale transition
 * - Custom transition wrapper
 * 
 * Usage in layout.tsx or individual pages.
 */

'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { prefersReducedMotion } from '@/lib/animations';

// ============================================================================
// Transition Variants
// ============================================================================

const fadeVariants: Variants = {
  initial: { opacity: 0 },
  enter: { 
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' }
  },
};

const slideUpVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  enter: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3, ease: 'easeIn' }
  },
};

const slideRightVariants: Variants = {
  initial: { opacity: 0, x: -30 },
  enter: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    x: 30,
    transition: { duration: 0.3, ease: 'easeIn' }
  },
};

const scaleVariants: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  enter: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    scale: 1.05,
    transition: { duration: 0.3, ease: 'easeIn' }
  },
};

const blurVariants: Variants = {
  initial: { opacity: 0, filter: 'blur(10px)' },
  enter: { 
    opacity: 1, 
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    filter: 'blur(10px)',
    transition: { duration: 0.3, ease: 'easeIn' }
  },
};

// ============================================================================
// 1. Basic Page Transition Wrapper
// ============================================================================

interface PageTransitionProps {
  children: ReactNode;
  variant?: 'fade' | 'slideUp' | 'slideRight' | 'scale' | 'blur';
}

export function PageTransition({ 
  children, 
  variant = 'fade' 
}: PageTransitionProps) {
  const pathname = usePathname();
  const shouldReduce = prefersReducedMotion();

  const variants = {
    fade: fadeVariants,
    slideUp: slideUpVariants,
    slideRight: slideRightVariants,
    scale: scaleVariants,
    blur: blurVariants,
  }[variant];

  // Simplify animations if reduced motion is preferred
  const effectiveVariants = shouldReduce 
    ? fadeVariants 
    : variants;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={effectiveVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================================================
// 2. Layout Integration Component
// ============================================================================

/**
 * Use this in your root layout to wrap all pages
 * 
 * Example in app/layout.tsx:
 * 
 * import { PageTransitionLayout } from '@/components/ui/page-transition';
 * 
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <Header />
 *         <PageTransitionLayout variant="slideUp">
 *           {children}
 *         </PageTransitionLayout>
 *         <Footer />
 *       </body>
 *     </html>
 *   );
 * }
 */

export function PageTransitionLayout({ 
  children, 
  variant = 'fade' 
}: PageTransitionProps) {
  return (
    <PageTransition variant={variant}>
      <main>{children}</main>
    </PageTransition>
  );
}

// ============================================================================
// 3. Advanced: Direction-Aware Transitions
// ============================================================================

type Direction = 'forward' | 'backward';

interface DirectionalTransitionProps {
  children: ReactNode;
  direction?: Direction;
}

export function DirectionalPageTransition({ 
  children,
  direction = 'forward'
}: DirectionalTransitionProps) {
  const pathname = usePathname();
  const shouldReduce = prefersReducedMotion();

  const directionVariants: Variants = {
    initial: { 
      opacity: 0, 
      x: shouldReduce ? 0 : (direction === 'forward' ? 30 : -30)
    },
    enter: { 
      opacity: 1, 
      x: 0,
      transition: { duration: shouldReduce ? 0 : 0.4, ease: 'easeOut' }
    },
    exit: { 
      opacity: 0, 
      x: shouldReduce ? 0 : (direction === 'forward' ? -30 : 30),
      transition: { duration: shouldReduce ? 0 : 0.3, ease: 'easeIn' }
    },
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={directionVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================================================
// 4. Loading State Transition
// ============================================================================

interface LoadingTransitionProps {
  children: ReactNode;
  isLoading?: boolean;
}

export function LoadingTransition({ 
  children, 
  isLoading = false 
}: LoadingTransitionProps) {
  const pathname = usePathname();
  const shouldReduce = prefersReducedMotion();

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center justify-center min-h-screen"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
              animate={{ rotate: shouldReduce ? 0 : 360 }}
              transition={{ 
                duration: 1, 
                repeat: shouldReduce ? 0 : Infinity,
                ease: 'linear' 
              }}
            />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key={pathname}
          variants={slideUpVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// 5. Stagger Children on Page Load
// ============================================================================

interface StaggerPageProps {
  children: ReactNode;
  staggerDelay?: number;
}

export function StaggerPageTransition({ 
  children, 
  staggerDelay = 0.1 
}: StaggerPageProps) {
  const pathname = usePathname();
  const shouldReduce = prefersReducedMotion();

  const containerVariants: Variants = {
    initial: { opacity: 0 },
    enter: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduce ? 0 : staggerDelay,
        delayChildren: shouldReduce ? 0 : 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: shouldReduce ? 0 : 0.05,
        staggerDirection: -1,
      },
    },
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={containerVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================================================
// 6. Custom Transition Builder
// ============================================================================

interface CustomTransitionProps {
  children: ReactNode;
  customVariants?: Variants;
  duration?: number;
}

export function CustomPageTransition({ 
  children, 
  customVariants,
  duration = 0.4
}: CustomTransitionProps) {
  const pathname = usePathname();
  const shouldReduce = prefersReducedMotion();

  const defaultVariants: Variants = {
    initial: { opacity: 0 },
    enter: { 
      opacity: 1,
      transition: { duration: shouldReduce ? 0 : duration }
    },
    exit: { 
      opacity: 0,
      transition: { duration: shouldReduce ? 0 : duration * 0.75 }
    },
  };

  const variants = customVariants || defaultVariants;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={shouldReduce ? defaultVariants : variants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================================================
// Usage Examples
// ============================================================================

/*
// 1. Basic fade transition in layout:
// app/layout.tsx
import { PageTransitionLayout } from '@/components/ui/page-transition';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <PageTransitionLayout variant="slideUp">
          {children}
        </PageTransitionLayout>
      </body>
    </html>
  );
}

// 2. Different transitions per section:
// app/(marketing)/layout.tsx
import { PageTransition } from '@/components/ui/page-transition';

export default function MarketingLayout({ children }) {
  return (
    <PageTransition variant="fade">
      {children}
    </PageTransition>
  );
}

// 3. With loading state:
import { LoadingTransition } from '@/components/ui/page-transition';
import { useState } from 'react';

function MyPage() {
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <LoadingTransition isLoading={isLoading}>
      <div>Page content</div>
    </LoadingTransition>
  );
}

// 4. Custom transition:
import { CustomPageTransition } from '@/components/ui/page-transition';

const myVariants = {
  initial: { opacity: 0, y: 100, rotate: -5 },
  enter: { 
    opacity: 1, 
    y: 0, 
    rotate: 0,
    transition: { duration: 0.6, ease: 'backOut' }
  },
  exit: { 
    opacity: 0, 
    y: -100,
    transition: { duration: 0.3 }
  },
};

<CustomPageTransition customVariants={myVariants}>
  {children}
</CustomPageTransition>
*/
