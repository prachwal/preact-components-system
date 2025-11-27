import { useMemo } from 'preact/hooks';

import type { ResponsiveValue, Breakpoint } from '../theme/types';

import { useBreakpoint } from './useBreakpoint';

/**
 * useResponsive hook - resolves responsive values based on current breakpoint
 *
 * Takes a responsive value object or static value and returns the appropriate
 * value for the current breakpoint. Responsive objects can define different
 * values for different screen sizes (xs, sm, md, lg, xl).
 *
 * @param value - Responsive value object or static value
 * @returns Resolved value for the current breakpoint
 *
 * @example
 * ```tsx
 * // Static value (no responsive behavior)
 * const spacing = useResponsive(2); // Always returns 2
 *
 * // Responsive spacing
 * const spacing = useResponsive({ xs: 1, sm: 2, md: 3 }); // 1 on mobile, 2 on tablet, 3 on desktop
 *
 * // Partial responsive object
 * const fontSize = useResponsive({ xs: '14px', lg: '18px' }); // 14px on xs/sm/md, 18px on lg/xl
 *
 * // Usage in component
 * function ResponsiveBox({ spacing, children }) {
 *   const resolvedSpacing = useResponsive(spacing);
 *
 *   return (
 *     <div style={{ padding: `${resolvedSpacing * 8}px` }}>
 *       {children}
 *     </div>
 *   );
 * }
 *
 * // Component usage
 * <ResponsiveBox spacing={{ xs: 1, md: 2, lg: 3 }} />
 * ```
 *
 * The hook follows mobile-first approach: values cascade from smaller to larger breakpoints.
 * If a breakpoint doesn't have a value, it uses the next smaller breakpoint's value.
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
