'use client';

import { useState, useMemo, memo, useCallback, type ComponentType } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import {
  Home,
  Info,
  BookOpen,
  UserPlus,
  Images,
  MessageCircle,
  Calendar,
  Facebook,
  Instagram,
  Phone,
  Mail
} from 'lucide-react';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { businessProfile } from '@/lib/business-profile';

// --- Types ---
type NavItem = {
  key: string;
  href?: string;
  icon: ComponentType<{ className?: string }>;
};

// --- Components ---

// Simple NavLink for top-level items
const NavLink = memo(function NavLink({
  href,
  name,
  icon: Icon,
  isActive,
}: {
  href: string;
  name: string;
  icon: ComponentType<{ className?: string }>;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex min-h-11 items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition-all duration-300",
        isActive
          ? 'bg-primary text-primary-foreground shadow-[0_12px_28px_rgba(59,130,246,0.24)]'
          : 'text-muted-foreground hover:bg-white/70 hover:text-foreground'
      )}
    >
      <span className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300",
        isActive ? 'bg-white/18' : 'bg-primary/8 group-hover:-translate-y-0.5'
      )}>
        <Icon className="h-4.5 w-4.5" />
      </span>
      <span>{name}</span>
    </Link>
  );
});


const HOMEPAGE_SECTION_IDS = ['home', 'about', 'programs', 'gallery', 'testimonials', 'videos', 'enrollment', 'contact'] as const;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const scrollSpyActiveId = useScrollSpy([...HOMEPAGE_SECTION_IDS], 80);

  // Navigation: single-page app — all links are anchors
  const navigationConfig: NavItem[] = useMemo(() => [
    { key: 'home', href: '/#home', icon: Home },
    { key: 'about', href: '/#about', icon: Info },
    { key: 'programs', href: '/#programs', icon: BookOpen },
    { key: 'gallery', href: '/#gallery', icon: Images },
    { key: 'enrollment', href: '/#enrollment', icon: UserPlus },
    { key: 'contact', href: '/#contact', icon: MessageCircle },
  ], []);

  // Translations
  const getNavItemIsActive = useCallback((item: NavItem) => {
    const key = item.key;
    return (
      (key === 'home' && (scrollSpyActiveId === 'home' || !scrollSpyActiveId)) ||
      (key === 'about' && scrollSpyActiveId === 'about') ||
      (key === 'programs' && scrollSpyActiveId === 'programs') ||
      (key === 'gallery' && scrollSpyActiveId === 'gallery') ||
      (key === 'enrollment' && scrollSpyActiveId === 'enrollment') ||
      (key === 'contact' && scrollSpyActiveId === 'contact')
    );
  }, [scrollSpyActiveId]);

  const getTransName = useCallback((key: string) => {
    const map: Record<string, string> = {
      home: t('navigation.home'),
      about: t('navigation.about'),
      programs: t('navigation.programs'),
      enrollment: t('navigation.enrollment'),
      community: t('navigation.community'),
      'todays-story': t('navigation.todaysStory'),
      journal: t('navigation.journal'),
      montessori: t('navigation.montessori'),
      ece: t('navigation.bcEarlyLearning'),
      resources: t('navigation.resources'),
      gallery: t('navigation.gallery'),
      contact: t('navigation.contact'),
    };
    return map[key] || key;
  }, [t]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-3 pt-2 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-[1.35rem] border border-white/65 px-3 sm:px-5">
          <div className="flex min-w-0 items-center justify-between gap-3 h-16 sm:h-[4.4rem]">

            <div className="shrink-0 min-w-0">
              <Link href="/" className="group flex items-center gap-2 min-w-0">
                <div className="relative flex h-11 w-11 shrink-0 items-center transition-transform duration-300 group-hover:rotate-[6deg] group-hover:scale-105 sm:h-12 sm:w-12 md:h-14 md:w-14">
                  <Image
                    src={"/logo.png"}
                    alt="Friendship Corner Daycare"
                    fill
                    sizes="(max-width: 640px) 160px, 200px"
                    className="object-contain"
                    priority
                    unoptimized
                  />
                </div>
                <div className="min-w-0">
                  <div className="font-display text-sm font-extrabold leading-tight text-primary sm:text-lg md:text-[1.05rem]">
                    Friendship Corner
                  </div>
                  <div className="text-[0.58rem] uppercase tracking-[0.24em] text-primary/75 sm:text-[0.68rem]">
                    Montessori Daycare
                  </div>
                </div>
              </Link>
            </div>

            <nav className="hidden lg:flex items-center rounded-full bg-white/55 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]" suppressHydrationWarning>
              {navigationConfig.map((item) => (
                <NavLink
                  key={item.key}
                  href={item.href!}
                  name={getTransName(item.key)}
                  icon={item.icon}
                  isActive={getNavItemIsActive(item)}
                />
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-2.5">
              <a
                href={`tel:${businessProfile.telephone.replace(/\D/g, '')}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-cyan-200/70 bg-cyan-50/85 px-3 text-sm font-semibold text-cyan-800 transition-all hover:-translate-y-0.5 hover:bg-cyan-100"
                aria-label={t('contact.phone')}
              >
                <Phone className="h-4 w-4" />
                <span className="hidden xl:inline">{businessProfile.telephone}</span>
              </a>
              <a
                href={`mailto:${businessProfile.email}`}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-amber-200/70 bg-amber-50/85 px-3 text-amber-800 transition-all hover:-translate-y-0.5 hover:bg-amber-100"
                aria-label={t('contact.form.email')}
              >
                <Mail className="h-4 w-4" />
              </a>
              {businessProfile.sameAs?.map((url) => {
                const isFb = url.includes('facebook');
                const isIg = url.includes('instagram');
                if (!isFb && !isIg) return null;
                return (
                  <Link
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border/70 bg-white/80 text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-primary"
                    aria-label={isFb ? 'Facebook' : 'Instagram'}
                  >
                    {isFb ? <Facebook className="h-4.5 w-4.5" /> : <Instagram className="h-4.5 w-4.5" />}
                  </Link>
                );
              })}
              <LanguageToggle />
              <Link
                href="/#contact-form"
                data-testid="header-book-tour"
                className="relative inline-flex min-h-11 items-center gap-2 overflow-hidden rounded-full bg-primary px-4 text-sm font-bold text-primary-foreground shadow-[0_14px_30px_rgba(59,130,246,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(59,130,246,0.34)]"
              >
                <span className="absolute inset-0 bg-linear-to-r from-primary via-secondary to-primary opacity-0 transition-opacity duration-500 hover:opacity-100" />
                <Calendar className="relative z-10 h-4.5 w-4.5 shrink-0" />
                <span className="relative z-10 whitespace-nowrap">{t('header.bookTour')}</span>
              </Link>
            </div>

            <div className="lg:hidden flex items-center gap-2 shrink-0">
              <LanguageToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-primary/15 bg-primary text-primary-foreground shadow-[0_10px_20px_rgba(59,130,246,0.22)] transition-all hover:-translate-y-0.5"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <XMarkIcon className="h-5 w-5" aria-hidden />
                ) : (
                  <Bars3Icon className="h-5 w-5" aria-hidden />
                )}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden pb-3" suppressHydrationWarning>
              <div className="border-t border-border/60 pt-3">
                <div className="fdc-panel px-3 py-3">
                  <div className="grid grid-cols-1 gap-2">
                    {navigationConfig.map((item) => {
                      const isActive = getNavItemIsActive(item);
                      return (
                        <Link
                          key={item.key}
                          href={item.href!}
                          onClick={() => setIsMenuOpen(false)}
                          className={cn(
                            "flex min-h-12 items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all",
                            isActive
                              ? 'bg-primary text-primary-foreground shadow-[0_10px_24px_rgba(59,130,246,0.22)]'
                              : 'bg-white/70 text-foreground hover:bg-muted'
                          )}
                        >
                          <span className={cn(
                            "inline-flex h-8 w-8 items-center justify-center rounded-full",
                            isActive ? 'bg-white/20' : 'bg-primary/8 text-primary'
                          )}>
                            <item.icon className="h-4.5 w-4.5" />
                          </span>
                          {getTransName(item.key)}
                        </Link>
                      );
                    })}
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-2 text-sm">
                    <a href={`tel:${businessProfile.telephone.replace(/\D/g, '')}`} className="fdc-link-card items-center">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan-50 text-cyan-700">
                        <Phone className="h-4.5 w-4.5" />
                      </span>
                      <span className="min-w-0 flex-1 truncate font-semibold text-foreground">{businessProfile.telephone}</span>
                    </a>
                    <a href={`mailto:${businessProfile.email}`} className="fdc-link-card items-center">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-amber-700">
                        <Mail className="h-4.5 w-4.5" />
                      </span>
                      <span className="min-w-0 flex-1 break-all font-semibold text-foreground">{businessProfile.email}</span>
                    </a>
                  </div>
                  <p className="mt-4 rounded-2xl bg-white/70 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                    {businessProfile.address.streetAddress}, {businessProfile.address.addressLocality}, {businessProfile.address.addressRegion} {businessProfile.address.postalCode} {businessProfile.address.addressCountry === 'CA' ? 'Canada' : businessProfile.address.addressCountry}
                  </p>
                  <Link
                    href="/#contact-form"
                    onClick={() => setIsMenuOpen(false)}
                    className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-[0_16px_32px_rgba(59,130,246,0.28)]"
                  >
                    <Calendar className="h-4.5 w-4.5" />
                    <span>{t('header.bookTour')}</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
