'use client';

import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { PageHero } from '@/components/ui/page-hero';
import { HeroCTAButtons } from '@/components/ui/hero-cta-buttons';
import { cn } from '@/lib/utils';
import { getImageUrl } from '@/lib/image-utils';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { fadeIn, slideUp, staggerContainer } from '@/lib/animations';
import { textReveal, textRevealItem } from '@/lib/magicui-animations';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedMetadata } from '@/lib/use-localized-metadata';

/**
 * Programs page client component with interactive sections.
 */
export function ProgramsPageClient() {
  const { t, messages } = useLanguage();

  useLocalizedMetadata({
    title: t('seo.programs.title'),
    description: t('seo.programs.description'),
  });

  const programMessages = messages.programsPage?.programs;
  const programs = [
    {
      id: 'toddler',
      title: t('programsPage.programs.toddler.title'),
      age: t('programsPage.programs.toddler.age'),
      color: 'primary',
      icon: 'T',
      image: getImageUrl('/images/practical-life-shelf-1.jpg'),
      video: '/imgs/programs/toddler.mp4',
      description: t('programsPage.programs.toddler.description'),
      features: (programMessages?.toddler?.features ?? []) as string[],
      dailySchedule: (programMessages?.toddler?.dailySchedule ?? []) as { time: string; activity: string }[],
    },
    {
      id: 'preschool',
      title: t('programsPage.programs.preschool.title'),
      age: t('programsPage.programs.preschool.age'),
      color: 'secondary',
      icon: 'P',
      image: getImageUrl('/images/sensorial-shelf.jpg'),
      video: '/imgs/programs/preschool.mp4',
      description: t('programsPage.programs.preschool.description'),
      features: (programMessages?.preschool?.features ?? []) as string[],
      dailySchedule: (programMessages?.preschool?.dailySchedule ?? []) as { time: string; activity: string }[],
    },
    {
      id: 'prekindergarten',
      title: t('programsPage.programs.prekindergarten.title'),
      age: t('programsPage.programs.prekindergarten.age'),
      color: 'accent',
      icon: 'K',
      image: getImageUrl('/images/language-shelf.jpg'),
      video: '/imgs/programs/pre-kindergarten.mp4',
      description: t('programsPage.programs.prekindergarten.description'),
      features: (programMessages?.prekindergarten?.features ?? []) as string[],
      dailySchedule: (programMessages?.prekindergarten?.dailySchedule ?? []) as { time: string; activity: string }[],
    }
  ];

  return (
    <Suspense fallback={<LoadingSpinner message="Loading programs..." />}>
      <main className="flex-1">
        {/* Hero Section */}
        <PageHero
          title={t('programsPage.hero.title')}
          subtitle={t('programsPage.hero.subtitle')}
          backgroundSvg={getImageUrl('/imgs/programs/programs_hero_1.gif')}
          enableScrollTrigger={true}
          hideSubtitle={true}
          hideTitle={true}
        >
          <HeroCTAButtons variant="default" />
        </PageHero>

        {/* Programs Overview */}
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
                {t('programsPage.overview.title')}
              </h2>
              <p className="text-xl text-muted-foreground w-full max-w-none">
                {t('programsPage.overview.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <motion.div
                  key={program.id}
                  variants={textReveal}
                  custom={index}
                >
                  <Card variant="interactive" className="p-8 h-full">
                    <CardHeader className="p-0 mb-4">
                      <div className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold mb-4",
                        program.color === 'primary' ? 'bg-primary/10 text-primary' :
                          program.color === 'secondary' ? 'bg-secondary/10 text-secondary' : 'bg-accent/10 text-accent'
                      )}>
                        {program.icon}
                      </div>
                      <CardTitle className="text-xl font-bold">{program.title}</CardTitle>
                      <Badge variant="secondary" className="w-fit">
                        {program.age}
                      </Badge>
                    </CardHeader>
                    <CardContent className="p-0">
                      <CardDescription className="text-muted-foreground leading-relaxed">
                        {program.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Program Details */}
        {programs.map((program, index) => (
          <motion.section
            key={program.id}
            id={program.id}
            className={cn(
              "py-20",
              index % 2 === 0 ? "bg-muted/30" : "bg-card"
            )}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div variants={slideUp} className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                      {program.title}
                    </h2>
                    <p className="text-lg text-muted-foreground">{program.age}</p>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {program.description}
                  </p>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">{t('programsPage.programDetail.keyFeatures')}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {program.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={slideUp} className="relative">
                  <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={program.image}
                      alt={`${program.title} classroom`}
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
        ))}

        {/* Daily Schedule */}
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
                {t('programsPage.dailySchedule.title')}
              </h2>
              <p className="text-xl text-muted-foreground w-full max-w-none">
                {t('programsPage.dailySchedule.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <motion.div
                  key={program.id}
                  variants={textRevealItem}
                  custom={index}
                >
                  <Card className="p-6 h-full">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-lg font-bold">{program.title}</CardTitle>
                      <CardDescription>{program.age}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 space-y-3">
                      {program.dailySchedule.slice(0, 5).map((schedule, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <Calendar className="h-4 w-4 text-primary mt-1" />
                          <div>
                            <p className="text-sm font-semibold text-foreground">{schedule.time}</p>
                            <p className="text-sm text-muted-foreground">{schedule.activity}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
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
          <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
              {t('programsPage.cta.title')}
            </h2>
            <p className="text-xl text-primary-foreground/90">
              {t('programsPage.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
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
