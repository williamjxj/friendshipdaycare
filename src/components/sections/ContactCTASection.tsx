'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { PhoneIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

export function ContactCTASection() {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity
      }
    }
  };

  return (
    <section ref={ref} className="relative py-20 bg-primary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-primary-foreground rounded-full" />
        <div className="absolute top-20 right-20 w-24 h-24 border-2 border-primary-foreground rounded-lg rotate-45" />
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border-2 border-primary-foreground rounded-full" />
        <div className="absolute bottom-10 right-1/3 w-20 h-20 border-2 border-primary-foreground rounded-lg rotate-12" />
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-16 right-16 w-12 h-12 bg-primary-foreground/20 rounded-full"
        variants={floatingVariants}
        animate="animate"
      />
      
      <motion.div
        className="absolute bottom-24 left-16 w-16 h-16 bg-primary-foreground/15 rounded-lg"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '1s' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center space-y-8"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-display font-bold text-primary-foreground"
          >
            {t('contact.subtitle')}
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed"
          >
            Ready to give your child the best start? Contact us today to learn more about our Montessori programs and schedule a visit.
          </motion.p>

          {/* Contact Info Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <motion.div
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 text-center"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <PhoneIcon className="h-6 w-6 text-primary-foreground" />
              </motion.div>
              <h3 className="font-semibold text-primary-foreground mb-2">{t('contact.phone')}</h3>
              <p className="text-primary-foreground/90">{t('footer.phone')}</p>
            </motion.div>

            <motion.div
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 text-center"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <MapPinIcon className="h-6 w-6 text-primary-foreground" />
              </motion.div>
              <h3 className="font-semibold text-primary-foreground mb-2">{t('contact.location')}</h3>
              <p className="text-primary-foreground/90">{t('contact.address')}</p>
            </motion.div>

            <motion.div
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 text-center"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <ClockIcon className="h-6 w-6 text-primary-foreground" />
              </motion.div>
              <h3 className="font-semibold text-primary-foreground mb-2">{t('contact.hours')}</h3>
              <p className="text-primary-foreground/90">{t('contact.operatingHours')}</p>
            </motion.div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="inline-block bg-primary-foreground text-primary px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                {t('navigation.contact')}
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href={`tel:${t('footer.phone').replace(/\D/g, '')}`}
                className="inline-block border-2 border-primary-foreground text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                Call Now
              </a>
            </motion.div>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            variants={itemVariants}
            className="pt-8"
          >
            <div className="inline-flex items-center space-x-4 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-6 py-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary-foreground rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-xs">✓</span>
                </div>
                <span className="text-primary-foreground/90 text-sm font-medium">Licensed & Insured</span>
              </div>
              <div className="w-px h-4 bg-primary-foreground/30" />
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary-foreground rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-xs">★</span>
                </div>
                <span className="text-primary-foreground/90 text-sm font-medium">16+ Years Experience</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
