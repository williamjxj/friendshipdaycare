'use client';

import { useState, useEffect, useMemo, memo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useLanguage } from '@/contexts/LanguageContext';

// Memoized NavLink component to prevent unnecessary re-renders
const NavLink = memo(function NavLink({
  href,
  name,
  isActive,
}: {
  href: string;
  name: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={`px-3 py-2 text-sm font-semibold transition-colors relative group ${
        isActive
          ? 'text-primary'
          : 'text-muted-foreground hover:text-primary'
      }`}
    >
      {name}
      {/* Subtle indicator for active state */}
      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`} />
    </Link>
  );
});

NavLink.displayName = 'NavLink';

// Memoized Mobile NavLink component
const MobileNavLink = memo(function MobileNavLink({
  href,
  name,
  isActive,
  onClick,
}: {
  href: string;
  name: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      className={`block px-4 py-3 rounded-md text-base font-medium transition-colors border-l-4 ${
        isActive
          ? 'border-primary text-primary bg-primary/5'
          : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted'
      }`}
      onClick={onClick}
    >
      {name}
    </Link>
  );
});

MobileNavLink.displayName = 'MobileNavLink';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Base navigation structure - always the same to prevent hydration mismatch
  const navigationBase = useMemo(() => [
    { key: 'home', href: '/' },
    { key: 'about', href: '/about' },
    { key: 'programs', href: '/programs' },
    { key: 'enrollment', href: '/enrollment' },
    { key: 'gallery', href: '/gallery' },
    { key: 'contact', href: '/contact' },
  ], []);

  // English fallbacks for SSR - must match initial client render
  const fallbackNames: Record<string, string> = useMemo(() => ({
    home: 'Home',
    about: 'About',
    programs: 'Programs',
    enrollment: 'Enrollment',
    gallery: 'Gallery',
    contact: 'Contact',
  }), []);

  // Memoize navigation array to prevent re-renders on route changes
  const navigation = useMemo(() => {
    const getNavName = (key: string) => {
      if (!isHydrated) {
        return fallbackNames[key] || key;
      }
      
      // Use translations after hydration
      try {
        const translationMap: Record<string, string> = {
          home: t('navigation.home'),
          about: t('navigation.about'),
          programs: t('navigation.programs'),
          enrollment: t('navigation.enrollment'),
          gallery: t('navigation.gallery'),
          contact: t('navigation.contact'),
        };
        return translationMap[key] || fallbackNames[key] || key;
      } catch {
        // Fallback if translation fails
        return fallbackNames[key] || key;
      }
    };

    return navigationBase.map(item => ({
      name: getNavName(item.key),
      href: item.href,
      key: item.key, // Add key for stable reference
    }));
  }, [navigationBase, fallbackNames, isHydrated, t]);

  // Memoize active state computation to prevent recalculation
  const activeStates = useMemo(() => {
    const states: Record<string, boolean> = {};
    navigation.forEach(item => {
      if (item.href === '/') {
        states[item.href] = pathname === '/' || pathname.endsWith('/');
      } else {
        states[item.href] = pathname.includes(item.href);
      }
    });
    return states;
  }, [navigation, pathname]);

  const closeMobileMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="p-1 rounded-full bg-white/50 border border-primary/10 transition-transform group-hover:scale-105">
                <Image
                  src="/images/friendship-corner-daycare-logo.png"
                  alt="Friendship Corner Daycare Logo"
                  width={64}
                  height={48}
                  className="w-12 h-10 object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-primary tracking-tight">
                  Friendship Corner
                </span>
                <span className="text-xs text-muted-foreground font-medium tracking-wide uppercase">
                  Montessori Daycare
                </span>
              </div>
            </Link>
          </div>

          {/* Regular Navigation */}
          <nav className="hidden md:flex space-x-1" suppressHydrationWarning>
            {navigation.map((item) => (
              <NavLink
                key={item.key || item.href}
                href={item.href}
                name={item.name}
                isActive={activeStates[item.href] || false}
              />
            ))}
          </nav>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageToggle />
            <ThemeToggle />
            <Link href="/contact" className="warm-button text-sm px-4 py-2">
              Book a Tour
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-primary hover:bg-primary/5 transition-colors"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden" suppressHydrationWarning>
            <div className="px-2 pt-2 pb-6 space-y-1 border-t border-border bg-background/95 backdrop-blur-md">
              {navigation.map((item) => (
                <MobileNavLink
                  key={item.key || item.href}
                  href={item.href}
                  name={item.name}
                  isActive={activeStates[item.href] || false}
                  onClick={closeMobileMenu}
                />
              ))}
              <div className="pt-4 px-4">
                <Link 
                  href="/contact" 
                  onClick={closeMobileMenu}
                  className="block w-full text-center warm-button"
                >
                  Book a Tour
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
