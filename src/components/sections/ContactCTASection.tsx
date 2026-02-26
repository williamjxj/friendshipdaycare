'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { PhoneIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import { businessProfile } from '@/lib/business-profile';
import { borderBeam, gridPattern, shimmer, slideIn, staggerContainerMagic } from '@/lib/magicui-animations';

/**
 * Primary contact call-to-action section with animated highlights.
 */
export function ContactCTASection() {
  const t = useTranslations();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const slideUp = slideIn('up');

  const formattedAddress = `${businessProfile.address.streetAddress}, ${businessProfile.address.addressLocality}, ${businessProfile.address.addressRegion} ${businessProfile.address.postalCode}`;

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
      <div className="absolute inset-0 opacity-15" style={gridPattern} />
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
          variants={staggerContainerMagic}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center space-y-8"
        >
          <motion.h2
            variants={slideUp}
            className="text-3xl md:text-4xl font-display font-bold text-primary-foreground"
          >
            {t('contact.subtitle')}
          </motion.h2>

          <motion.p
            variants={slideUp}
            className="text-xl text-primary-foreground/90 w-full max-w-4xl mx-auto leading-relaxed"
          >
            Ready to give your child the best start? Contact us today to learn more about our Montessori programs and schedule a visit.
          </motion.p>

          {/* Contact Info Cards */}
          <motion.div
            variants={slideUp}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <motion.div
              className="group relative overflow-hidden bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 text-center"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={shimmer}
              />
              <motion.div
                className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <PhoneIcon className="h-6 w-6 text-primary-foreground" />
              </motion.div>
              <h3 className="font-semibold text-primary-foreground mb-2">{t('contact.phone')}</h3>
              <p className="text-primary-foreground/90">{businessProfile.telephone}</p>
            </motion.div>

            <motion.div
              className="group relative overflow-hidden bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 text-center"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={shimmer}
              />
              <motion.div
                className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <MapPinIcon className="h-6 w-6 text-primary-foreground" />
              </motion.div>
              <h3 className="font-semibold text-primary-foreground mb-2">{t('contact.location')}</h3>
              <p className="text-primary-foreground/90">{formattedAddress}</p>
            </motion.div>

            <motion.div
              className="group relative overflow-hidden bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 text-center"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={shimmer}
              />
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
            variants={slideUp}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact#contact-form"
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
                href={`tel:${businessProfile.telephone.replace(/\D/g, '')}`}
                className="inline-block border-2 border-primary-foreground text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                Call Now
              </a>
            </motion.div>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            variants={borderBeam}
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
