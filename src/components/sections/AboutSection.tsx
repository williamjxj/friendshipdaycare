'use client';

import { getImageUrl } from '@/lib/image-utils';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeIn, slideUp, staggerContainer } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles, Shield, Heart, Award, Users, Home, Target } from 'lucide-react';

/**
 * About section matching manus site layout: Stats badges, Story, Feature cards
 */
export function AboutSection() {
  const { t, messages } = useLanguage();

  // Feature cards matching manus site
  const features = [
    {
      title: "Authentic Montessori",
      description: "Hands-on learning with genuine Montessori materials. Children explore at their own pace, building independence and a lifelong love of learning.",
      icon: Sparkles,
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Safety First",
      description: "Fully licensed by BC. Secure access, clean spaces, and attentive care — every child thrives in our safe haven.",
      icon: Shield,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "A Loving Community",
      description: "More than a daycare — a vibrant family. Every child is seen, heard, and cherished. Strong relationships with families are our foundation.",
      icon: Heart,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Certified Educators",
      description: "All teachers hold BC ECE licenses and Montessori certifications. Manager Ingrid Yuan brings 15+ years of expertise.",
      icon: Award,
      color: "from-amber-500 to-orange-500"
    }
  ];

  // Values from i18n messages
  const values = ((messages.aboutPage as any)?.values?.items ?? []) as Array<{
    title: string;
    description: string;
    icon: string;
    color: string;
  }>;

  return (
    <>
      {/* Stats Badges Section - Manus Style */}
      <motion.section
        id="about"
        className="pt-20 pb-12 bg-card"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">  
          <motion.div 
            className="text-center mb-16"
            variants={slideUp}
          >
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-foreground mb-4 section-header">
              Coquitlam's Trusted Montessori Daycare
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Since 2008, Friendship Corner has been nurturing young minds in Coquitlam, BC through authentic Montessori education and a warm, inclusive community.
            </p>
          </motion.div>

          {/* Stats Badges Row - Horizontal Layout */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="px-4 py-6 rounded-xl border-2 border-border bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
              variants={slideUp}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="text-4xl font-extrabold bg-linear-to-br from-primary to-primary/70 bg-clip-text text-transparent">
                  16+
                </div>
                <div className="text-sm font-semibold text-muted-foreground text-center">
                  Years in Coquitlam
                </div>
              </div>
            </motion.div>

            <motion.div
              className="px-4 py-6 rounded-xl border-2 border-border bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
              variants={slideUp}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="text-4xl font-extrabold bg-linear-to-br from-primary to-primary/70 bg-clip-text text-transparent">
                  30mo
                </div>
                <div className="text-sm font-semibold text-muted-foreground text-center">
                  Youngest Age
                </div>
              </div>
            </motion.div>

            <motion.div
              className="px-4 py-6 rounded-xl border-2 border-border bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
              variants={slideUp}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="text-4xl font-extrabold bg-linear-to-br from-primary to-primary/70 bg-clip-text text-transparent">
                  6
                </div>
                <div className="text-sm font-semibold text-muted-foreground text-center">
                  Dedicated Teachers
                </div>
              </div>
            </motion.div>

            <motion.div
              className="px-4 py-6 rounded-xl border-2 border-border bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
              variants={slideUp}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="text-4xl font-extrabold bg-linear-to-br from-primary to-primary/70 bg-clip-text text-transparent">
                  1:8
                </div>
                <div className="text-sm font-semibold text-muted-foreground text-center">
                  Staff-to-Child Ratio
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Feature Cards - 2x2 Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
            variants={staggerContainer}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="group relative p-8 rounded-2xl bg-card border-2 border-border shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  variants={slideUp}
                  custom={index}
                >
                  <div className="relative z-10">
                    <div className={cn(
                      "w-14 h-14 rounded-xl mb-4 flex items-center justify-center bg-linear-to-br",
                      feature.color,
                      "group-hover:scale-110 transition-transform duration-300"
                    )}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Story Section */}
      <motion.section
        className="py-20 bg-muted/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            variants={staggerContainer}
          >
            <motion.div className="space-y-6" variants={slideUp}>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
                {t('aboutPage.story.title')}
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{t('aboutPage.story.paragraphs.one')}</p>
                <p>{t('aboutPage.story.paragraphs.two')}</p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/#programs"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  {t('aboutPage.story.ctaPrograms')}
                </Link>
                <Link
                  href="/#contact-form"
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
              <div className="relative h-96 rounded-xl overflow-hidden shadow hover:shadow-xl transition-all duration-300">
                <img
                  src={getImageUrl('/imgs/home/1.jpeg')}
                  alt="Friendship Corner Daycare building"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
              </div>

              {/* Floating stats card */}
              <motion.div
                className="absolute -bottom-6 -right-6 bg-white/50 dark:bg-card/80 backdrop-blur-sm rounded-xl shadow hover:shadow-xl transition-all duration-300 p-6 border-2 border-border"
                variants={slideUp}
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

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {values.map((value, index) => {
              const IconComponent = value.icon === '🌱' ? Users : value.icon === '🛡️' ? Shield : Heart;
              const gradientColor = value.color === 'primary' ? 'from-emerald-500 to-teal-500' : 
                                    value.color === 'secondary' ? 'from-blue-500 to-cyan-500' : 
                                    'from-rose-500 to-pink-500';
              return (
                <motion.div
                  key={value.title}
                  className="group relative p-8 rounded-2xl bg-card border-2 border-border shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full"
                  variants={slideUp}
                  custom={index}
                >
                  <div className="relative z-10">
                    <div className={cn(
                      "w-14 h-14 rounded-xl mb-4 flex items-center justify-center bg-linear-to-br",
                      gradientColor,
                      "group-hover:scale-110 transition-transform duration-300"
                    )}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              );
            })}
          </motion.div>
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
              <p className="text-muted-foreground leading-relaxed">
                {t('aboutPage.montessori.summary')}
              </p>
              <ul className="space-y-2 list-none">
                {((messages.aboutPage as { montessori?: { bullets?: string[] } })?.montessori?.bullets ?? []).map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={slideUp} className="relative">
              <div className="relative h-80 rounded-xl overflow-hidden shadow hover:shadow-xl transition-all duration-300">
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
            <motion.div variants={slideUp} className="flex flex-col justify-center gap-4 rounded-xl bg-white/50 dark:bg-card/80 backdrop-blur-sm p-8 border-0 shadow hover:shadow-xl transition-all duration-300 h-full">
              {((messages.aboutPage as { team?: { highlights?: string[] } })?.team?.highlights || []).map((highlight: string, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {i === 2 ? '🎓' : '👩‍🏫'}
                  </div>
                  <span className="font-medium text-foreground">{highlight}</span>
                </div>
              ))}
            </motion.div>
            <motion.div variants={slideUp} className="space-y-4 rounded-xl bg-white/50 dark:bg-card/80 backdrop-blur-sm p-8 border-0 shadow hover:shadow-xl transition-all duration-300">
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
              href="/#programs"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              {t('aboutPage.story.ctaPrograms')}
            </Link>
            <Link
              href="/#contact-form"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {t('aboutPage.story.ctaVisit')}
            </Link>
          </div>
        </div>
      </motion.section>
    </>
  );
}
