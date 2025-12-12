'use client';

import { useState, useMemo, useCallback } from 'react';
import { useTheme, Theme } from '@/contexts/ThemeContext';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

// Color mapping for the theme dots
const THEME_COLORS: Record<Theme, string> = {
  professional: '#2563EB', // Blue
  default: '#2C5F4D',      // Sage Green
  nature: '#3F6212',       // Olive
  playful: '#FF6B9D',      // Pink
  dark: '#1A1D1C',         // Dark Grey
  violet: '#00D68F',       // Bright Green (approximate from oklch)
};

export function ThemeToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, themes } = useTheme();

  // Memoize current theme lookup
  const currentTheme = useMemo(() =>
    themes.find(t => t.value === theme),
    [themes, theme]
  );

  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleThemeChange = useCallback((themeValue: Theme) => {
    setTheme(themeValue);
    setIsOpen(false);
  }, [setTheme]);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors border border-transparent hover:border-border"
        aria-label="Switch theme"
      >
        {/* Active Theme Dot */}
        <div
          className="w-4 h-4 rounded-full border border-gray-200 shadow-sm"
          style={{ backgroundColor: THEME_COLORS[theme] || '#ccc' }}
        />
        <span className="hidden sm:inline">{currentTheme?.label}</span>
        <ChevronDownIcon className="h-3 w-3 opacity-50" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={closeDropdown}
          />

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-xl z-20 overflow-hidden ring-1 ring-black/5">
            <div className="py-1">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.value}
                  onClick={() => handleThemeChange(themeOption.value)}
                  className={`w-full flex items-start space-x-3 px-4 py-3 transition-colors text-left ${theme === themeOption.value
                      ? 'bg-muted/50'
                      : 'hover:bg-muted/30'
                    }`}
                >
                  {/* Theme Color Dot */}
                  <div
                    className="w-4 h-4 rounded-full mt-1 flex-shrink-0 border border-gray-200 shadow-sm"
                    style={{ backgroundColor: THEME_COLORS[themeOption.value] }}
                  />

                  <div>
                    <div className={`font-medium text-sm ${theme === themeOption.value ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                      {themeOption.label}
                    </div>
                    <div className="text-xs text-muted-foreground/60 mt-0.5 line-clamp-1">
                      {themeOption.description}
                    </div>
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
