'use client';

import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

type Theme = 'system' | 'light' | 'dark';

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
    applyTheme(savedTheme || 'system');
  }, []);

  const applyTheme = (newTheme: Theme) => {
    document.documentElement.classList.remove('light', 'dark');

    if (newTheme === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.add(systemPrefersDark ? 'dark' : 'light');
    } else {
      document.documentElement.classList.add(newTheme);
    }
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [theme]);

  const getButtonClasses = (buttonTheme: Theme) => {
    const isActive = theme === buttonTheme;
    return `p-2 rounded-md transition-colors ${isActive
      ? 'text-[#00A5A8] bg-gray-100 dark:bg-gray-800'
      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
      }`;
  };

  return (
    <div className="flex items-center bg-gray-50 dark:bg-gray-900 rounded-lg p-1">
      <button
        onClick={() => handleThemeChange('system')}
        className={getButtonClasses('system')}
        aria-label="System theme"
      >
        <ComputerDesktopIcon className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleThemeChange('light')}
        className={getButtonClasses('light')}
        aria-label="Light theme"
      >
        <SunIcon className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleThemeChange('dark')}
        className={getButtonClasses('dark')}
        aria-label="Dark theme"
      >
        <MoonIcon className="w-5 h-5" />
      </button>
    </div>
  );
} 