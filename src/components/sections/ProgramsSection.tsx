'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function ProgramsSection() {
  const t = useTranslations();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const programs = [
    {
      key: 'toddler',
      image: '/images/toddler-program.svg',
      color: 'primary',
      icon: 'T'
    },
    {
      key: 'preschool',
      image: '/images/preschool-program.svg',
      color: 'secondary',
      icon: 'P'
    },
    {
      key: 'prekindergarten',
      image: '/images/prekindergarten-program.svg',
      color: 'accent',
      icon: 'K'
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            {t('programs.title')}
          </h2>
          <p className="text-lg text-muted-foreground w-full text-center">
            {t('programs.subtitle')}
          </p>
        </motion.div>
        
        {/* Programs Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {programs.map((program, index) => (
            <motion.div
              key={program.key}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* Program Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={program.image}
                    alt={t(`programs.${program.key}.title`)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Program Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className={`w-12 h-12 bg-${program.color}/20 rounded-lg flex items-center justify-center`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className={`text-${program.color} font-bold text-xl`}>
                        {program.icon}
                      </span>
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {t(`programs.${program.key}.title`)}
                      </h3>
                      <p className={`text-sm text-${program.color} font-medium`}>
                        {t(`programs.${program.key}.age`)}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {t(`programs.${program.key}.description`)}
                  </p>

                  {/* Program Features */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 bg-${program.color}/20 rounded-full flex items-center justify-center`}>
                        <span className={`text-${program.color} text-xs`}>✓</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {program.key === 'toddler' && 'Social Skills Development'}
                        {program.key === 'preschool' && 'Creative Expression'}
                        {program.key === 'prekindergarten' && 'School Readiness'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 bg-${program.color}/20 rounded-full flex items-center justify-center`}>
                        <span className={`text-${program.color} text-xs`}>✓</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {program.key === 'toddler' && 'Independence Building'}
                        {program.key === 'preschool' && 'Hands-on Learning'}
                        {program.key === 'prekindergarten' && 'Advanced Concepts'}
                      </span>
                    </div>
                  </div>

                  {/* Learn More Button */}
                  <motion.div
                    className="pt-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href="/programs"
                      className={`inline-flex items-center space-x-2 text-${program.color} hover:text-${program.color}/80 font-medium text-sm transition-colors`}
                    >
                      <span>Learn More</span>
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center pt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/programs"
              className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              View All Programs
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
