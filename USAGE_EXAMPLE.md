# Przykład Użycia - Preact Components System

## Instalacja

```bash
npm install preact-components-system
```

## Podstawowe użycie

### 1. Import stylów (wymagane)

```typescript
// W głównym pliku aplikacji (App.tsx lub main.tsx)
import 'preact-components-system/dist/index.css';

// Import komponentów
import { Button, Card, ThemeProvider } from 'preact-components-system';
```

### 2. Theme Provider

```typescript
// App.tsx
import { ThemeProvider } from 'preact-components-system';
import 'preact-components-system/dist/index.css';

export function App() {
  return (
    <ThemeProvider>
      <div>
        <h1>My Application</h1>
        <Button variant="primary">Click me</Button>
        <Card>
          <h3>Card Title</h3>
          <p>Card content goes here</p>
        </Card>
      </div>
    </ThemeProvider>
  );
}
```

### 3. Przykłady komponentów

```typescript
import {
  Button,
  Card,
  TextField,
  Switch,
  Grid,
  Stack,
  Box,
  ThemeToggle
} from 'preact-components-system';

export function ComponentExamples() {
  return (
    <Stack spacing={3}>
      {/* Buttons */}
      <div>
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="ghost">Ghost Button</Button>
      </div>

      {/* Form components */}
      <Card>
        <Stack spacing={2}>
          <TextField
            label="Email"
            type="email"
            placeholder="Enter your email"
          />
          <Switch label="Enable notifications" />
        </Stack>
      </Card>

      {/* Layout components */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box p={2} component="article">
            <h3>Article 1</h3>
            <p>Content...</p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box p={2} component="article">
            <h3>Article 2</h3>
            <p>Content...</p>
          </Box>
        </Grid>
      </Grid>

      {/* Theme toggle */}
      <ThemeToggle />
    </Stack>
  );
}
```

## Struktura plików po instalacji

Po instalacji biblioteki w Twoim projekcie:

```
node_modules/preact-components-system/
├── dist/
│   ├── index.js          # ES modules
│   ├── index.umd.cjs     # UMD bundle
│   ├── index.css         # Styles (81KB compressed)
│   └── index.d.ts        # TypeScript definitions
└── package.json
```

## Import tylko wybranych komponentów

```typescript
// Import individual components
import { Button } from 'preact-components-system/lib/components/ui/Button';
import { Card } from 'preact-components-system/lib/components/ui/Card';

// Import hooks
import { useBreakpoint } from 'preact-components-system/lib/hooks/useBreakpoint';

// Import utilities
import { createTheme } from 'preact-components-system/lib/theme/createTheme';
```

## Theming

```typescript
import { ThemeProvider, createTheme } from 'preact-components-system';

const customTheme = createTheme({
  palette: {
    primary: '#ff6b6b',
    secondary: '#4ecdc4',
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});

export function ThemedApp() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* Your components */}
    </ThemeProvider>
  );
}
```

## CSS Custom Properties

Biblioteka używa CSS custom properties, które możesz nadpisać:

```css
:root {
  --pta-color-primary: #your-color;
  --pta-spacing-unit: 10px;
  --pta-border-radius: 8px;
}
```

## Dostępne style

Po imporcie `dist/index.css` masz dostęp do:

- ✅ Kompletny system kolorów (light/dark theme)
- ✅ Responsywne breakpoints
- ✅ Fluid typography
- ✅ Spacing utilities
- ✅ Component styles (Button, Card, Grid, etc.)
- ✅ Layout utilities (Box, Stack, Container)
- ✅ Form components styling
- ✅ Accessibility features

## Troubleshooting

### Style nie są aplikowane

Upewnij się, że zaimportowałeś plik CSS:

```typescript
import 'preact-components-system/dist/index.css';
```

### TypeScript błędy

Zaktualizuj `tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "preact"
  }
}
```

### Bundle size

Dla optymalizacji rozmiaru bundle'a, importuj tylko potrzebne komponenty:

```typescript
import { Button } from 'preact-components-system/lib/components/ui/Button';
```

## Pełna lista komponentów

### Layout

- `Box` - Flexible container with responsive spacing
- `Grid` - CSS Grid system
- `Stack` - Flexbox layout container
- `Container` - Centered container
- `Main` - Main content area
- `Header` - Application header
- `Footer` - Application footer
- `Sidebar` - Responsive navigation sidebar

### UI Components

- `Button` - Various button variants
- `Card` - Content container
- `TextField` - Form input
- `Switch` - Toggle switch
- `Checkbox` - Checkbox input
- `Radio` - Radio button group
- `Alert` - Alert messages
- `Paper` - Elevated surface
- `Typography` - Text components
- `ThemeToggle` - Theme switcher
- `Icon` - Icon component
- `Hamburger` - Mobile menu button

### Common

- `Heading` - Typography headings
- `Logo` - Application logo
- `ContentSection` - Content wrapper
- `SkipLink` - Accessibility skip link

### Utils

- `FocusTrap` - Focus trapping utility
- `ClickAwayListener` - Outside click detection
- `Portal` - Portal rendering

### Hooks

- `useBreakpoint` - Current viewport breakpoint
- `useResponsive` - Responsive value utilities
- `useResponsiveBatch` - Multiple responsive values
- `useResponsiveStyles` - Responsive styles
- `useSpacing` - Spacing utilities
- `useMediaQuery` - Media query hooks
- `useLayout` - Layout utilities

Szczegółową dokumentację API znajdziesz w pliku `STYLES_GUIDE.md`.
