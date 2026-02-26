'use client';

import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { PageHero } from '@/components/ui/page-hero';
import { HeroCTAButtons } from '@/components/ui/hero-cta-buttons';
import { getImageUrl } from '@/lib/image-utils';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeIn, slideUp, staggerContainer } from '@/lib/animations';
import { textReveal, scaleInMagic } from '@/lib/magicui-animations';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedMetadata } from '@/lib/use-localized-metadata';
import { usePathname } from 'next/navigation';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { getBreadcrumbs, toBreadcrumbSchemaItems } from '@/lib/breadcrumbs';

/**
 * About page client component with interactive sections.
 */
export function AboutPageClient() {
  const { t, messages } = useLanguage();
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);

  useLocalizedMetadata({
    title: t('seo.about.title'),
    description: t('seo.about.description'),
  });

  const values = (messages.aboutPage?.values?.items ?? []) as Array<{
    title: string;
    description: string;
    icon: string;
    color: 'primary' | 'secondary' | 'accent';
  }>;

  return (
    <Suspense fallback={<LoadingSpinner message="Loading about us..." />}>
      <main className="flex-1">
        <BreadcrumbSchema items={toBreadcrumbSchemaItems(breadcrumbs)} />

        {/* Hero Section */}
        <PageHero
          title={t('aboutPage.hero.title')}
          subtitle={t('aboutPage.hero.subtitle')}
          backgroundSvg={getImageUrl('/imgs/about/about_hero_1.gif')}
          enableScrollTrigger={true}
          hideSubtitle={false}
          hideTitle={false}
          unoptimized={true}
          topContent={<Breadcrumbs items={breadcrumbs} />}
        >
          <HeroCTAButtons variant="outlined" />
        </PageHero>

        {/* Our Story */}
        <motion.section
          className="py-20 bg-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className="space-y-6" variants={slideUp}>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
                  {t('aboutPage.story.title')}
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    {t('aboutPage.story.paragraphs.one')}
                  </p>
                  <p>
                    {t('aboutPage.story.paragraphs.two')}
                  </p>
                  <p>
                    {t('aboutPage.story.paragraphs.three')}
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link
                    href="/programs"
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    {t('aboutPage.story.ctaPrograms')}
                  </Link>
                  <Link
                    href="/contact#contact-form"
                    className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {t('aboutPage.story.ctaVisit')}
                  </Link>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                variants={slideUp}
              >
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={getImageUrl('/imgs/home/1.jpeg')}
                    alt="Friendship Corner Daycare building"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                </div>

                {/* Floating stats card */}
                <motion.div
                  className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-6 border border-border"
                  variants={scaleInMagic}
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{t('aboutPage.story.statsValue')}</div>
                    <div className="text-sm text-muted-foreground">{t('aboutPage.story.statsLabel')}</div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Mission & Values */}
        <motion.section
          className="py-20 bg-muted/30"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
                {t('aboutPage.values.title')}
              </h2>
              <p className="text-xl text-muted-foreground w-full max-w-none">
                {t('aboutPage.values.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  variants={textReveal}
                  custom={index}
                >
                  <Card variant="interactive" className="p-8 h-full">
                    <CardHeader className="p-0 mb-4">
                      <div className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4",
                        value.color === 'primary' ? 'bg-primary/10' :
                          value.color === 'secondary' ? 'bg-secondary/10' : 'bg-accent/10'
                      )}>
                        {value.icon}
                      </div>
                      <h3 className="text-xl font-bold">{value.title}</h3>
                    </CardHeader>
                    <CardContent className="p-0">
                      <CardDescription className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Montessori Approach */}
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
                <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
                  {t('aboutPage.montessori.title')}
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    {t('aboutPage.montessori.paragraphs.one')}
                  </p>
                  <p>
                    {t('aboutPage.montessori.paragraphs.two')}
                  </p>
                  <p>
                    {t('aboutPage.montessori.paragraphs.three')}
                  </p>
                </div>
              </motion.div>

              <motion.div variants={slideUp} className="relative">
                <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={getImageUrl('/imgs/home/2.jpeg')}
                    alt="Montessori classroom activities"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Our Team */}
        <motion.section
          className="py-20 bg-muted/30"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
                {t('aboutPage.team.title')}
              </h2>
              <p className="text-xl text-muted-foreground w-full max-w-5xl mx-auto text-balance">
                {t('aboutPage.team.subtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <motion.div variants={slideUp} className="flex flex-col justify-center gap-4 rounded-2xl bg-card p-8 border border-border/60 shadow-lg h-full">
                {((messages.aboutPage as any)?.team?.highlights || []).map((highlight: string, i: number) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {i === 2 ? '🎓' : '👩‍🏫'}
                    </div>
                    <span className="font-medium text-foreground">{highlight}</span>
                  </div>
                ))}
              </motion.div>
              <motion.div variants={slideUp} className="space-y-4 rounded-2xl bg-card p-8 border border-border/60 shadow-lg">
                <p className="text-muted-foreground leading-relaxed">
                  {t('aboutPage.team.qualifications')}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t('aboutPage.team.experience')}
                </p>
              </motion.div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center mt-10">
              <Link
                href="/programs"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                {t('aboutPage.story.ctaPrograms')}
              </Link>
              <Link
                href="/contact#contact-form"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {t('aboutPage.story.ctaVisit')}
              </Link>
            </div>
          </div>
        </motion.section>
      </main>
    </Suspense>
  );
}
