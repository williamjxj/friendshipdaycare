'use client';

import { useState, useMemo, useCallback } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { SwatchIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

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

  const handleThemeChange = useCallback((themeValue: typeof theme) => {
    setTheme(themeValue);
    setIsOpen(false);
  }, [setTheme]);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      >
        <SwatchIcon className="h-4 w-4" />
        <span className="hidden sm:inline">{currentTheme?.label}</span>
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
          <div className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-md shadow-lg z-20">
            <div className="py-1">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.value}
                  onClick={() => handleThemeChange(themeOption.value)}
                  className={`w-full text-left px-4 py-3 transition-colors ${
                    theme === themeOption.value
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <div className="font-medium">{themeOption.label}</div>
                  <div className="text-xs opacity-75 mt-1">
                    {themeOption.description}
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
