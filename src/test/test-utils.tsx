// @vite-ignore

import { RenderOptions, render as rtlRender, screen, fireEvent, waitFor, act, cleanup } from '@testing-library/preact';
import { ThemeProvider } from '../providers/ThemeProvider';
import type { ComponentChildren } from 'preact';

// Explicitly export testing library functions
export { screen, fireEvent, waitFor, act, cleanup };

/**
 * Custom render function that includes theme provider
 * Use this instead of the global render function when you need theme context
 */
export function renderWithTheme(
  ui: ComponentChildren,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  const Wrapper = ({ children }: { children: ComponentChildren }) => (
    <ThemeProvider>{children}</ThemeProvider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

// Export render as well for backward compatibility
export const render = rtlRender;