# ♿ Task: Accessibility Improvements

**Priority**: MEDIUM
**Estimated Time**: 2-3 hours
**Scope**: Enhance accessibility across all components

## 🎯 Current Issues

### Inconsistent ARIA Implementation

- Some components have comprehensive ARIA labels
- Others missing proper `aria-label` attributes
- Inconsistent `role` attribute usage
- Missing `aria-describedby` implementations

### Missing Semantic HTML

- Container component lacks semantic roles
- Stack component has no accessibility considerations
- Layout components missing proper ARIA attributes

## 📋 Implementation Tasks

### 1. Enhance Container Component

**File:** `src/components/layout/Container.tsx`

Add semantic role and ARIA attributes:

```typescript
export interface ContainerProps extends BaseComponentProps {
  /**
   * Semantic role for the container
   */
  role?: 'main' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'nav';
  /**
   * ARIA label for screen readers
   */
  'aria-label'?: string;
  /**
   * ARIA labelledby reference
   */
  'aria-labelledby'?: string;
}

export const Container = ({
  role,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...props
}: ContainerProps) => {
  return (
    <div
      role={role}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      {...props}
    />
  );
};
```

### 2. Add Accessibility to Stack Component

**File:** `src/components/layout/Stack.tsx`

```typescript
export interface StackProps extends BaseComponentProps {
  /**
   * ARIA role for the stack
   * @default 'group'
   */
  role?: string;
  /**
   * ARIA label for screen readers
   */
  'aria-label'?: string;
  /**
   * Whether this is a landmark element
   */
  landmark?: boolean;
}

export const Stack = ({
  role = 'group',
  'aria-label': ariaLabel,
  landmark = false,
  ...props
}: StackProps) => {
  const semanticRole = landmark ? undefined : role;

  return (
    <div
      role={semanticRole}
      aria-label={ariaLabel}
      {...props}
    />
  );
};
```

### 3. Improve Form Components Accessibility

**Files to update:**

- `src/components/ui/TextField.tsx`
- `src/components/ui/Checkbox.tsx`
- `src/components/ui/Radio.tsx`
- `src/components/ui/Switch.tsx`

**Common improvements:**

- Ensure proper `aria-describedby` for helper text
- Add `aria-invalid` for error states
- Proper `aria-required` attributes
- Associated labels with `htmlFor` and `id`

### 4. Enhance Button Component

**File:** `src/components/ui/Button.tsx`

```typescript
export const Button = ({
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  loading,
  ...props
}: ButtonProps) => {
  return (
    <button
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-disabled={loading}
      disabled={loading}
      {...props}
    >
      {loading && <span aria-hidden="true">Loading...</span>}
      {!loading && children}
    </button>
  );
};
```

### 5. Add Focus Management

**Files to update:**

- Modal components (when implemented)
- Dropdown components
- Focus trap utilities

### 6. Implement Keyboard Navigation

**Files to update:**

- `src/components/ui/Hamburger.tsx` - Add keyboard support
- Navigation components
- Interactive elements

### 7. Add Accessibility Testing

Update test files to include accessibility checks:

```typescript
import { axe } from 'jest-axe';

describe('Component Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<Component />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### 8. Update Theme for Accessibility

**File:** `src/theme/defaultTheme.ts`

Add accessibility-focused color tokens:

```typescript
export const defaultTheme = {
  // ... existing theme
  accessibility: {
    focusRing: {
      width: '2px',
      style: 'solid',
      color: '#007acc',
      offset: '2px',
    },
    highContrast: {
      border: '#000000',
      background: '#ffffff',
    },
  },
};
```

## ✅ Success Criteria

- All components pass accessibility audits
- Proper ARIA attributes implemented
- Keyboard navigation works
- Screen reader support verified
- Focus management implemented
- Accessibility tests added
- WCAG 2.1 AA compliance achieved

## 🧪 Testing

- Run accessibility tests with `jest-axe`
- Manual testing with screen readers
- Keyboard-only navigation testing
- Color contrast verification
- Focus indicator visibility checks

## 📚 Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Jest Axe](https://github.com/nickcolley/jest-axe)
- [Preact Accessibility](https://preactjs.com/guide/v10/accessibility/)
