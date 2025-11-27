import { useState, useEffect, useLayoutEffect, useCallback, useRef, useMemo } from 'preact/hooks';

import { THEME_STORAGE_KEY } from '../config/constants';
import { ThemeContext } from '../contexts/ThemeContext';
import { createTheme } from '../theme/createTheme';
import type { Theme, ThemeOptions } from '../theme/types';
import type { ThemeMode } from '../types/theme';
// Styles are handled externally via the main CSS file

const isValidTheme = (value: string): value is ThemeMode =>
  ['light', 'dark', 'system'].includes(value);

const getStoredTheme = (): ThemeMode => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  return savedTheme != null && isValidTheme(savedTheme) ? savedTheme : 'system';
};

export interface ThemeProviderProps {
  children: preact.ComponentChildren;
  theme?: Theme | ThemeOptions;
}

export const ThemeProvider = ({ children, theme: customTheme }: ThemeProviderProps) => {
  const [mode, setMode] = useState<ThemeMode>(getStoredTheme);
  const htmlRef = useRef(document.documentElement);

  // Create theme object based on mode and custom theme
  const themeObject = useMemo(() => {
    // If custom theme is provided and is a full Theme object, use it
    if (customTheme && 'palette' in customTheme && 'typography' in customTheme) {
      return customTheme as Theme;
    }

    // Determine effective mode for theme creation
    let effectiveMode: 'light' | 'dark' = 'light';
    if (mode === 'dark') {
      effectiveMode = 'dark';
    } else if (mode === 'system' && window.matchMedia) {
      effectiveMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Create theme with effective mode
    const themeOptions: ThemeOptions = {
      ...(customTheme ?? {}),
      palette: {
        ...(customTheme && 'palette' in customTheme ? customTheme.palette : {}),
        mode: effectiveMode,
      },
    };

    return createTheme(themeOptions);
  }, [mode, customTheme]);

  const applyTheme = useCallback((currentMode: ThemeMode) => {
    const html = htmlRef.current;
    html.setAttribute('data-theme', currentMode);

    let shouldBeDark = currentMode === 'dark';

    if (currentMode === 'system' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      shouldBeDark = mediaQuery.matches;
    }

    html.classList.toggle('is-dark', shouldBeDark);
  }, []);

  const handleSystemThemeChange = useCallback((e: MediaQueryListEvent) => {
    setMode((current) => {
      if (current === 'system') {
        htmlRef.current.classList.toggle('is-dark', e.matches);
      }
      return current;
    });
  }, []);

  // Initialize theme
  useLayoutEffect(() => {
    applyTheme(mode);

    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', handleSystemThemeChange);

      return () => {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      };
    }
  }, [mode, applyTheme, handleSystemThemeChange]);

  // Update storage when theme changes
  useEffect(() => {
    if (mode === 'system') {
      localStorage.removeItem(THEME_STORAGE_KEY);
    } else {
      localStorage.setItem(THEME_STORAGE_KEY, mode);
    }
    applyTheme(mode);
  }, [mode, applyTheme]);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        setMode,
        themeObject,
        // Legacy compatibility
        theme: mode,
        setTheme: setMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
