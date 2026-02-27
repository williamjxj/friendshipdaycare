'use client';

import Link from 'next/link';
import { Phone, Calendar } from 'lucide-react';
import { businessProfile } from '@/lib/business-profile';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

/** Min 44×44pt touch targets per FR-005 */
const TOUCH_MIN = 'min-h-[44px] min-w-[44px]';

/**
 * Sticky mobile CTA bar: Call Us + Book a Tour.
 * Visible on viewports <768px. FR-007: primary actions reachable.
 */
export function MobileCtaBar() {
  const { t } = useLanguage();
  const digits = businessProfile.telephone.replace(/\D/g, '');
  const tel = digits.length === 10 ? `tel:+1${digits}` : `tel:+${digits}`;

  return (
    <div
      className={cn(
        'md:hidden fixed bottom-0 left-0 right-0 z-50',
        'flex gap-3 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]',
        'bg-background/95 backdrop-blur-sm border-t border-border shadow-lg'
      )}
      role="complementary"
      aria-label="Mobile quick actions"
    >
      <a
        href={tel}
        className={cn(
          'flex-1 flex items-center justify-center gap-2',
          'bg-primary text-primary-foreground font-semibold rounded-lg py-3 px-4',
          TOUCH_MIN,
          'hover:opacity-90 transition-opacity'
        )}
        aria-label="Call us"
      >
        <Phone className="size-5 shrink-0" aria-hidden />
        <span>Call Us</span>
      </a>
      <Link
        href="/contact#contact-form"
        className={cn(
          'flex-1 flex items-center justify-center gap-2',
          'bg-primary text-primary-foreground font-semibold rounded-lg py-3 px-4',
          TOUCH_MIN,
          'hover:opacity-90 transition-opacity'
        )}
        aria-label="Book a tour"
      >
        <Calendar className="size-5 shrink-0" aria-hidden />
        <span>{t('home.hero.scheduleTour')}</span>
      </Link>
    </div>
  );
}
