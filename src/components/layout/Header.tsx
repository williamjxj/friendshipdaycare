'use client';

import { useState, useEffect, useMemo, memo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
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
  ChevronDown,
  FileText,
  HelpCircle,
  Shield,
  DollarSign,
  FolderOpen,
  UserCircle,
  Star
} from 'lucide-react';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { getImageUrl } from '@/lib/image-utils';

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


export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Updated Navigation Structure - Standard items + Community dropdown with Story and Journal only
  const navigationConfig: NavItem[] = useMemo(() => [
    { key: 'home', href: '/', icon: Home },
    { key: 'about', href: '/about', icon: Info },
    { key: 'programs', href: '/programs', icon: BookOpen },
    { key: 'enrollment', href: '/enrollment', icon: UserPlus },
    {
      key: 'community',
      icon: Users,
      children: [
        { key: 'todays-story', href: '/community/todays-story', icon: BookMarked },
        { key: 'journal', href: '/community/journal', icon: Newspaper },
        // Note: Other items (blog, faq, policies, pricing, resources, team, testimonials) 
        // are in (unused) folder and can be accessed directly via URL if needed
      ]
    },
    { key: 'gallery', href: '/gallery', icon: Images },
    { key: 'contact', href: '/contact', icon: MessageCircle },
  ], []);

  // Translations
  const getTransName = useCallback((key: string) => {
    if (!isHydrated) return key.charAt(0).toUpperCase() + key.slice(1).replace('-', ' ');

    // Mapping keys to translation strings
    // Note: You need to ensure these exist in your en.json/fr.json
    const map: Record<string, string> = {
      home: t('navigation.home'),
      about: t('navigation.about'),
      programs: t('navigation.programs'),
      enrollment: t('navigation.enrollment'),
      community: "Community", // Fallback or add to json
      'todays-story': t('navigation.todaysStory'),
      journal: t('navigation.journal'),
      gallery: t('navigation.gallery'),
      contact: t('navigation.contact'),
    };
    return map[key] || key;
  }, [isHydrated, t]);

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={"/logo.svg"}
                  alt="Friendship Corner Daycare"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg md:text-xl text-primary leading-none group-hover:text-secondary transition-colors duration-300">
                  Friendship Corner
                </span>
                <span className="text-[0.65rem] md:text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  Montessori Daycare
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" suppressHydrationWarning>
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

              // Normal Link Logic
              const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href!);
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

          {/* Desktop Controls */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageToggle />
            <ThemeToggle />
            <Link href="/contact" className="warm-button text-sm px-4 py-2">
              Book a Tour
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-primary hover:bg-primary/5 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
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

                return (
                  <Link
                    key={item.key}
                    href={item.href!}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium transition-colors border-l-4",
                      "min-h-[44px]", // Mobile touch target
                      (item.href === '/' ? pathname === '/' : pathname.startsWith(item.href!))
                        ? 'border-primary text-primary bg-primary/5'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {name}
                  </Link>
                );
              })}
              <div className="pt-4 px-4 sticky bottom-0 bg-background pb-4">
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center warm-button min-h-[44px] flex items-center justify-center"
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
