import { useMemo } from 'preact/hooks';
import { useBreakpoint } from './useBreakpoint';
import type { ResponsiveValue, Breakpoint } from '../theme/types';

/**
 * Hook to resolve responsive values based on current breakpoint
 * @param value - Responsive value or static value
 * @returns Resolved value for current breakpoint
 */
export function useResponsive<T>(value: ResponsiveValue<T>): T {
  const currentBreakpoint = useBreakpoint();

  return useMemo(() => {
    // If value is not an object, return it directly
    if (typeof value !== 'object' || value === null) {
      return value as T;
    }

    // If value is a responsive object
    const responsiveValue = value as Partial<Record<Breakpoint, T>>;

    // Order of breakpoints from smallest to largest
    const breakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];
    const currentIndex = breakpointOrder.indexOf(currentBreakpoint);

    // Find the closest defined value at or below current breakpoint
    for (let i = currentIndex; i >= 0; i--) {
      const bp = breakpointOrder[i];
      if (responsiveValue[bp] !== undefined) {
        return responsiveValue[bp] as T;
      }
    }

    // If no value found, use the smallest defined value
    for (const bp of breakpointOrder) {
      if (responsiveValue[bp] !== undefined) {
        return responsiveValue[bp] as T;
      }
    }

    // Fallback to undefined
    return undefined as T;
  }, [value, currentBreakpoint]);
}
