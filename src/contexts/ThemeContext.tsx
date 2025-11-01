import { createContext } from 'preact';
import { useContext } from 'preact/hooks';
import type { ThemeContextType } from '../types/theme';
import type { Theme } from '../theme/types';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context.themeObject;
};

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeProvider');
  }
  return {
    mode: context.mode,
    setMode: context.setMode,
    // Legacy compatibility
    theme: context.theme,
    setTheme: context.setTheme,
  };
};