'use client';

import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { PageHero } from '@/components/ui/page-hero';
import { HeroCTAButtons } from '@/components/ui/hero-cta-buttons';
import { getImageUrl } from '@/lib/image-utils';
import Link from 'next/link';
import {
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  DocumentCheckIcon,
  UserGroupIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedMetadata } from '@/lib/use-localized-metadata';

/**
 * Enrollment page client component with steps and requirements.
 */
export function EnrollmentPageClient() {
  const { t, messages } = useLanguage();

  useLocalizedMetadata({
    title: t('seo.enrollment.title'),
    description: t('seo.enrollment.description'),
  });

  const steps = (messages.enrollmentPage?.steps ?? []) as Array<{
    title: string;
    description: string;
  }>;
  const requirements = (messages.enrollmentPage?.requirements?.items ?? []) as string[];

  return (
    <Suspense fallback={<LoadingSpinner message="Loading enrollment..." />}>
      <main className="flex-1">
        {/* Hero Section */}
        <PageHero
          title={t('enrollmentPage.hero.title')}
          subtitle={t('enrollmentPage.hero.subtitle')}
          backgroundSvg={getImageUrl('/imgs/enrollment/enrollment_hero_1.gif')}
          enableScrollTrigger={true}
          hideSubtitle={true}
          hideTitle={true}
        >
          <HeroCTAButtons variant="default" />
        </PageHero>

        {/* Enrollment Process */}
        <motion.section
          className="py-20 bg-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                {t('enrollmentPage.process.title')}
              </h2>
              <p className="text-xl text-muted-foreground w-full max-w-none">
                {t('enrollmentPage.process.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  variants={slideUp}
                  custom={index}
                >
                  <Card variant="interactive" className="p-6 h-full">
                    <CardHeader className="p-0 mb-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                        index % 3 === 0 ? 'bg-primary/10 text-primary' :
                          index % 3 === 1 ? 'bg-secondary/10 text-secondary' : 'bg-accent/10 text-accent'
                      )}>
                        {index === 0 && <ClipboardDocumentListIcon className="h-6 w-6" />}
                        {index === 1 && <CalendarDaysIcon className="h-6 w-6" />}
                        {index === 2 && <DocumentCheckIcon className="h-6 w-6" />}
                        {index === 3 && <UserGroupIcon className="h-6 w-6" />}
                      </div>
                      <CardTitle className="text-lg font-bold">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <CardDescription className="text-muted-foreground">
                        {step.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Requirements */}
        <motion.section
          className="py-20 bg-muted/30"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                {t('enrollmentPage.requirements.title')}
              </h2>
              <p className="text-xl text-muted-foreground">
                {t('enrollmentPage.requirements.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {requirements.map((requirement, index) => (
                <motion.div
                  key={requirement}
                  className="flex items-start space-x-3 bg-card p-4 rounded-lg shadow-sm"
                  variants={slideUp}
                  custom={index}
                >
                  <CheckCircleIcon className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <p className="text-muted-foreground">{requirement}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          className="py-20 bg-primary"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
              {t('enrollmentPage.cta.title')}
            </h2>
            <p className="text-xl text-primary-foreground/90">
              {t('enrollmentPage.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-foreground text-primary rounded-lg font-semibold hover:bg-primary-foreground/90 transition-colors"
              >
                {t('enrollmentPage.cta.primary')}
              </Link>
              <a
                href="tel:6049458504"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-foreground text-primary-foreground rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
              >
                {t('enrollmentPage.cta.secondary')}
              </a>
            </div>
          </div>
        </motion.section>
      </main>
    </Suspense>
  );
}
