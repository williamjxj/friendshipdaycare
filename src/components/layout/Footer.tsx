'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { PhoneIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">F</span>
              </div>
              <span className="font-display font-semibold text-lg text-foreground">
                Friendship Corner
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t('about.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{t('navigation.home')}</h3>
            <nav className="space-y-2">
              <Link
                href="/about"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('navigation.about')}
              </Link>
              <Link
                href="/programs"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('navigation.programs')}
              </Link>
              <Link
                href="/gallery"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('navigation.gallery')}
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('navigation.contact')}
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{t('contact.title')}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{t('footer.phone')}</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPinIcon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{t('contact.address')}</span>
              </div>
              <div className="flex items-start space-x-3">
                <ClockIcon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{t('contact.operatingHours')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-muted-foreground">
              {t('footer.copyright')}
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Montessori Excellence Since 2008
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
