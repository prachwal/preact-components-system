# 📚 Preact Components System - Complete Documentation

**Version**: 1.0.1  
**Last Updated**: November 2025

## Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Component API](#component-api)
4. [Theme System](#theme-system)
5. [Hooks](#hooks)
6. [Accessibility](#accessibility)
7. [Performance](#performance)
8. [Development](#development)
9. [Architecture](#architecture)

## Overview

Preact Components System is a modern, lightweight component library designed for building high-quality user interfaces with Preact. It provides a comprehensive set of components, a powerful theming system, and excellent developer experience with TypeScript support.

### Key Features

- **Lightweight**: 51 kB bundle (optimized for tree-shaking)
- **Type-Safe**: Full TypeScript support with strict mode
- **Accessible**: WCAG AA compliant with focus management
- **Themeable**: Light/Dark/System modes with custom themes
- **Tested**: 143/143 tests passing, comprehensive coverage
- **Optimized**: Tree-shaking, minification, external dependencies
- **Form Components**: TextField, Checkbox, Radio, Switch with full validation support

### Project Status

- ✅ **Bundle Size**: 51 kB (ES), 36 kB (UMD)
- ✅ **Tests**: 143/143 passing (96 original + 47 new form components)
- ✅ **TypeScript**: Strict mode enabled
- ✅ **Storybook**: All components documented with interactive examples
- ✅ **Performance**: Optimized with tree-shaking
- ✅ **Phase 1 Complete**: All form components implemented (TextField, Checkbox, Radio, Switch)

## Getting Started

### Installation

```bash
npm install preact-components-system
```

### Basic Setup

```tsx
import { ThemeProvider, Button, Card } from 'preact-components-system';
import 'preact-components-system/dist/index.css';

function App() {
  return (
    <ThemeProvider>
      <Card>
        <Card.Header>Welcome</Card.Header>
        <Card.Content>
          <Button variant="contained" color="primary">
            Get Started
          </Button>
        </Card.Content>
      </Card>
    </ThemeProvider>
  );
}
```

## Component API

### Layout Components

#### Grid

A responsive 12-column grid system based on flexbox.

```tsx
<Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={4}>
    <Card>Column 1</Card>
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <Card>Column 2</Card>
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <Card>Column 3</Card>
  </Grid>
</Grid>
```

**Props**:

- `container`: boolean - Creates grid container
- `item`: boolean - Creates grid item
- `spacing`: number (0-8) - Gap between items
- `xs`, `sm`, `md`, `lg`, `xl`: number (1-12) - Column width at breakpoint
- `direction`: 'row' | 'column' - Flex direction
- `justify`: string - Justify content
- `align`: string - Align items

#### Stack

One-dimensional layout with consistent spacing.

```tsx
<Stack direction="vertical" spacing={2}>
  <Button>Item 1</Button>
  <Button>Item 2</Button>
  <Button>Item 3</Button>
</Stack>
```

**Props**:

- `direction`: 'horizontal' | 'vertical' - Stack direction
- `spacing`: number (0-8) - Gap between items
- `align`: 'start' | 'center' | 'end' - Alignment
- `justify`: 'start' | 'center' | 'end' | 'space-between' - Justification

#### Container

Content wrapper with max-width constraints.

```tsx
<Container maxWidth="md">
  <Typography variant="h1">Title</Typography>
</Container>
```

**Props**:

- `maxWidth`: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false - Max width
- `fixed`: boolean - Use fixed width
- `disableGutters`: boolean - Remove horizontal padding

#### Box

Universal wrapper component with styling props.

```tsx
<Box padding={2} margin={1} backgroundColor="primary.light">
  Content
</Box>
```

**Props**:

- `padding`, `margin`: number | string
- `backgroundColor`, `color`: string
- All standard HTML attributes

### UI Components

#### Button

Interactive button with multiple variants and states.

```tsx
<Button 
  variant="contained" 
  color="primary" 
  size="medium"
  disabled={false}
  onClick={handleClick}
>
  Click Me
</Button>
```

**Props**:

- `variant`: 'contained' | 'outlined' | 'text'
- `color`: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
- `size`: 'small' | 'medium' | 'large'
- `disabled`: boolean
- `fullWidth`: boolean

#### Typography

Text component with semantic variants.

```tsx
<Typography variant="h1" component="h1" color="primary">
  Heading
</Typography>
<Typography variant="body1" gutterBottom>
  Body text
</Typography>
```

**Props**:

- `variant`: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'overline'
- `component`: HTML element tag
- `color`: string
- `align`: 'left' | 'center' | 'right' | 'justify'
- `gutterBottom`: boolean

#### Card

Container for content with optional header, media, and actions.

```tsx
<Card>
  <Card.Header>
    <Typography variant="h5">Card Title</Typography>
  </Card.Header>
  <Card.Media>
    <img src="image.jpg" alt="Description" />
  </Card.Media>
  <Card.Content>
    <Typography variant="body1">Card content</Typography>
  </Card.Content>
  <Card.Actions>
    <Button>Action 1</Button>
    <Button>Action 2</Button>
  </Card.Actions>
</Card>
```

**Props**:

- `elevation`: number (0-24) - Shadow depth
- `variant`: 'elevation' | 'outlined'

#### Paper

Surface component with elevation system.

```tsx
<Paper elevation={2} variant="elevation">
  <Typography>Content on elevated surface</Typography>
</Paper>
```

**Props**:

- `elevation`: number (0-24)
- `variant`: 'elevation' | 'outlined'
- `square`: boolean - Remove border radius

#### Alert

Feedback messages with severity levels.

```tsx
<Alert severity="success" onClose={handleClose}>
  <Alert.Title>Success!</Alert.Title>
  Operation completed successfully.
</Alert>
```

**Props**:

- `severity`: 'success' | 'info' | 'warning' | 'error'
- `variant`: 'standard' | 'filled' | 'outlined'
- `onClose`: () => void - Close handler

#### Icon

Scalable vector icons from lucide-preact.

```tsx
<Icon name="Home" size="medium" color="#1976d2" />
<Icon name="Settings" aria-label="Settings" />
<Icon name="Star" decorative />
```

**Props**:

- `name`: IconName - Icon name (e.g., 'Home', 'Star', 'Mail')
- `size`: 'small' | 'medium' | 'large' | number
- `color`: string
- `aria-label`: string - Accessibility label
- `decorative`: boolean - Mark as decorative (aria-hidden)

### Utility Components

#### Portal

Render children outside the DOM hierarchy.

```tsx
<Portal>
  <Modal>This renders at document.body</Modal>
</Portal>

<Portal container={customElement}>
  <Tooltip>This renders in customElement</Tooltip>
</Portal>
```

**Props**:

- `container`: HTMLElement - Target container
- `disablePortal`: boolean - Render inline instead

#### FocusTrap

Trap keyboard focus within a component for accessibility.

```tsx
<FocusTrap active={isOpen} autoFocus restoreFocus>
  <Dialog>
    <button>First</button>
    <button>Last</button>
  </Dialog>
</FocusTrap>
```

**Props**:

- `active`: boolean - Enable trap
- `autoFocus`: boolean - Focus first element on mount
- `restoreFocus`: boolean - Restore focus on unmount

#### ClickAwayListener

Detect clicks outside an element.

```tsx
<ClickAwayListener onClickAway={handleClose}>
  <Menu>{/* menu items */}</Menu>
</ClickAwayListener>
```

**Props**:

- `onClickAway`: (event: Event) => void
- `mouseEvent`: 'onClick' | 'onMouseDown' | 'onMouseUp' | false
- `touchEvent`: 'onTouchStart' | 'onTouchEnd' | false
- `disableReactTree`: boolean

## Theme System

### Creating Custom Themes

```tsx
import { createTheme, ThemeProvider } from 'preact-components-system';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 300,
    },
  },
  spacing: 8, // base spacing unit
  shape: {
    borderRadius: 4,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* Your app */}
    </ThemeProvider>
  );
}
```

### Theme Modes

```tsx
import { useTheme } from 'preact-components-system';

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('system')}>System</button>
      <p>Current: {theme}</p>
    </div>
  );
}
```

### Accessing Theme in Components

```tsx
import { useTheme } from 'preact-components-system';

function CustomComponent() {
  const { theme, currentTheme } = useTheme();
  
  return (
    <div style={{ 
      color: currentTheme.palette.primary.main,
      fontFamily: currentTheme.typography.fontFamily 
    }}>
      Themed content
    </div>
  );
}
```

## Hooks

### useTheme

Access the theme context.

```tsx
const { theme, setTheme, currentTheme } = useTheme();
```

**Returns**:

- `theme`: 'light' | 'dark' | 'system'
- `setTheme`: (theme: 'light' | 'dark' | 'system') => void
- `currentTheme`: Theme object

### useMediaQuery

Respond to media query changes.

```tsx
const isMobile = useMediaQuery('(max-width: 768px)');
const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
```

### useBreakpoint

Get current breakpoint.

```tsx
const breakpoint = useBreakpoint();
// Returns: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
```

### useResponsive

Select values based on breakpoint.

```tsx
const columns = useResponsive({
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
});
```

## Accessibility

### Focus Management

Use `FocusTrap` for modal dialogs and similar components:

```tsx
<FocusTrap active={isOpen} autoFocus restoreFocus>
  <Dialog role="dialog" aria-modal="true" aria-labelledby="dialog-title">
    <h2 id="dialog-title">Dialog Title</h2>
    <button onClick={handleClose}>Close</button>
  </Dialog>
</FocusTrap>
```

### ARIA Labels

All interactive components support ARIA attributes:

```tsx
<Button aria-label="Close dialog" aria-pressed={isPressed}>
  <Icon name="X" decorative />
</Button>

<Icon name="Home" aria-label="Go to home page" />
```

### Keyboard Navigation

- All interactive components are keyboard accessible
- Tab navigation follows logical order
- Enter/Space activate buttons
- Escape closes dialogs and menus

## Performance

### Bundle Size Optimization

The library is optimized for minimal bundle size:

- **Tree-shaking**: Import only what you need
- **External dependencies**: Preact, lucide-preact, clsx are externalized
- **Minification**: Code is minified with esbuild
- **Code splitting**: Components can be imported individually

```tsx
// Import specific components (recommended)
import { Button, Card } from 'preact-components-system';

// Or import from specific files
import Button from 'preact-components-system/dist/Button';
```

### Icon Optimization

Icons use selective imports to minimize bundle size:

```tsx
// ✅ Good - only imports Home icon
import { Icon } from 'preact-components-system';
<Icon name="Home" />

// ❌ Bad - would import all icons (don't do this in your code)
import * as icons from 'lucide-preact';
```

### Production Build

```bash
npm run build
```

Produces optimized builds:

- ES module: 40.19 kB (gzipped: 10.87 kB)
- UMD: 28.80 kB (gzipped: 9.58 kB)
- CSS: 23.52 kB (gzipped: 3.39 kB)

## Development

### Project Structure

```text
preact-components-system/
├── src/
│   ├── components/       # Component implementations
│   │   ├── layout/       # Grid, Stack, Container, Box
│   │   ├── ui/           # Button, Card, Typography, etc.
│   │   └── utils/        # Portal, FocusTrap, ClickAwayListener
│   ├── contexts/         # Theme and other contexts
│   ├── hooks/            # Custom hooks
│   ├── providers/        # Context providers
│   ├── theme/            # Theme system
│   ├── types/            # TypeScript types
│   └── styles/           # SCSS styles
├── plans/                # Project planning docs
├── .storybook/           # Storybook configuration
├── dist/                 # Built library
└── docs/                 # Generated documentation
```

### Scripts

```bash
# Development
npm run dev              # Start dev server
npm run storybook        # Start Storybook

# Testing
npm run test             # Run tests in watch mode
npm run test:run         # Run tests once
npm run test:coverage    # Generate coverage report
npm run test:ui          # Run tests with UI

# Building
npm run build            # Build library
npm run build:analyze    # Build with analyzer
npm run build:storybook  # Build Storybook
npm run type-check       # TypeScript checking

# Documentation
npm run docs             # Generate TypeDoc
```

### Code Style

- **TypeScript**: Strict mode enabled
- **Formatting**: Consistent code style
- **Naming**: PascalCase for components, camelCase for functions
- **Testing**: Test files co-located with components

### Adding New Components

1. Create component file: `src/components/[category]/[Name].tsx`
2. Create test file: `src/components/[category]/[Name].test.tsx`
3. Create story: `src/stories/[Name].stories.tsx`
4. Export from `index.ts`
5. Add documentation to component with JSDoc comments

## Architecture

### Build System

- **Vite**: Fast build tool with HMR
- **TypeScript**: Type checking and compilation
- **SCSS**: Styling with CSS modules
- **Rollup**: Library bundling with optimization

### Testing Stack

- **Vitest**: Fast unit testing
- **Testing Library**: Component testing utilities
- **jsdom**: DOM environment for tests
- **jest-axe**: Accessibility testing

### Documentation

- **Storybook**: Interactive component documentation
- **TypeDoc**: API documentation generation
- **Markdown**: Project documentation

### CI/CD

- **GitHub Actions**: Automated testing and building
- **GitLab CI**: Alternative CI/CD pipeline
- **Pages**: Documentation hosting

### Dependencies

**Runtime**:

- `preact`: Core library
- `lucide-preact`: Icon system
- `clsx`: Conditional classes

**Development**:

- `vite`: Build tool
- `typescript`: Type system
- `vitest`: Testing framework
- `storybook`: Documentation
- `typedoc`: API docs
- `sass`: CSS preprocessing

## Form Components

The library includes a comprehensive set of form components built with accessibility, validation, and user experience in mind. All form components support:

- Multiple sizes (small, medium, large)
- Multiple colors (primary, secondary, error, warning, info, success)
- Full accessibility (ARIA attributes, keyboard navigation, screen reader support)
- Label positioning (start, end, top, bottom)
- Disabled and required states
- Form integration with native HTML forms

### TextField

A versatile text input component supporting single-line and multiline input.

**Features**:

- Three variants: outlined, filled, standard
- Validation states (error, success, warning)
- Helper text
- Start and end adornments
- Multiline support (textarea)
- Full width option

**Example**:

```tsx
import { TextField } from 'preact-components-system';

<TextField
  label="Email"
  type="email"
  variant="outlined"
  error={!!errors.email}
  helperText={errors.email || "We'll never share your email"}
  startAdornment={<EmailIcon />}
  fullWidth
/>
```

### Checkbox

A checkbox input with support for indeterminate state.

**Features**:

- Indeterminate state support
- Label positioning
- Form integration
- Interactive Storybook examples (select all pattern)

**Example**:

```tsx
import { Checkbox } from 'preact-components-system';

<Checkbox
  checked={accepted}
  onChange={(e) => setAccepted(e.target.checked)}
  label="I accept the terms and conditions"
  required
/>
```

### Radio & RadioGroup

Radio buttons for mutually exclusive selections.

**Features**:

- RadioGroup for managing radio groups
- Horizontal and vertical layouts
- Form integration
- Accessibility with role="radiogroup"

**Example**:

```tsx
import { Radio, RadioGroup } from 'preact-components-system';

<RadioGroup name="size" value={size} onChange={setSize}>
  <Radio value="small" label="Small" />
  <Radio value="medium" label="Medium" />
  <Radio value="large" label="Large" />
</RadioGroup>
```

### Switch

A toggle switch for boolean states.

**Features**:

- Custom on/off labels
- Label positioning
- Settings panel examples
- Role="switch" for accessibility

**Example**:

```tsx
import { Switch } from 'preact-components-system';

<Switch
  checked={enabled}
  onChange={(e) => setEnabled(e.target.checked)}
  label="Enable notifications"
  onLabel="ON"
  offLabel="OFF"
/>
```

## Support

- **Documentation**: [TypeDoc](https://prachwal.github.io/preact-components-system/docs/)
- **Examples**: [Storybook](https://prachwal.github.io/preact-components-system/storybook/)
- **Issues**: [GitHub Issues](https://github.com/prachwal/preact-components-system/issues)
- **Repository**: [GitHub](https://github.com/prachwal/preact-components-system)

## License

MIT © [prachwal](https://github.com/prachwal)
