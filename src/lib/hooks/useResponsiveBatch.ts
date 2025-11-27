import { useMemo } from 'preact/hooks';

import type { ResponsiveValue, Breakpoint } from '../theme/types';

import { useBreakpoint } from './useBreakpoint';

/**
 * Efficiently resolve multiple responsive values in a single hook call
 *
 * @param values - Object containing responsive values to resolve
 * @returns Object with resolved values
 *
 * @example
 * ```tsx
 * const { padding, margin, display } = useResponsiveBatch({
 *   padding: { xs: 1, md: 2 },
 *   margin: { sm: 1, lg: 3 },
 *   display: { xs: 'block', md: 'flex' }
 * });
 * ```
 */
export function useResponsiveBatch<T extends Record<string, ResponsiveValue<unknown>>>(
  values: T
): { [K in keyof T]: T[K] extends ResponsiveValue<infer U> ? U : T[K] } {
  const currentBreakpoint = useBreakpoint();

  return useMemo(() => {
    const resolved = {} as { [K in keyof T]: T[K] extends ResponsiveValue<infer U> ? U : T[K] };

    // Breakpoint resolution order
    const breakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];
    const currentIndex = breakpointOrder.indexOf(currentBreakpoint);

    for (const [key, value] of Object.entries(values)) {
      if (typeof value !== 'object' || value === null) {
        resolved[key as keyof typeof resolved] = value as any;
        continue;
      }

      const responsiveValue = value as Partial<Record<Breakpoint, unknown>>;

      // Find value for current breakpoint (fallback to smaller breakpoints)
      let resolvedValue: unknown = undefined;
      for (let i = currentIndex; i >= 0; i--) {
        const bp = breakpointOrder[i];
        if (responsiveValue[bp] !== undefined) {
          resolvedValue = responsiveValue[bp];
          break;
        }
      }

      // If no value found, use smallest defined breakpoint
      if (resolvedValue === undefined) {
        for (const bp of breakpointOrder) {
          if (responsiveValue[bp] !== undefined) {
            resolvedValue = responsiveValue[bp];
            break;
          }
        }
      }

      resolved[key as keyof typeof resolved] = resolvedValue as any;
    }

    return resolved;
  }, [values, currentBreakpoint]);
}
