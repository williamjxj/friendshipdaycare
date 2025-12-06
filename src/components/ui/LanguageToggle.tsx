'use client';

import { useState, useMemo, useCallback } from 'react';
import { LanguageIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useLanguage, languageConfig } from '@/contexts/LanguageContext';

export function LanguageToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  // Memoize current language lookup
  const currentLang = useMemo(() => 
    languageConfig.find(lang => lang.code === language),
    [language]
  );

  // Memoize handler to prevent re-renders
  const handleLanguageChange = useCallback((langCode: string) => {
    setLanguage(langCode as 'en' | 'zh' | 'ko' | 'es' | 'fr');
    setIsOpen(false);
  }, [setLanguage]);

  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      >
        <LanguageIcon className="h-4 w-4" />
        <span className="hidden sm:inline">{currentLang?.flag} {currentLang?.name}</span>
        <ChevronDownIcon className="h-4 w-4" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={closeDropdown}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg z-20">
            <div className="py-1">
              {languageConfig.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center space-x-3 ${
                    language === lang.code
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
