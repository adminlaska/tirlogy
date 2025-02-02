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
      applyTheme(savedTheme);
    } else {
      applyTheme('system');
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    document.documentElement.classList.remove('light', 'dark');

    if (newTheme === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.add(systemPrefersDark ? 'dark' : 'light');
      document.documentElement.style.colorScheme = systemPrefersDark ? 'dark' : 'light';
    } else {
      document.documentElement.classList.add(newTheme);
      document.documentElement.style.colorScheme = newTheme;
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
      ? 'text-primary-light bg-gray-100 dark:text-primary dark:bg-gray-800'
      : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'
      }`;
  };

  return (
    <div className="flex items-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg p-1 border border-gray-200 dark:border-gray-800">
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