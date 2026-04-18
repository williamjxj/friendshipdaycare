'use client';

import { getImageUrl } from '@/lib/image-utils';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn, slideUp, staggerContainer } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { Baby, Sparkles, GraduationCap, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  GridAndDotBackgrounds,
  sectionGridDotPresets,
  useSectionGridDotHover,
} from '@/components/ui/GridAndDotBackgrounds';
import { BrandAdPromoCard } from '@/components/ui/brand-visual-assets';
import { AuroraBackground } from '@/components/ui/aurora-background';

type ProgramData = {
  features?: string[];
};

type ProgramsData = {
  toddler?: ProgramData;
  preschool?: ProgramData;
  prekindergarten?: ProgramData;
};

type ProgramsPageMessages = {
  programs?: ProgramsData;
};

/**
 * Programs section with 3-card layout: Toddler, Preschool, Pre-K
 * Matches manus site modern design
 */
export function ProgramsSection() {
  const { t, messages } = useLanguage();
  const { isSectionHovered, gridDotSectionHoverProps } = useSectionGridDotHover();

  const programsData = messages.programsPage as ProgramsPageMessages | undefined;

  const programs = [
    {
      key: 'toddler',
      title: t('programsPage.programs.toddler.title'),
      age: t('programsPage.programs.toddler.age'),
      description: t('programsPage.programs.toddler.description'),
      icon: Baby,
      color: 'from-pink-500 to-rose-500',
      image: '/imgs/programs/toddler.jpg',
      features: programsData?.programs?.toddler?.features || []
    },
    {
      key: 'preschool',
      title: t('programsPage.programs.preschool.title'),
      age: t('programsPage.programs.preschool.age'),
      description: t('programsPage.programs.preschool.description'),
      icon: Sparkles,
      color: 'from-blue-500 to-cyan-500',
      image: '/imgs/programs/preschool.jpg',
      features: programsData?.programs?.preschool?.features || []
    },
    {
      key: 'prekindergarten',
      title: t('programsPage.programs.prekindergarten.title'),
      age: t('programsPage.programs.prekindergarten.age'),
      description: t('programsPage.programs.prekindergarten.description'),
      icon: GraduationCap,
      color: 'from-amber-500 to-orange-500',
      image: '/imgs/programs/pre-k.jpg',
      features: programsData?.programs?.prekindergarten?.features || []
    }
  ];

  return (
    <motion.section
      id="programs"
      className="relative py-20 bg-muted/30 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
      {...gridDotSectionHoverProps}
    >
      <AuroraBackground className="opacity-80" palette="coastal" blur={160} />
      <GridAndDotBackgrounds
        backdropOnly
        isSectionHovered={isSectionHovered}
        {...sectionGridDotPresets.programs}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          variants={slideUp}
        >
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-foreground mb-4">
            {t('programsPage.overview.title')}
          </h2>
          <p className="mx-auto max-w-4xl text-base sm:text-lg md:text-xl text-muted-foreground">
            {t('programsPage.overview.subtitle')}
          </p>
          <div className="mx-auto mt-10 w-full max-w-3xl px-2">
            <BrandAdPromoCard />
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
          variants={staggerContainer}
        >
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={program.key}
                className="group fdc-card-surface relative overflow-hidden rounded-2xl border border-border/80 bg-card shadow-lg transition-[box-shadow,border-color] duration-300"
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                variants={slideUp}
                custom={index}
              >
                {/* Program Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={getImageUrl(program.image)}
                    alt={program.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/20 to-transparent" />
                  
                  {/* Icon Badge */}
                  <div className={cn(
                    "absolute top-4 right-4 w-12 h-12 rounded-xl flex items-center justify-center bg-linear-to-br shadow-lg",
                    program.color
                  )}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Age Badge */}
                  <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-border">
                    <span className="text-sm font-bold text-foreground">
                      {program.age}
                    </span>
                  </div>
                </div>

                {/* Program Content */}
                <div className="p-5 sm:p-6 space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                    {program.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {program.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2">
                    {program.features.slice(0, 4).map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Link */}
                  <Link
                    href={`/programs/${program.key}`}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors group/link mt-4"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          variants={slideUp}
        >
          <p className="text-muted-foreground mb-6">
            Ready to enroll your child in our Montessori program?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/#enrollment"
              className="inline-flex w-full sm:w-auto items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
            >
              Start Enrollment
            </Link>
            <Link
              href="/#contact-form"
              className="inline-flex w-full sm:w-auto items-center justify-center px-8 py-4 border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Schedule a Visit
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
