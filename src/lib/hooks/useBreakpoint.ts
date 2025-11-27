import { useMemo } from 'preact/hooks';

import { useTheme } from '../contexts/ThemeContext';
import type { Breakpoint } from '../theme/types';

import { useMediaQuery } from './useMediaQuery';

export type BreakpointDirection = 'up' | 'down' | 'only' | 'between';

/**
 * Helper function to determine current breakpoint from media query results
 */
const getCurrentBreakpoint = (
  isSm: boolean,
  isMd: boolean,
  isLg: boolean,
  isXl: boolean
): Breakpoint => {
  if (isXl) return 'xl';
  if (isLg) return 'lg';
  if (isMd) return 'md';
  if (isSm) return 'sm';
  return 'xs';
};

/**
 * Helper function to generate media query string based on direction
 */
const getMediaQuery = (
  theme: ReturnType<typeof useTheme>,
  direction?: BreakpointDirection,
  breakpointOrStart?: Breakpoint,
  end?: Breakpoint
): string => {
  if (!direction || !breakpointOrStart) return '';

  switch (direction) {
    case 'up':
      return theme.breakpoints.up(breakpointOrStart);
    case 'down':
      return theme.breakpoints.down(breakpointOrStart);
    case 'between':
      return end ? theme.breakpoints.between(breakpointOrStart, end) : '';
    case 'only':
      return theme.breakpoints.only(breakpointOrStart);
    default:
      return '';
  }
};

/**
 * Helper function to evaluate directional query result
 */
const evaluateDirectionalQuery = (
  direction?: BreakpointDirection,
  breakpointOrStart?: Breakpoint,
  end?: Breakpoint,
  upQuery?: boolean,
  downQuery?: boolean,
  betweenQuery?: boolean,
  onlyQuery?: boolean
): boolean | null => {
  if (!direction) return null;

  if (direction === 'up' && breakpointOrStart) return upQuery ?? false;
  if (direction === 'down' && breakpointOrStart) return downQuery ?? false;
  if (direction === 'between' && breakpointOrStart && end) return betweenQuery ?? false;
  if (direction === 'only' && breakpointOrStart) return onlyQuery ?? false;

  return null;
};

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
export function useBreakpoint(direction: 'between', start: Breakpoint, end: Breakpoint): boolean;
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

  const currentBreakpoint = useMemo(
    (): Breakpoint => getCurrentBreakpoint(isSm, isMd, isLg, isXl),
    [isSm, isMd, isLg, isXl]
  );

  // Handle directional queries - call hooks unconditionally
  const upQuery = useMediaQuery(
    getMediaQuery(theme, 'up', direction === 'up' ? breakpointOrStart : undefined)
  );
  const downQuery = useMediaQuery(
    getMediaQuery(theme, 'down', direction === 'down' ? breakpointOrStart : undefined)
  );
  const betweenQuery = useMediaQuery(
    getMediaQuery(theme, 'between', direction === 'between' ? breakpointOrStart : undefined, end)
  );
  const onlyQuery = useMediaQuery(
    getMediaQuery(theme, 'only', direction === 'only' ? breakpointOrStart : undefined)
  );

  // If no direction specified, return current breakpoint
  if (!direction) {
    return currentBreakpoint;
  }

  // Evaluate directional query
  const result = evaluateDirectionalQuery(
    direction,
    breakpointOrStart,
    end,
    upQuery,
    downQuery,
    betweenQuery,
    onlyQuery
  );

  return result ?? currentBreakpoint;
}
