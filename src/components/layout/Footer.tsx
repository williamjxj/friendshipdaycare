'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Clock,
  Smartphone
} from 'lucide-react';
import QRCode from 'react-qr-code';
import { businessProfile } from '@/lib/business-profile';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  // In a real app, this would be the deployed domain. Using a placeholder or internal logic.
  const siteUrl = businessProfile.url;

  return (
    <footer className="bg-slate-50 border-t border-border/50 pt-6 sm:pt-16 lg:pt-20 pb-4 sm:pb-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-8 lg:gap-12 mb-6 sm:mb-12">

          {/* Column 1: Brand & About */}
          <div className="space-y-3 sm:space-y-6">
            <Link href="/" className="flex items-center space-x-3 group w-fit">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/logo.png"
                  alt="Friendship Corner"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-display font-bold text-lg sm:text-xl text-foreground leading-none">
                  Friendship Corner
                </span>
                <span className="text-[0.65rem] sm:text-[0.7rem] text-muted-foreground uppercase tracking-widest font-semibold mt-1">
                  Montessori Daycare
                </span>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="min-w-0">
            <h3 className="footer-section-title text-foreground mb-2 sm:mb-6">{t('footer.quickLinks.title')}</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/programs" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                  {t('footer.quickLinks.programs')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                  {t('footer.quickLinks.about')}
                </Link>
              </li>
              <li>
                <Link href="/enrollment" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                  {t('footer.quickLinks.enrollment')}
                </Link>
              </li>
              <li>
                <Link href="/community/todays-story" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                  {t('footer.quickLinks.todaysStory')}
                </Link>
              </li>
              <li>
                <Link href="/community/journal" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                  {t('footer.quickLinks.journal')}
                </Link>
              </li>
              <li>
                <Link href="/community/montessori" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                  {t('footer.quickLinks.montessori')}
                </Link>
              </li>
              <li>
                <Link href="/community/ece" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                  {t('footer.quickLinks.bcEarlyLearning')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="min-w-0">
            <h3 className="footer-section-title text-foreground mb-2 sm:mb-6">{t('footer.resources.title')}</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/canva" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                  {t('footer.resources.canva1')}
                </Link>
              </li>
              <li>
                <Link href="/canva2" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                  {t('footer.resources.canva2')}
                </Link>
              </li>
              <li>
                <Link href="/gamma" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                  {t('footer.resources.gamma')}
                </Link>
              </li>
              <li>
                <Link href="/slide-deck" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                  {t('footer.resources.slideDeck')}
                </Link>
              </li>
              <li>
                <a
                  href="https://pub-fafb0f1d538f40ebb6fdd21bb5041a1c.r2.dev/collects/notebooklm-slides.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                  {t('footer.resources.notebookSlides')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="min-w-0">
            <h3 className="footer-section-title text-foreground mb-2 sm:mb-6">{t('footer.contact.title')}</h3>
            <ul className="space-y-2 sm:space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="break-words min-w-0">
                  {businessProfile.address.streetAddress}<br />
                  {businessProfile.address.addressLocality}, {businessProfile.address.addressRegion} {businessProfile.address.postalCode} {businessProfile.address.addressCountry}
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground min-h-[44px]">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href={`tel:${businessProfile.telephone.replace(/\D/g, '')}`} className="hover:text-primary transition-colors break-all">
                  {businessProfile.telephone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground min-h-[44px]">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href={`mailto:${businessProfile.email}`} className="hover:text-primary transition-colors break-all">
                  {businessProfile.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <span>
                  {t('footer.contact.hoursWeekdays')}<br />
                  {t('footer.contact.hoursWeekend')}
                </span>
              </li>
            </ul>
          </div>

          {/* Column 5: Mobile Access (QR Code) */}
          <div className="text-center md:text-left min-w-0">
            <h3 className="footer-section-title text-foreground mb-2 sm:mb-4 flex items-center justify-center md:justify-start gap-2">
              <Smartphone className="w-5 h-5 text-primary shrink-0" />
              {t('footer.mobileAccess.title')}
            </h3>
            <div className="bg-white p-2 rounded-lg inline-block shadow-sm mx-auto md:mx-0 w-[100px] sm:w-[120px]">
              <QRCode
                value={siteUrl}
                size={96}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                viewBox={`0 0 256 256`}
              />
            </div>
            <p className="text-[10px] text-muted-foreground/60 mt-1 sm:mt-2">
              {t('footer.mobileAccess.scan')}
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-4 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-xs text-muted-foreground text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-1.5 sm:gap-4">
            <p className="break-words">&copy; {currentYear} {t('footer.brandName')}. {t('footer.rightsReserved')}</p>
            <span className="hidden md:inline text-muted-foreground/40">|</span>
            <p className="flex flex-wrap items-center justify-center gap-1">
              {t('footer.siteBy')} <a
                href="https://www.bestitconsulting.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors font-medium inline-flex items-center gap-1 min-h-[44px] min-w-[44px] justify-center"
              >
                <Image
                  src="/bestit-11.ico"
                  alt="Best IT Consulting"
                  width={24}
                  height={24}
                  className="h-5 w-auto object-contain shrink-0"
                />
                Best IT Consulting
              </a>
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {t('footer.links.privacy')}
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {t('footer.links.terms')}
            </Link>
            <Link
              href="/sitemap"
              className="hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {t('footer.links.sitemap')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
