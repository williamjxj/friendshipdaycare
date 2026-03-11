/**
 * Animated Card Component Template
 * 
 * Ready-to-use card with hover animations including:
 * - Scale and lift on hover
 * - Image zoom effect
 * - Shimmer overlay
 * - Staggered text reveal
 * 
 * Usage:
 * <AnimatedCard
 *   title="Card Title"
 *   description="Card description"
 *   image="/path/to/image.jpg"
 *   href="/link"
 * />
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface AnimatedCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  badge?: string;
}

export function AnimatedCard({ 
  title, 
  description, 
  image, 
  href,
  badge 
}: AnimatedCardProps) {
  return (
    <Link href={href}>
      <motion.div
        className="group relative overflow-hidden rounded-lg border bg-card
          transition-shadow duration-300 hover:shadow-xl"
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Image Container with Zoom Effect */}
        <div className="relative h-48 overflow-hidden bg-muted">
          <motion.div
            className="h-full w-full"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>

          {/* Badge */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-4 right-4 px-3 py-1 rounded-full
                bg-primary text-primary-foreground text-sm font-medium"
            >
              {badge}
            </motion.div>
          )}

          {/* Shimmer Effect on Hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent 
              via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '200%' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        </div>

        {/* Content with Stagger */}
        <motion.div
          className="p-6"
          initial="rest"
          whileHover="hover"
        >
          <motion.h3
            variants={{
              rest: { x: 0 },
              hover: { x: 4 }
            }}
            transition={{ duration: 0.3 }}
            className="text-xl font-semibold text-foreground 
              group-hover:text-primary transition-colors"
          >
            {title}
          </motion.h3>

          <motion.p
            variants={{
              rest: { x: 0, opacity: 0.7 },
              hover: { x: 4, opacity: 1 }
            }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="mt-2 text-muted-foreground"
          >
            {description}
          </motion.p>

          {/* Arrow Indicator */}
          <motion.div
            variants={{
              rest: { x: 0, opacity: 0 },
              hover: { x: 4, opacity: 1 }
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-4 flex items-center text-primary font-medium"
          >
            <span className="mr-2">Learn More</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 
          group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </motion.div>
    </Link>
  );
}
