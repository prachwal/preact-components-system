import { useMemo } from 'preact/hooks';
import { useTheme } from '../contexts/ThemeContext';
import { useMediaQuery } from './useMediaQuery';
import type { Breakpoint } from '../theme/types';

type BreakpointDirection = 'up' | 'down' | 'only' | 'between';

/**
 * Hook to get the current breakpoint
 */
export function useBreakpoint(): Breakpoint;
export function useBreakpoint(direction: 'up' | 'down', breakpoint: Breakpoint): boolean;
export function useBreakpoint(
  direction: 'between',
  start: Breakpoint,
  end: Breakpoint
): boolean;
export function useBreakpoint(
  direction?: BreakpointDirection,
  breakpointOrStart?: Breakpoint,
  end?: Breakpoint
): Breakpoint | boolean {
  const theme = useTheme();

  const keys: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];

  // Get current breakpoint
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const isLg = useMediaQuery(theme.breakpoints.only('lg'));
  const isXl = useMediaQuery(theme.breakpoints.only('xl'));

  const currentBreakpoint = useMemo((): Breakpoint => {
    if (isXl) return 'xl';
    if (isLg) return 'lg';
    if (isMd) return 'md';
    if (isSm) return 'sm';
    return 'xs';
  }, [isXs, isSm, isMd, isLg, isXl]);

  // If no direction specified, return current breakpoint
  if (!direction) {
    return currentBreakpoint;
  }

  // Handle directional queries
  if (direction === 'up' && breakpointOrStart) {
    const matches = useMediaQuery(theme.breakpoints.up(breakpointOrStart));
    return matches;
  }

  if (direction === 'down' && breakpointOrStart) {
    const matches = useMediaQuery(theme.breakpoints.down(breakpointOrStart));
    return matches;
  }

  if (direction === 'between' && breakpointOrStart && end) {
    const matches = useMediaQuery(theme.breakpoints.between(breakpointOrStart, end));
    return matches;
  }

  if (direction === 'only' && breakpointOrStart) {
    const matches = useMediaQuery(theme.breakpoints.only(breakpointOrStart));
    return matches;
  }

  return currentBreakpoint;
}
