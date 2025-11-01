import { useState, useEffect, useLayoutEffect } from 'preact/hooks';
import { ThemeContext } from '../contexts/ThemeContext';
import type { Theme } from '../types/theme';

export const ThemeProvider = ({ children }: { children: preact.ComponentChildren }) => {
  const [theme, setTheme] = useState<Theme>('system');

  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem('app:theme') as Theme | null;
    const initialTheme = savedTheme || 'system';
    setTheme(initialTheme);

    const htmlElement = document.documentElement;
    htmlElement.setAttribute('data-theme', initialTheme);

    if (initialTheme === 'dark' || (initialTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      htmlElement.classList.add('is-dark');
    } else {
      htmlElement.classList.remove('is-dark');
    }

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        if (e.matches) {
          htmlElement.classList.add('is-dark');
        } else {
          htmlElement.classList.remove('is-dark');
        }
      }
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('data-theme', theme);

    if (theme === 'system') {
      localStorage.removeItem('app:theme');
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      if (mediaQuery.matches) {
        htmlElement.classList.add('is-dark');
      } else {
        htmlElement.classList.remove('is-dark');
      }
    } else {
      localStorage.setItem('app:theme', theme);
      if (theme === 'dark') {
        htmlElement.classList.add('is-dark');
      } else {
        htmlElement.classList.remove('is-dark');
      }
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};