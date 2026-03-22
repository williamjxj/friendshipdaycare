'use client';

import { useState, useEffect, useMemo, memo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import {
  Home,
  Info,
  BookOpen,
  UserPlus,
  Users,
  Images,
  MessageCircle,
  BookMarked,
  Newspaper,
  GraduationCap,
  Landmark,
  ChevronDown,
  FolderOpen,
  Calendar,
  Facebook,
  Instagram,
  Phone,
  Mail
} from 'lucide-react';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { getImageUrl } from '@/lib/image-utils';
import { businessProfile } from '@/lib/business-profile';

// --- Types ---
type NavItem = {
  key: string;
  href?: string;
  icon: any;
  children?: NavItem[];
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
  icon: any;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center px-3 py-2 text-xs font-semibold transition-colors relative group gap-1",
        "min-h-[44px] min-w-[44px] lg:min-w-auto", // Mobile touch target
        isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
      )}
    >
      <Icon className={cn("w-5 h-5 mb-0.5 transition-transform group-hover:-translate-y-1", isActive && "fill-current/10")} />
      <span>{name}</span>
      {/* Active Indicator */}
      <span className={cn(
        "absolute bottom-0 w-8 h-0.5 bg-primary rounded-full transform transition-transform duration-300",
        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-75'
      )} />
    </Link>
  );
});

