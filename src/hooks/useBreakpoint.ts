import { useMemo } from 'preact/hooks';

import { useTheme } from '../contexts/ThemeContext';
import type { Breakpoint } from '../theme/types';

import { useMediaQuery } from './useMediaQuery';

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

  // Handle directional queries - call hooks unconditionally
  const upQuery = useMediaQuery(direction === 'up' && breakpointOrStart ? theme.breakpoints.up(breakpointOrStart) : '');
  const downQuery = useMediaQuery(direction === 'down' && breakpointOrStart ? theme.breakpoints.down(breakpointOrStart) : '');
  const betweenQuery = useMediaQuery(direction === 'between' && breakpointOrStart && end ? theme.breakpoints.between(breakpointOrStart, end) : '');
  const onlyQuery = useMediaQuery(direction === 'only' && breakpointOrStart ? theme.breakpoints.only(breakpointOrStart) : '');

  // If no direction specified, return current breakpoint
  if (!direction) {
    return currentBreakpoint;
  }

  // Handle directional queries
  if (direction === 'up' && breakpointOrStart) {
    return upQuery;
  }

  if (direction === 'down' && breakpointOrStart) {
    return downQuery;
  }

  if (direction === 'between' && breakpointOrStart && end) {
    return betweenQuery;
  }

  if (direction === 'only' && breakpointOrStart) {
    return onlyQuery;
  }

  return currentBreakpoint;
}
