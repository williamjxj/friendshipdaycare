'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useLanguage } from '@/contexts/LanguageContext';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Use static navigation during SSR to prevent hydration mismatch
  const navigation = isHydrated ? [
    { name: t('navigation.home'), href: '/' },
    { name: t('navigation.about'), href: '/about' },
    { name: t('navigation.programs'), href: '/programs' },
    { name: t('navigation.pricing'), href: '/pricing' },
    { name: t('navigation.enrollment'), href: '/enrollment' },
    { name: t('navigation.team'), href: '/team' },
    { name: t('navigation.gallery'), href: '/gallery' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Resources', href: '/resources' },
    { name: t('navigation.contact'), href: '/contact' },
  ] : [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Programs', href: '/programs' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Enrollment', href: '/enrollment' },
    { name: 'Team', href: '/team' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Resources', href: '/resources' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname.endsWith('/');
    }
    return pathname.includes(href);
  };

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
          <nav className="hidden md:flex space-x-2">
            {navigation.map((item, index) => {
              const emojis = ['🏠', '📖', '🎨', '💰', '📝', '👥', '📸', '📞'];
              const colors = ['pink', 'purple', 'blue', 'green', 'orange', 'indigo', 'teal', 'pink'];
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                    isActive(item.href)
                      ? 'playful-button'
                      : `text-${colors[index]}-600 hover:bg-${colors[index]}-100`
                  }`}
                >
                  {emojis[index]} {item.name}
                </Link>
              );
            })}
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
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
