// @vite-ignore

import type { RenderOptions } from '@testing-library/preact';
import {
  render as rtlRender,
  screen,
  fireEvent,
  waitFor,
  act,
  cleanup,
} from '@testing-library/preact';
import type { ComponentChildren } from 'preact';

import { ThemeProvider } from '../lib/providers/ThemeProvider';

// Explicitly export testing library functions
export { screen, fireEvent, waitFor, act, cleanup };

/**
 * Custom render function that includes theme provider
 * Use this instead of the global render function when you need theme context
 */
export function renderWithTheme(ui: ComponentChildren, options?: Omit<RenderOptions, 'wrapper'>) {
  const Wrapper = ({ children }: { children: ComponentChildren }) => (
    <ThemeProvider>{children}</ThemeProvider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

// Export render as well for backward compatibility
export const render = rtlRender;
