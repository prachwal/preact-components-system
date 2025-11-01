import { createContext } from 'preact';
import { useContext } from 'preact/hooks';
import type { ThemeContextType } from '../types/theme';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};