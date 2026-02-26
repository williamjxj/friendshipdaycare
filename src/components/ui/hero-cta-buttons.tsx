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
 * - Contact form link (defaults to contact page with form anchor)
 * - Phone call button
 */
export function HeroCTAButtons({
  className,
  variant = 'default',
  phoneNumber = '6049458504',
  contactLink = '/contact#contact-form',
}: HeroCTAButtonsProps) {
  const { t } = useLanguage();
  const baseButtonClasses = cn(
    'inline-flex items-center justify-center gap-1.5 px-2 sm:px-2.5 py-2 sm:py-2.5 rounded-lg font-bold text-sm transition-all duration-200 min-h-[34px] sm:min-h-[38px] min-w-0 w-full sm:w-auto sm:max-w-fit',
    'hover:scale-105 active:scale-95 shadow-md hover:shadow-lg box-border',
    variant === 'default'
      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
      : 'bg-primary/95 backdrop-blur-sm border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary shadow-md ring-2 ring-primary/20'
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
    <div className={cn('flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center pt-2 w-full max-w-[min(100%,14rem)] sm:max-w-none min-w-0 px-2 sm:px-0 mx-auto', className)}>
      <Link
        href={contactLink}
        onClick={handleContactClick}
        className={baseButtonClasses}
      >
        <EnvelopeIcon className="w-4 h-4 shrink-0" />
        <span>{t('common.cta.contact')}</span>
      </Link>
      <a
        href={`tel:${phoneNumber}`}
        className={baseButtonClasses}
        aria-label={`Call us at ${phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1.$2.$3')}`}
      >
        <PhoneIcon className="w-4 h-4 shrink-0" />
        <span>{t('common.cta.callNow')}</span>
      </a>
    </div>
  );
}

