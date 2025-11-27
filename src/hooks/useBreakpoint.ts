import { useMemo } from 'preact/hooks';

import { useTheme } from '../contexts/ThemeContext';
import type { Breakpoint } from '../theme/types';

import { useMediaQuery } from './useMediaQuery';

export type BreakpointDirection = 'up' | 'down' | 'only' | 'between';

/**
 * useBreakpoint hook - responsive breakpoint detection and queries
 *
 * Provides access to the current breakpoint and allows directional breakpoint queries
 * (up, down, only, between). Uses the theme's breakpoint system for consistent
 * responsive behavior across components.
 *
 * @returns Current breakpoint name or boolean result of directional query
 *
 * @example
 * ```tsx
 * // Get current breakpoint
 * const breakpoint = useBreakpoint(); // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
 *
 * // Check if screen is at least medium size
 * const isMediumUp = useBreakpoint('up', 'md'); // boolean
 *
 * // Check if screen is smaller than large
 * const isLargeDown = useBreakpoint('down', 'lg'); // boolean
 *
 * // Check if screen is exactly medium
 * const isMediumOnly = useBreakpoint('only', 'md'); // boolean
 *
 * // Check if screen is between small and large
 * const isBetween = useBreakpoint('between', 'sm', 'lg'); // boolean
 *
 * // Usage in component
 * function ResponsiveComponent() {
 *   const isMobile = useBreakpoint('down', 'sm');
 *   const isDesktop = useBreakpoint('up', 'lg');
 *
 *   return (
 *     <div>
 *       {isMobile && <MobileLayout />}
 *       {isDesktop && <DesktopLayout />}
 *     </div>
 *   );
 * }
 * ```
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
  }, [isSm, isMd, isLg, isXl]);

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
