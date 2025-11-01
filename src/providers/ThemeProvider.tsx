import { useState, useEffect, useLayoutEffect, useCallback, useRef } from 'preact/hooks';
import { ThemeContext } from '../contexts/ThemeContext';
import type { Theme } from '../types/theme';
import { THEME_STORAGE_KEY } from '../config/constants';

const isValidTheme = (value: string): value is Theme =>
  ['light', 'dark', 'system'].includes(value);

const getStoredTheme = (): Theme => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  return (savedTheme && isValidTheme(savedTheme)) ? savedTheme : 'system';
};

export const ThemeProvider = ({ children }: { children: preact.ComponentChildren }) => {
  const [theme, setTheme] = useState<Theme>(getStoredTheme);
  const htmlRef = useRef(document.documentElement);

  const applyTheme = useCallback((currentTheme: Theme) => {
    const html = htmlRef.current;
    html.setAttribute('data-theme', currentTheme);

    let shouldBeDark = currentTheme === 'dark';
    
    if (currentTheme === 'system' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      shouldBeDark = mediaQuery.matches;
    }
    
    html.classList.toggle('is-dark', shouldBeDark);
  }, []);

  const handleSystemThemeChange = useCallback((e: MediaQueryListEvent) => {
    setTheme(current => {
      if (current === 'system') {
        htmlRef.current.classList.toggle('is-dark', e.matches);
      }
      return current;
    });
  }, []);

  // Initialize theme
  useLayoutEffect(() => {
    applyTheme(theme);

    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', handleSystemThemeChange);

      return () => {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      };
    }
  }, [theme, applyTheme, handleSystemThemeChange]);

  // Update storage when theme changes
  useEffect(() => {
    if (theme === 'system') {
      localStorage.removeItem(THEME_STORAGE_KEY);
    } else {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
    applyTheme(theme);
  }, [theme, applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};