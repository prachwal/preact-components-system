# 🏗️ Task: Component Patterns Standardization

**Priority**: MEDIUM
**Estimated Time**: 2-3 hours
**Scope**: Standardize component export patterns and interfaces

## 🎯 Current Issues

### Mixed Export Patterns

**Inconsistent patterns found:**

```typescript
// Pattern 1: Named export
export const Grid = ({ ... }: GridProps) => { ... }

// Pattern 2: Default export
export default Component
```

### Missing Barrel Exports

- No consistent index.ts files for component directories
- Components not properly exported from main entry points

### Inconsistent Prop Interfaces

- Some components use different naming conventions
- Missing standardized prop patterns

## 📋 Implementation Tasks

### 1. Standardize Export Patterns

**Decision:** Use named exports for all components

**Pattern to follow:**

```typescript
// ✅ Good: Named export with interface
export interface ComponentNameProps {
  // props definition
}

export const ComponentName = ({ ... }: ComponentNameProps) => {
  // implementation
};

// Export types
export type { ComponentNameProps };
```

**Files to update:**

- `src/components/layout/Grid.tsx`
- `src/components/ui/Button.tsx`
- `src/components/ui/Alert.tsx`
- Any other components using default exports

### 2. Create Barrel Exports

Create/update `index.ts` files in component directories:

**`src/components/layout/index.ts`:**

```typescript
export { Box } from './Box';
export { Container } from './Container';
export { Grid } from './Grid';
export { Stack } from './Stack';
export { AppShell } from './AppShell';
export { Footer } from './Footer';
export { Header } from './Header';
export { Main } from './Main';
export { Sidebar } from './Sidebar';

export type { BoxProps } from './Box';
export type { ContainerProps } from './Container';
export type { GridProps } from './Grid';
export type { StackProps } from './Stack';
export type { AppShellProps } from './AppShell';
export type { FooterProps } from './Footer';
export type { HeaderProps } from './Header';
export type { MainProps } from './Main';
export type { SidebarProps } from './Sidebar';
```

**`src/components/ui/index.ts`:**

```typescript
export { Button } from './Button';
export { Alert } from './Alert';
export { Card } from './Card';
// ... other UI components

export type { ButtonProps } from './Button';
export type { AlertProps } from './Alert';
export type { CardProps } from './Card';
// ... other types
```

### 3. Standardize Prop Interfaces

**Common prop patterns:**

```typescript
export interface BaseComponentProps {
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Inline styles
   */
  style?: h.JSX.CSSProperties;
  /**
   * Additional HTML attributes
   */
  [key: string]: unknown;
}

export interface ComponentNameProps extends BaseComponentProps {
  // component-specific props
}
```

### 4. Update Main Library Export

Update `src/index.ts` to use barrel exports:

```typescript
// Layout components
export * from './components/layout';

// UI components
export * from './components/ui';

// Common components
export * from './components/common';

// Utility components
export * from './components/utils';

// Hooks
export * from './hooks';

// Theme and types
export * from './theme';
export * from './types';
```

### 5. Add TSDoc Comments

Ensure all exported components have proper TSDoc:

```typescript
/**
 * Component description
 *
 * @example
 * ```tsx
 * <ComponentName prop="value">
 *   Content
 * </ComponentName>
 * ```
 */
export const ComponentName = ({ ... }: ComponentNameProps) => { ... }
```

## ✅ Success Criteria

- All components use named exports
- Consistent prop interface patterns
- Barrel exports in all component directories
- Main library export properly organized
- TSDoc comments on all public APIs
- No breaking changes to component APIs

## 📁 File Structure After Changes

```text
src/
├── components/
│   ├── layout/
│   │   ├── index.ts          # Barrel export
│   │   ├── Box.tsx
│   │   ├── Container.tsx
│   │   └── ...
│   ├── ui/
│   │   ├── index.ts          # Barrel export
│   │   ├── Button.tsx
│   │   └── ...
│   └── ...
├── index.ts                  # Main library export
└── ...
```

## 🧪 Testing

- All existing imports still work
- Tree-shaking works correctly
- Bundle size not significantly increased
- TypeScript compilation passes
- IDE autocomplete works properly
