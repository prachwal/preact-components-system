import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

import type { Theme } from '../theme/types';
import type { ThemeContextType } from '../types/theme';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * useTheme hook - access the current theme object
 *
 * Provides access to the current theme configuration including colors, typography,
 * breakpoints, spacing, and other design tokens. Must be used within a ThemeProvider.
 *
 * @returns The current theme object with all design tokens
 * @throws Error if used outside of ThemeProvider
 *
 * @example
 * ```tsx
 * function ThemedComponent() {
 *   const theme = useTheme();
 *
 *   return (
 *     <div style={{
 *       color: theme.palette.text.primary,
 *       backgroundColor: theme.palette.background.default,
 *       padding: theme.spacing(2)
 *     }}>
 *       Themed content
 *     </div>
 *   );
 * }
 *
 * // Using breakpoint utilities
 * function ResponsiveComponent() {
 *   const theme = useTheme();
 *   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
 *
 *   return (
 *     <div>
 *       {isMobile ? 'Mobile' : 'Desktop'} layout
 *     </div>
 *   );
 * }
 * ```
 */
export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context.themeObject;
};

/**
 * useThemeMode hook - access and control the current theme mode
 *
 * Provides access to the current theme mode ('light', 'dark', 'system') and
 * functions to change it. Also includes legacy theme properties for compatibility.
 * Must be used within a ThemeProvider.
 *
 * @returns Object with mode, setMode, and legacy theme properties
 * @throws Error if used outside of ThemeProvider
 *
 * @example
 * ```tsx
 * function ThemeToggle() {
 *   const { mode, setMode } = useThemeMode();
 *
 *   return (
 *     <button onClick={() => {
 *       const nextMode = mode === 'light' ? 'dark' : 'light';
 *       setMode(nextMode);
 *     }}>
 *       Current mode: {mode}
 *     </button>
 *   );
 * }
 *
 * // Using legacy properties
 * function LegacyComponent() {
 *   const { theme, setTheme } = useThemeMode();
 *
 *   return (
 *     <div>
 *       Current theme: {theme}
 *       <button onClick={() => setTheme('dark')}>Dark</button>
 *     </div>
 *   );
 * }
 * ```
 */
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