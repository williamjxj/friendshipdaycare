'use client';

import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { PageHero } from '@/components/ui/page-hero';
import { HeroCTAButtons } from '@/components/ui/hero-cta-buttons';
import { getImageUrl } from '@/lib/image-utils';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedMetadata } from '@/lib/use-localized-metadata';
import { usePathname } from 'next/navigation';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { getBreadcrumbs, toBreadcrumbSchemaItems } from '@/lib/breadcrumbs';

/**
 * Programs page client component: single program overview, BC ECE benefits, Montessori benefits.
 */
export function ProgramsPageClient() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);

  useLocalizedMetadata({
    title: t('seo.programs.title'),
    description: t('seo.programs.description'),
  });

  return (
    <Suspense fallback={<LoadingSpinner message="Loading programs..." />}>
      <main className="flex-1">
        <BreadcrumbSchema items={toBreadcrumbSchemaItems(breadcrumbs)} />

        {/* Hero Section */}
        <PageHero
          title={t('programsPage.hero.title')}
          subtitle={t('programsPage.hero.subtitle')}
          description={t('programsPage.hero.description')}
          backgroundSvg={getImageUrl('/imgs/programs/programs_hero_1.gif')}
          enableScrollTrigger={true}
          hideSubtitle={false}
          hideTitle={false}
          topContent={<Breadcrumbs items={breadcrumbs} />}
        >
          <HeroCTAButtons variant="default" />
        </PageHero>

        {/* Single Program Overview */}
        <motion.section
          className="py-20 bg-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={slideUp} className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
                    {t('programsPage.program.title')}
                  </h2>
                  <Badge variant="secondary" className="w-fit">
                    {t('programsPage.program.ageRange')}
                  </Badge>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {t('programsPage.program.description')}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t('programsPage.program.dailyFlow')}
                </p>
                <Link
                  href="/enrollment"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  {t('programsPage.program.ctaRegistration')}
                </Link>
              </motion.div>
              <motion.div variants={slideUp} className="relative">
                <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={getImageUrl('/images/practical-life-shelf-1.jpg')}
                    alt="Montessori classroom"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* BC ECE Benefits */}
        <motion.section
          className="py-20 bg-muted/30"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
                {t('programsPage.eceBenefits.title')}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-balance">
                {t('programsPage.eceBenefits.description')}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Montessori Benefits */}
        <motion.section
          className="py-20 bg-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
                {t('programsPage.montessoriBenefits.title')}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-balance">
                {t('programsPage.montessoriBenefits.description')}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Enrollment CTA */}
        <motion.section
          className="py-20 bg-primary"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="max-w-5xl mx-auto px-4 text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground">
              {t('programsPage.cta.title')}
            </h2>
            <p className="text-xl text-primary-foreground/90 w-full max-w-5xl mx-auto text-balance">
              {t('programsPage.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact#contact-form"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-foreground text-primary rounded-lg font-semibold hover:bg-primary-foreground/90 transition-colors"
              >
                {t('programsPage.cta.primary')}
              </Link>
              <Link
                href="/enrollment"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-foreground text-primary-foreground rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
              >
                {t('programsPage.cta.secondary')}
              </Link>
            </div>
          </div>
        </motion.section>
      </main>
    </Suspense>
  );
}
