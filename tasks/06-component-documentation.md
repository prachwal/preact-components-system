# 📚 Task: Component Documentation Enhancement

**Priority**: MEDIUM
**Estimated Time**: 2-3 hours
**Scope**: Add comprehensive TSDoc comments to all components

## 🎯 Current Issues

### Missing TSDoc Comments

**Components missing documentation:**

- Layout components (Box, Container, Grid, Stack)
- Utility components (ClickAwayListener, FocusTrap, Portal)
- Some UI components have incomplete documentation

### Inconsistent Documentation Format

- Some components have good docs, others minimal
- Missing usage examples
- No standardized format

## 📋 Implementation Tasks

### 1. Document Layout Components

**Files to update:**

- `src/components/layout/Box.tsx`
- `src/components/layout/Container.tsx`
- `src/components/layout/Grid.tsx`
- `src/components/layout/Stack.tsx`
- `src/components/layout/AppShell.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/Header.tsx`
- `src/components/layout/Main.tsx`
- `src/components/layout/Sidebar.tsx`

**TSDoc Template:**

```typescript
/**
 * Box component - flexible container with responsive spacing
 *
 * Provides a flexible container component with responsive padding, margin,
 * and display properties. Supports custom components and styling.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Box p={2}>Content</Box>
 *
 * // Responsive spacing
 * <Box p={{ xs: 1, md: 3 }}>Responsive content</Box>
 *
 * // Custom component
 * <Box component="article" className="article-box">
 *   Article content
 * </Box>
 * ```
 */
export const Box = ({ ... }: BoxProps) => { ... }
```

### 2. Document Utility Components

**Files to update:**

- `src/components/utils/ClickAwayListener.tsx`
- `src/components/utils/FocusTrap.tsx`
- `src/components/utils/Portal.tsx`

**Example for ClickAwayListener:**

```typescript
/**
 * ClickAwayListener component
 *
 * Detects clicks outside of its children and calls the onClickAway callback.
 * Useful for implementing dropdowns, modals, and other overlay components.
 *
 * @example
 * ```tsx
 * <ClickAwayListener onClickAway={() => setOpen(false)}>
 *   <div>Content that closes when clicked outside</div>
 * </ClickAwayListener>
 * ```
 */
```

### 3. Enhance Existing Documentation

Review and enhance docs for components that have minimal documentation:

- Add more comprehensive examples
- Document all props and their types
- Add accessibility notes where relevant

### 4. Document Hooks

Add TSDoc to custom hooks:

- `src/hooks/useBreakpoint.ts`
- `src/hooks/useResponsive.ts`
- `src/hooks/useMediaQuery.ts`
- `src/hooks/useTheme.ts`

**Hook Documentation Template:**

```typescript
/**
 * useBreakpoint hook
 *
 * Returns the current breakpoint based on screen size.
 * Breakpoints: xs (< 768px), sm (≥ 768px), md (≥ 1024px), lg (≥ 1280px), xl (≥ 1536px)
 *
 * @returns Current breakpoint
 *
 * @example
 * ```tsx
 * const breakpoint = useBreakpoint();
 *
 * if (breakpoint === 'md') {
 *   // Medium screen logic
 * }
 * ```
 */
```

### 5. Generate TypeDoc Documentation

Update `typedoc.json` configuration:

```json
{
  "entryPoints": ["src/index.ts"],
  "out": "docs",
  "name": "Preact Components System",
  "includeVersion": true,
  "exclude": ["**/*.test.*", "**/*.stories.*"],
  "plugin": ["typedoc-plugin-markdown"]
}
```

Add npm script:

```json
"docs": "typedoc"
```

### 6. Create Component READMEs

Create individual README files for complex components:

- `src/components/layout/Box/README.md`
- `src/components/ui/Button/README.md`
- `src/components/theme/README.md`

## ✅ Success Criteria

- All exported components have comprehensive TSDoc
- Usage examples provided for all components
- TypeDoc generates complete documentation
- Consistent documentation format across codebase
- Accessibility considerations documented
- Props and types fully documented

## 📋 Documentation Standards

### Component Documentation Format

```typescript
/**
 * Component description - what it does and when to use it
 *
 * More detailed explanation of functionality, behavior, and use cases.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Component prop="value">Content</Component>
 *
 * // Advanced usage
 * <Component prop="value" onEvent={handler}>
 *   Complex content
 * </Component>
 * ```
 *
 * @accessibility
 * Notes about accessibility features or requirements
 */
```

### Prop Documentation

```typescript
export interface ComponentProps {
  /**
   * Description of what this prop does
   * @default defaultValue
   */
  propName?: Type;

  /**
   * Required prop description
   */
  requiredProp: Type;
}
```

## 🧪 Validation

- Run `npm run docs` generates complete documentation
- All components show in generated docs
- Examples are functional
- Links and references work correctly