// Dropdown Menu for Community
const NavDropdown = memo(function NavDropdown({
  name,
  icon: Icon,
  items,
  isActiveParent,
}: {
  name: string;
  icon: any;
  items: { key: string; name: string; href: string; icon: any; isActive: boolean }[];
  isActiveParent: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={cn(
          "flex flex-col items-center justify-center px-3 py-2 text-xs font-semibold transition-colors gap-1",
          "min-h-[44px] min-w-[44px] lg:min-w-auto", // Mobile touch target
          isActiveParent || isOpen ? 'text-primary' : 'text-muted-foreground hover:text-primary'
        )}
      >
        <div className="relative">
          <Icon className={cn("w-5 h-5 mb-0.5 transition-transform group-hover:-translate-y-1", isActiveParent && "fill-current/10")} />
          {/* Active Dot for Parent */}
          {isActiveParent && (
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <span>{name}</span>
          <ChevronDown className={cn("w-3 h-3 transition-transform duration-200", isOpen && "rotate-180")} />
        </div>
      </button>

      {/* Dropdown Content */}
      <div
        className={cn(
          "absolute left-1/2 -translate-x-1/2 top-full pt-2 w-48 z-50 transition-all duration-200 origin-top",
          isOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
        )}
      >
        <div className="bg-card/95 backdrop-blur-md border border-border rounded-xl shadow-xl overflow-hidden p-1">
          {items.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                child.isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <child.icon className="w-4 h-4" />
              {child.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
});


const HOMEPAGE_SECTION_IDS = ['home', 'about', 'programs', 'gallery', 'testimonials', 'videos', 'enrollment', 'contact'] as const;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();
  const scrollSpyActiveId = useScrollSpy([...HOMEPAGE_SECTION_IDS], 80);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

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
    if (item.children) return false;
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
    if (!isHydrated) return key.charAt(0).toUpperCase() + key.slice(1).replace('-', ' ');

    // Mapping keys to translation strings
    // Note: You need to ensure these exist in your en.json/fr.json
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
  }, [isHydrated, t]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-border/50 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 min-w-0">
        <div className="flex justify-between items-center h-16 gap-2 min-w-0">

          {/* Logo and Title - full width, never truncated */}
          <div className="flex-shrink-0 min-w-fit flex items-center ml-3 sm:ml-6 md:ml-10 mr-10">
            <Link href="/" className="flex items-center gap-0.5 min-w-0">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 shrink-0 transition-transform duration-300 flex items-center">
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
              <div className="flex flex-col justify-center min-w-0 w-full h-full group">
                <span className="font-display font-bold text-base sm:text-lg md:text-xl text-primary leading-tight group-hover:text-secondary transition-colors duration-300 whitespace-nowrap w-full">
                  Friendship Corner
                </span>
                <span className="text-[0.48rem] sm:text-[0.6rem] md:text-[0.7rem] text-primary/80 uppercase tracking-[0.18em] font-semibold leading-tight whitespace-nowrap w-full">
                  Montessori Daycare
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 ml-8 flex-shrink-0" suppressHydrationWarning>
            {navigationConfig.map((item) => {
              const name = getTransName(item.key);

              if (item.children) {
                // Dropdown Logic
                const childItems = item.children.map(child => ({
                  ...child,
                  href: child.href!,
                  name: getTransName(child.key),
                  isActive: pathname.startsWith(child.href!)
                }));
                const isActiveParent = childItems.some(c => c.isActive);

                return (
                  <NavDropdown
                    key={item.key}
                    name={name}
                    icon={item.icon}
                    items={childItems}
                    isActiveParent={isActiveParent}
                  />
                );
              }

              const isActive = getNavItemIsActive(item);
              return (
                <NavLink
                  key={item.key}
                  href={item.href!}
                  name={name}
                  icon={item.icon}
                  isActive={isActive}
                />
              );
            })}
          </nav>

          {/* Desktop Controls - contact links + social */}
          <div className="hidden lg:flex items-center space-x-3 sm:space-x-4">
            <a
              href={`tel:${businessProfile.telephone.replace(/\D/g, '')}`}
              className="text-muted-foreground hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={t('contact.phone')}
            >
              <Phone className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${businessProfile.email}`}
              className="text-muted-foreground hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={t('contact.form.email')}
            >
              <Mail className="w-5 h-5" />
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
                  className="text-muted-foreground hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label={isFb ? 'Facebook' : 'Instagram'}
                >
                  {isFb ? <Facebook className="w-5 h-5" /> : <Instagram className="w-5 h-5" />}
                </Link>
              );
            })}
            <LanguageToggle />
            {/* <ThemeToggle /> - Hidden for now */}
            <Link
              href="/#contact-form"
              data-testid="header-book-tour"
              className="relative overflow-hidden warm-button text-[0.6rem] px-2 py-2 flex items-center gap-1.5 group/cta shadow-md hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap !h-[26px] !min-h-0 !rounded-md"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500 bg-[length:200%_auto] group-hover/cta:animate-[gradient_3s_linear_infinite]" />
              <Calendar className="relative z-10 w-6 h-6 shrink-0 transition-transform group-hover/cta:rotate-12" />
              <span className="relative z-10 font-bold">{t('header.bookTour')}</span>
            </Link>
          </div>

          {/* Mobile: Language, Theme, then prominent menu button - never clipped */}
          <div className="lg:hidden flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <LanguageToggle />
            {/* <ThemeToggle /> - Hidden for now */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 hover:border-primary/30 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center shadow-sm"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden" suppressHydrationWarning>
            <div className="px-2 pt-2 pb-6 space-y-1 border-t border-border bg-background/95 backdrop-blur-md max-h-[80vh] overflow-y-auto">
              {navigationConfig.map((item) => {
                const name = getTransName(item.key);

                if (item.children) {
                  return (
                    <div key={item.key} className="space-y-1">
                      <div className="px-4 py-2 font-semibold text-muted-foreground flex items-center gap-2">
                        <item.icon className="w-5 h-5" />
                        {name}
                      </div>
                      <div className="pl-4 border-l-2 border-border ml-6 space-y-1">
                        {item.children.map(child => (
                          <Link
                            key={child.key}
                            href={child.href!}
                            onClick={() => setIsMenuOpen(false)}
                            className={cn(
                              "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
                              "min-h-[44px]", // Mobile touch target
                              pathname.startsWith(child.href!)
                                ? "text-primary bg-primary/5"
                                : "text-muted-foreground hover:bg-muted"
                            )}
                          >
                            <child.icon className="w-4 h-4" />
                            {getTransName(child.key)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                const isActive = getNavItemIsActive(item);
                return (
                  <Link
                    key={item.key}
                    href={item.href!}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium transition-colors border-l-4",
                      "min-h-[44px]", // Mobile touch target
                      isActive
                        ? 'border-primary text-primary bg-primary/5'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {name}
                  </Link>
                );
              })}
              <div className="pt-4 px-4 space-y-3 sticky bottom-0 bg-background pb-4 border-t border-border">
                <div className="flex flex-col gap-2 text-sm">
                  <a href={`tel:${businessProfile.telephone.replace(/\D/g, '')}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary px-4 py-2">
                    <Phone className="w-4 h-4 shrink-0" />
                    {businessProfile.telephone}
                  </a>
                  <a href={`mailto:${businessProfile.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary px-4 py-2 break-all">
                    <Mail className="w-4 h-4 shrink-0" />
                    {businessProfile.email}
                  </a>
                  <p className="px-4 py-2 text-muted-foreground text-xs leading-snug">
                    {businessProfile.address.streetAddress}, {businessProfile.address.addressLocality}, {businessProfile.address.addressRegion} {businessProfile.address.postalCode} {businessProfile.address.addressCountry === 'CA' ? 'Canada' : businessProfile.address.addressCountry}
                  </p>
                </div>
                <Link
                  href="/#contact-form"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center warm-button min-h-[44px] py-2 flex items-center justify-center gap-2 shadow-md text-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t('header.bookTour')}</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
