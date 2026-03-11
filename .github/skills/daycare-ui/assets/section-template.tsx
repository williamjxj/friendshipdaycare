/**
 * Section Template
 * 
 * Copy this template to create new page sections following the daycare UI patterns.
 * Replace 'MySection' with your section name.
 */

'use client';

import { motion } from 'framer-motion';
import { fadeIn, slideUp, staggerContainer, staggerItem } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Link from 'next/link';

/**
 * Section component with i18n, animations, and responsive design
 */
export function MySectionContent() {
  const { t } = useLanguage();

  // Example data structure - replace with your data
  const items = [
    { id: 1, title: 'Item 1', description: 'Description 1' },
    { id: 2, title: 'Item 2', description: 'Description 2' },
    { id: 3, title: 'Item 3', description: 'Description 3' },
  ];

  return (
    <motion.section
      id="my-section" // Used for anchor links
      className="py-20 bg-background" // Adjust padding and background
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          variants={slideUp}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            {t('mySection.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('mySection.description')}
          </p>
        </motion.div>

        {/* Section Content - Grid Example */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {items.map((item) => (
            <motion.div key={item.id} variants={staggerItem}>
              <Card variant="elevated" className="h-full">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Card content */}
                  <p className="text-foreground">
                    Content goes here...
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action (Optional) */}
        <motion.div 
          className="mt-12 text-center"
          variants={slideUp}
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors"
          >
            {t('mySection.cta')}
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

/**
 * Alternative Layout Patterns:
 * 
 * 1. Two-Column Layout:
 * <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
 *   <div>Text content</div>
 *   <div>Image or visual</div>
 * </div>
 * 
 * 2. Feature List:
 * <div className="space-y-8">
 *   {features.map(feature => (
 *     <motion.div key={feature.id} variants={staggerItem} className="flex gap-4">
 *       <div className="flex-shrink-0">Icon</div>
 *       <div>Content</div>
 *     </motion.div>
 *   ))}
 * </div>
 * 
 * 3. Bento Grid:
 * <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[200px]">
 *   <div className="md:col-span-2">Large item</div>
 *   <div>Small item</div>
 * </div>
 */

/**
 * Translation Keys to Add:
 * 
 * In all language files (/src/messages/*.json):
 * 
 * {
 *   "mySection": {
 *     "title": "Section Title",
 *     "description": "Section description text",
 *     "cta": "Call to Action"
 *   }
 * }
 */
