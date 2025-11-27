# 🏗️ Task: Hook Architecture Optimization

**Priority**: MEDIUM
**Estimated Time**: 1-2 hours
**Scope**: Optimize hook usage patterns and create efficient composition

## 🎯 Current Issues

### Excessive Hook Calls

- `useResponsive` hook called multiple times in single component
- Missing hook composition patterns
- Potential performance bottlenecks

### Current Inefficient Pattern

```typescript
// Box.tsx - INEFFICIENT
const resolvedP = useResponsive(p);
const resolvedPt = useResponsive(pt);
// ... 11 more calls
```

## 📋 Implementation Tasks

### 1. Create Efficient Hook Composition

**File:** `src/hooks/useResponsiveBatch.ts`

```typescript
import { useMemo } from 'preact/hooks';
import { useBreakpoint } from './useBreakpoint';
import type { ResponsiveValue, Breakpoint } from '../theme/types';

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
export function useResponsiveBatch<T extends Record<string, ResponsiveValue<any>>>(
  values: T
): { [K in keyof T]: T[K] extends ResponsiveValue<infer U> ? U : never } {
  const currentBreakpoint = useBreakpoint();

  return useMemo(() => {
    const resolved: any = {};

    // Breakpoint resolution order
    const breakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];
    const currentIndex = breakpointOrder.indexOf(currentBreakpoint);

    for (const [key, value] of Object.entries(values)) {
      if (typeof value !== 'object' || value === null) {
        resolved[key] = value;
        continue;
      }

      const responsiveValue = value as Partial<Record<Breakpoint, any>>;

      // Find value for current breakpoint (fallback to smaller breakpoints)
      let resolvedValue: any = undefined;
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

      resolved[key] = resolvedValue;
    }

    return resolved;
  }, [values, currentBreakpoint]);
}
```

### 2. Create Specialized Hooks

**File:** `src/hooks/useSpacing.ts`

```typescript
import { useResponsiveBatch } from './useResponsiveBatch';
import type { ResponsiveValue } from '../theme/types';

type SpacingValues = {
  p?: ResponsiveValue<number>;
  pt?: ResponsiveValue<number>;
  pr?: ResponsiveValue<number>;
  pb?: ResponsiveValue<number>;
  pl?: ResponsiveValue<number>;
  px?: ResponsiveValue<number>;
  py?: ResponsiveValue<number>;
  m?: ResponsiveValue<number>;
  mt?: ResponsiveValue<number>;
  mr?: ResponsiveValue<number>;
  mb?: ResponsiveValue<number>;
  ml?: ResponsiveValue<number>;
  mx?: ResponsiveValue<number>;
  my?: ResponsiveValue<number>;
};

type ResolvedSpacing = {
  [K in keyof SpacingValues]: number | undefined;
};

/**
 * Hook for resolving spacing values efficiently
 */
export function useSpacing(values: SpacingValues): ResolvedSpacing {
  return useResponsiveBatch(values);
}
```

**File:** `src/hooks/useLayout.ts`

```typescript
import { useResponsiveBatch } from './useResponsiveBatch';
import type { ResponsiveValue } from '../theme/types';

type LayoutValues = {
  display?: ResponsiveValue<string>;
  flexDirection?: ResponsiveValue<string>;
  justifyContent?: ResponsiveValue<string>;
  alignItems?: ResponsiveValue<string>;
};

type ResolvedLayout = {
  [K in keyof LayoutValues]: string | undefined;
};

/**
 * Hook for resolving layout values efficiently
 */
export function useLayout(values: LayoutValues): ResolvedLayout {
  return useResponsiveBatch(values);
}
```

### 3. Update Box Component (Alternative Approach)

If not using the batch hook from task 4, update to use composition:

```typescript
// src/components/layout/Box.tsx
import { useSpacing } from '../../hooks/useSpacing';
import { useLayout } from '../../hooks/useLayout';

export const Box = ({ ... }: BoxProps) => {
  const spacing = useSpacing({ p, pt, pr, pb, pl, px, py, m, mt, mr, mb, ml, mx, my });
  const layout = useLayout({ display });

  // Apply resolved values to styles
  const boxStyle = {
    // spacing styles
    ...(spacing.p && { padding: `${spacing.p * 8}px` }),
    // ... other spacing applications

    // layout styles
    ...(layout.display && { display: layout.display }),
  };

  return <Component style={boxStyle} {...props} />;
};
```

### 4. Create Hook Index File

**File:** `src/hooks/index.ts`

```typescript
export { useBreakpoint } from './useBreakpoint';
export { useMediaQuery } from './useMediaQuery';
export { useResponsive } from './useResponsive';
export { useResponsiveBatch } from './useResponsiveBatch';
export { useSpacing } from './useSpacing';
export { useLayout } from './useLayout';
export { useTheme } from '../contexts/ThemeContext';
export { useAppVersion } from './useAppVersion';
```

### 5. Update Hook Tests

Create tests for new hooks:

- `src/hooks/useResponsiveBatch.test.ts`
- `src/hooks/useSpacing.test.ts`
- `src/hooks/useLayout.test.ts`

## ✅ Success Criteria

- Hook call reduction achieved (from 13+ to 1-2 calls)
- Performance improvement measurable
- Backward compatibility maintained
- New hooks properly tested
- Clean hook composition API

## 📊 Performance Impact

**Before:**

- Multiple `useResponsive` calls per component
- Excessive re-renders on breakpoint changes

**After:**

- Single batch resolution per component type
- Optimized re-render triggers
- Better memoization opportunities

## 🧪 Testing

- All existing component tests pass
- New hook tests cover edge cases
- Performance benchmarks show improvement
- Responsive behavior unchanged
