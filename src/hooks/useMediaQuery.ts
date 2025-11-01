import { useState, useEffect } from 'preact/hooks';
import type { Theme } from '../theme/types';

type QueryInput = string | ((theme: Theme) => string);

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
 * Hook to execute media queries and track their state
 * @param query - Media query string or function that receives theme
 * @param options - Options for SSR and default matches
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
