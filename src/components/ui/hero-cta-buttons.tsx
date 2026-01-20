'use client';

import React from 'react';
import Link from 'next/link';
import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeroCTAButtonsProps {
  className?: string;
  variant?: 'default' | 'outlined';
  phoneNumber?: string;
  contactLink?: string;
}

/**
 * CTA buttons for hero sections
 * - Contact form link
 * - Phone call button
 */
export function HeroCTAButtons({
  className,
  variant = 'default',
  phoneNumber = '6049458504',
  contactLink = '/contact',
}: HeroCTAButtonsProps) {
  const { t } = useLanguage();
  const baseButtonClasses = cn(
    'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-lg transition-all duration-200 min-h-[44px]',
    'hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl',
    variant === 'default'
      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
      : 'bg-primary/95 backdrop-blur-sm border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary shadow-xl ring-2 ring-primary/20'
  );

  // Handle hash links for smooth scrolling
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (contactLink.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(contactLink);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className={cn('flex flex-col sm:flex-row gap-4 justify-center pt-4', className)}>
      <Link
        href={contactLink}
        onClick={handleContactClick}
        className={baseButtonClasses}
      >
        <EnvelopeIcon className="w-5 h-5" />
        <span>{t('common.cta.contact')}</span>
      </Link>
      <a
        href={`tel:${phoneNumber}`}
        className={baseButtonClasses}
        aria-label={`Call us at ${phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1.$2.$3')}`}
      >
        <PhoneIcon className="w-5 h-5" />
        <span>{t('common.cta.callNow')}</span>
      </a>
    </div>
  );
}

