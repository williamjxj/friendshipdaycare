'use client';

import { useCallback, useState } from 'react';
import { useTheme, Theme } from '@/contexts/ThemeContext';
import { ChevronDownIcon, SwatchIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/contexts/LanguageContext';

export function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, themes } = useTheme();
  const { t } = useLanguage();

  const currentTheme = themes.find(t => t.value === theme);

  const getThemeLabel = useCallback((value: Theme, fallback?: string) => {
    const label = t(`themeSwitcher.themes.${value}.label`);
    return label || fallback || value;
  }, [t]);

  const getThemeDescription = useCallback((value: Theme, fallback?: string) => {
    const description = t(`themeSwitcher.themes.${value}.description`);
    return description || fallback || '';
  }, [t]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        aria-label={t('themeSwitcher.ariaLabel')}
      >
        <SwatchIcon className="h-4 w-4" />
        <span className="hidden sm:inline">
          {getThemeLabel(theme, currentTheme?.label)}
        </span>
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
          <div className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-md shadow-lg z-20">
            <div className="py-1">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.value}
                  onClick={() => {
                    setTheme(themeOption.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 transition-colors ${
                    theme === themeOption.value
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <div className="font-medium">
                    {getThemeLabel(themeOption.value, themeOption.label)}
                  </div>
                  <div className="text-xs opacity-75 mt-1">
                    {getThemeDescription(themeOption.value, themeOption.description)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
