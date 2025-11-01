import type { Theme as ThemeObject } from '../theme/types';

export type ThemeMode = 'light' | 'dark' | 'system';

// Legacy type alias for backward compatibility
export type Theme = ThemeMode;

export interface ThemeContextType {
  mode: ThemeMode;
  setMode: (newMode: ThemeMode) => void;
  themeObject: ThemeObject;
  // Legacy compatibility
  theme: ThemeMode;
  setTheme: (newTheme: ThemeMode) => void;
}