'use client';

import { useState, useEffect, useMemo, memo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useLanguage } from '@/contexts/LanguageContext';

// Constants outside component to prevent recreation on every render
const NAV_EMOJIS = ['🏠', '📖', '🎨', '💰', '📝', '👥', '📸', '📞'];
const NAV_COLORS = ['pink', 'purple', 'blue', 'green', 'orange', 'indigo', 'teal', 'pink'];

// Memoized NavLink component to prevent unnecessary re-renders
const NavLink = memo(function NavLink({
  href,
  name,
  emoji,
  color,
  isActive,
}: {
  href: string;
  name: string;
  emoji: string;
  color: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
        isActive
          ? 'playful-button'
          : `text-${color}-600 hover:bg-${color}-100`
      }`}
    >
      {emoji} {name}
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
      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
        isActive
          ? 'text-primary bg-primary/10'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
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
    { key: 'pricing', href: '/pricing' },
    { key: 'enrollment', href: '/enrollment' },
    { key: 'team', href: '/team' },
    { key: 'gallery', href: '/gallery' },
    { key: 'blog', href: '/blog' },
    { key: 'faq', href: '/faq' },
    { key: 'resources', href: '/resources' },
    { key: 'contact', href: '/contact' },
  ], []);

  // English fallbacks for SSR - must match initial client render
  const fallbackNames: Record<string, string> = useMemo(() => ({
    home: 'Home',
    about: 'About',
    programs: 'Programs',
    pricing: 'Pricing',
    enrollment: 'Enrollment',
    team: 'Team',
    gallery: 'Gallery',
    blog: 'Blog',
    faq: 'FAQ',
    resources: 'Resources',
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
          pricing: t('navigation.pricing'),
          enrollment: t('navigation.enrollment'),
          team: t('navigation.team'),
          gallery: t('navigation.gallery'),
          blog: 'Blog',
          faq: 'FAQ',
          resources: 'Resources',
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
    <header className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 border-b-4 border-pink-200 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Magical Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3 fun-hover">
              <div className="child-friendly-card p-1">
                <Image
                  src="/images/friendship-corner-daycare-logo.png"
                  alt="Friendship Corner Daycare Logo"
                  width={64}
                  height={48}
                  className="w-16 h-12 object-contain"
                  priority
                />
              </div>
              <div>
                <span className="font-display font-bold text-xl rainbow-text">
                  Friendship Corner
                </span>
                <div className="text-sm text-purple-600 font-medium">
                  🌟 Where Dreams Take Flight 🌟
                </div>
              </div>
            </Link>
          </div>

          {/* Fun Navigation */}
          <nav className="hidden md:flex space-x-2" suppressHydrationWarning>
            {navigation.map((item, index) => (
              <NavLink
                key={item.key || item.href}
                href={item.href}
                name={item.name}
                emoji={NAV_EMOJIS[index]}
                color={NAV_COLORS[index]}
                isActive={activeStates[item.href] || false}
              />
            ))}
          </nav>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageToggle />
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
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
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border">
              {navigation.map((item) => (
                <MobileNavLink
                  key={item.key || item.href}
                  href={item.href}
                  name={item.name}
                  isActive={activeStates[item.href] || false}
                  onClick={closeMobileMenu}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
