import { useState, useEffect } from 'preact/hooks';

import type { Theme } from '../theme/types';

export type QueryInput = string | ((theme: Theme) => string);

export interface UseMediaQueryOptions {
  /**
   * If true, the hook will not be evaluated on the server
   */
  noSsr?: boolean;
  /**
   * Default value to use on the server and before the first client render
   */
  defaultMatches?: boolean;
}

/**
 * useMediaQuery hook - executes media queries and tracks their state
 *
 * Provides a reactive way to check if a CSS media query matches the current
 * viewport. Supports both static media query strings and theme-based queries.
 * Handles SSR safely with configurable defaults and no-SSR options.
 *
 * @param query - Media query string or function that receives theme and returns a query
 * @param options - Configuration options for SSR behavior
 * @returns Boolean indicating if the media query currently matches
 *
 * @example
 * ```tsx
 * // Simple media query
 * const isMobile = useMediaQuery('(max-width: 768px)');
 *
 * // Theme-based query
 * const isDark = useMediaQuery((theme) => `(prefers-color-scheme: ${theme.palette.mode})`);
 *
 * // With SSR options
 * const isLargeScreen = useMediaQuery('(min-width: 1024px)', {
 *   noSsr: true,
 *   defaultMatches: false
 * });
 *
 * // Usage in component
 * function ResponsiveComponent() {
 *   const isMobile = useMediaQuery('(max-width: 768px)');
 *   const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1023px)');
 *   const isDesktop = useMediaQuery('(min-width: 1024px)');
 *
 *   return (
 *     <div>
 *       {isMobile && <MobileLayout />}
 *       {isTablet && <TabletLayout />}
 *       {isDesktop && <DesktopLayout />}
 *     </div>
 *   );
 * }
 * ```
 *
 * Features:
 * - Reactive media query evaluation
 * - SSR-safe with configurable defaults
 * - Theme integration support
 * - Automatic event listener cleanup
 * - TypeScript support with proper typing
 */
export function useMediaQuery(
  query: QueryInput,
  options: UseMediaQueryOptions = {}
): boolean {
  const { noSsr = false, defaultMatches = false } = options;

  // Resolve query string
  const queryString = typeof query === 'function' ? query({} as Theme) : query;

  const [matches, setMatches] = useState<boolean>(() => {
    if (noSsr && typeof window === 'undefined') {
      return defaultMatches;
    }

    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia(queryString).matches;
    }

    return defaultMatches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mediaQueryList = window.matchMedia(queryString);

    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setMatches(event.matches);
    };

    // Set initial value
    setMatches(mediaQueryList.matches);

    // Listen for changes
    mediaQueryList.addEventListener('change', handleChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [queryString]);

  return matches;
}
