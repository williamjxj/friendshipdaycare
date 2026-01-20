'use client';

import { useMemo, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronDownIcon, LanguageIcon } from '@heroicons/react/24/outline';
import { locales, type Locale } from '@/i18n/config';
import { languageConfig, useLanguage } from '@/contexts/LanguageContext';

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();

  const languageNames = useMemo(() => {
    return languageConfig.reduce<Record<string, string>>((acc, lang) => {
      acc[lang.code] = lang.name;
      return acc;
    }, {});
  }, []);

  const handleLanguageChange = (newLocale: Locale) => {
    setLanguage(newLocale);

    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0 && locales.includes(pathSegments[0] as typeof locales[number])) {
      pathSegments[0] = newLocale;
      router.push(`/${pathSegments.join('/')}`);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      >
        <LanguageIcon className="h-4 w-4" />
        <span className="hidden sm:inline">{languageNames[language]}</span>
        <ChevronDownIcon className="h-4 w-4" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg z-20">
            <div className="py-1">
              {locales.map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    language === lang
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {languageNames[lang as keyof typeof languageNames]}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
