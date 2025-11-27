# 🧪 Task: Test Pattern Standardization

**Priority**: MEDIUM
**Estimated Time**: 1-2 hours
**Scope**: Standardize testing patterns across the codebase

## 🎯 Current Issues

### Inconsistent Test Patterns

- Some tests use `renderWithTheme` wrapper, others don't
- Missing accessibility testing patterns
- Inconsistent test naming conventions
- Some tests missing cleanup

### Examples of Inconsistencies

```typescript
// src/components/layout/Grid.test.tsx:6-8
const renderWithTheme = (component: preact.ComponentChildren) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

// src/components/ui/Button.test.tsx:7
render(<Button>Click me</Button>); // Missing theme wrapper
```

## 📋 Implementation Tasks

### 1. Create Standardized Test Utilities

**File:** `src/test/test-utils.tsx`

```typescript
import { render, RenderOptions } from '@testing-library/preact';
import { ThemeProvider } from '../providers/ThemeProvider';
import type { ComponentChildren } from 'preact';

/**
 * Custom render function that includes theme provider
 */
const customRender = (
  ui: ComponentChildren,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const Wrapper = ({ children }: { children: ComponentChildren }) => (
    <ThemeProvider>{children}</ThemeProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

// Re-export everything
export * from '@testing-library/preact';
export * from '@testing-library/jest-dom';

// Override render method
export { customRender as render };
```

**File:** `src/test/test-utils.ts` (for non-React tests)

```typescript
// Utility functions for non-React tests
export const createMockBreakpoint = (breakpoint: string) => ({
  useBreakpoint: () => breakpoint,
});

export const createMockMediaQuery = (matches: boolean) => ({
  useMediaQuery: () => matches,
});
```

### 2. Update Test Setup

**File:** `src/test/setup.ts`

```typescript
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/preact';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
  // Reset any global state if needed
});
```

### 3. Standardize Component Test Template

**File:** `src/test/templates/component-test.template.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<ComponentName />);
      expect(screen.getByRole('generic')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      render(<ComponentName>Test content</ComponentName>);
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<ComponentName className="custom-class" />);
      expect(screen.getByRole('generic')).toHaveClass('custom-class');
    });
  });

  describe('Props', () => {
    // Test specific props
  });

  describe('Interactions', () => {
    // Test user interactions
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<ComponentName aria-label="Test label" />);
      expect(screen.getByLabelText('Test label')).toBeInTheDocument();
    });

    it('is accessible', async () => {
      const { container } = render(<ComponentName />);
      // Add axe accessibility testing when available
      expect(container).toBeDefined();
    });
  });

  describe('Responsive Behavior', () => {
    // Test responsive props if applicable
  });
});
```

### 4. Update Existing Test Files

Standardize all existing test files to use new patterns:

**Files to update:**

- `src/components/ui/Button.test.tsx`
- `src/components/ui/Alert.test.tsx`
- `src/components/layout/Grid.test.tsx`
- All other test files

**Pattern to follow:**

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { Component } from './Component';

// Remove local renderWithTheme
// Use imported render from test-utils
```

### 5. Add Accessibility Testing

Install and configure accessibility testing:

```bash
npm install --save-dev jest-axe @types/jest-axe
```

**Update test template:**

```typescript
import { axe } from 'jest-axe';

describe('Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<Component />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### 6. Add Test Categories

Organize tests by categories:

```typescript
describe('ComponentName', () => {
  describe('Rendering', () => { /* ... */ });
  describe('Props API', () => { /* ... */ });
  describe('User Interactions', () => { /* ... */ });
  describe('Accessibility', () => { /* ... */ });
  describe('Responsive Design', () => { /* ... */ });
  describe('Error Handling', () => { /* ... */ });
});
```

### 7. Update Package.json Scripts

Add test scripts for different scenarios:

```json
{
  "scripts": {
    "test:unit": "vitest run --coverage --reporter=verbose",
    "test:accessibility": "vitest run --grep='accessibility'",
    "test:integration": "vitest run --grep='integration'",
    "test:performance": "vitest run --grep='performance'"
  }
}
```

## ✅ Success Criteria

- All tests use standardized `render` from test-utils
- Consistent test structure across components
- Accessibility testing implemented
- Proper cleanup in all tests
- Test categories clearly defined
- CI/CD can run specific test types

## 📁 Test File Structure

```text
src/
├── test/
│   ├── setup.ts
│   ├── test-utils.tsx
│   ├── test-utils.ts
│   └── templates/
│       └── component-test.template.ts
├── components/
│   └── componentName/
│       ├── ComponentName.tsx
│       └── ComponentName.test.tsx
```

## 🧪 Validation

- Run `npm run test:unit` passes all tests
- Run `npm run test:accessibility` passes accessibility tests
- All tests follow consistent patterns
- No test warnings or errors
