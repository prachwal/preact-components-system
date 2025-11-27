# 🎨 Preact Components System

A modern, lightweight, and highly optimized component library for Preact with TypeScript support, theming, and accessibility features.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/prachwal/preact-components-system)
[![Bundle Size](https://img.shields.io/badge/bundle-53.92kB-success.svg)](https://github.com/prachwal/preact-components-system)
[![Tests](https://img.shields.io/badge/tests-319%2F319-success.svg)](https://github.com/prachwal/preact-components-system)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://github.com/prachwal/preact-components-system)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎯 **Lightweight**: Only 53.92 kB bundle size (14.36 kB gzipped, optimized with tree-shaking)
- 🎨 **Theming**: Complete theme system with light/dark/system modes
- ♿ **Accessible**: WCAG AA compliant with focus management and ARIA support
- 📱 **Responsive**: Mobile-first design with responsive breakpoints
- 🔧 **TypeScript**: Full type safety with strict mode
- 🧪 **Well Tested**: 319/319 tests passing with comprehensive coverage
- 📚 **Documented**: Storybook stories and TypeDoc documentation
- ⚡ **Optimized**: Tree-shaking, external dependencies, and minification

## 📦 Installation

```bash
npm install preact-components-system
# or
yarn add preact-components-system
# or
pnpm add preact-components-system
```

## 🚀 Quick Start

### Basic Usage

```tsx
import { ThemeProvider, Button, Card, Grid } from 'preact-components-system';
import 'preact-components-system/dist/index.css';

function App() {
  return (
    <ThemeProvider>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <Card.Header>Hello World</Card.Header>
            <Card.Content>
              <Button variant='contained' color='primary'>
                Click me
              </Button>
            </Card.Content>
          </Card>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
```

### With Custom Theme

```tsx
import { ThemeProvider, createTheme } from 'preact-components-system';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return <ThemeProvider theme={theme}>{/* Your app */}</ThemeProvider>;
}
```

## 📚 Available Components

### Layout Components

- **Grid** - 12-column responsive grid system
- **Stack** - 1D flex layout with spacing
- **Container** - Max-width content wrapper
- **Box** - Universal wrapper component

### UI Components

- **Button** - Multiple variants (contained, outlined, text) and colors
- **Typography** - Complete typography scale (h1-h6, body, caption)
- **Card** - Content cards with header, media, content, and actions
- **Paper** - Surface with elevation system
- **Alert** - Notifications with severity levels
- **Icon** - Optimized icon system with lucide-preact

### Utility Components

- **Portal** - Render content outside DOM hierarchy
- **FocusTrap** - Accessibility focus management
- **ClickAwayListener** - Detect clicks outside elements

### Hooks

- **useTheme()** - Access theme context
- **useMediaQuery()** - Responsive media queries
- **useBreakpoint()** - Current breakpoint detection
- **useResponsive()** - Responsive value selection

## 🎨 Theming

The library includes a powerful theming system supporting light, dark, and system modes:

```tsx
import { useTheme } from 'preact-components-system';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  );
}
```

## 🧪 Development

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- [VS Code](https://code.visualstudio.com/) with recommended extensions

### VS Code Setup

Install recommended extensions and use the provided workspace settings:

```bash
# The .vscode/settings.json configures:
# - Prettier as default formatter for JS/TS/JSON/MD/HTML/SCSS/YAML
# - Format on save enabled
# - ESLint integration
# - File associations for module types (.mjs, .mts, .cjs, .cts)
```

Recommended extensions (auto-installed):

- **Prettier** - Code formatting
- **ESLint** - Code linting
- **TypeScript Importer** - TypeScript support
- **Tailwind CSS** - CSS IntelliSense
- **Test Explorer** - Test running and debugging

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev              # Start Vite dev server
npm run storybook        # Start Storybook on port 6006
```

### Testing

```bash
npm run test             # Run tests in watch mode
npm run test:run         # Run tests once
npm run test:coverage    # Generate coverage report
npm run test:ui          # Run tests with UI
```

### Building

```bash
npm run build            # Build library for production
npm run build:analyze    # Build with bundle analyzer
npm run build:storybook  # Build Storybook static site
npm run type-check       # TypeScript type checking
```

### Code Quality

```bash
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues automatically
npm run lint:check       # Check ESLint without fixing
npm run format           # Format code with Prettier
npm run format:check     # Check if code is formatted correctly
npm run format:fix       # Alias for format (fix formatting issues)
```

### Documentation

```bash
npm run docs             # Generate TypeDoc documentation
```

## 📊 Performance

| Metric            | Value    | Notes                            |
| ----------------- | -------- | -------------------------------- |
| Bundle Size (ES)  | 53.92 kB | Gzipped: 14.36 kB                |
| Bundle Size (UMD) | 37.96 kB | Gzipped: 12.40 kB                |
| CSS Size          | 23.52 kB | Gzipped: 3.39 kB                 |
| Test Coverage     | 319/319  | 100% passing (83.38% statements) |
| Improvement       | 95%      | From 1,023 kB initial            |

## 🏗️ Architecture

- **Build**: Vite + TypeScript
- **Testing**: Vitest + Testing Library
- **Documentation**: Storybook + TypeDoc
- **Styling**: SCSS modules with CSS variables
- **Icons**: lucide-preact (tree-shakeable)

## 📖 Documentation

- **[Status Overview](./plans/STATUS.md)** - Project status and metrics
- **[Demo Guide](./plans/DEMO.md)** - Component showcase
- **[Implementation Summary](./plans/IMPLEMENTATION_SUMMARY.md)** - Development summary
- **[Storybook](https://prachwal.github.io/preact-components-system/storybook/)** - Live component documentation
- **[TypeDoc](https://prachwal.github.io/preact-components-system/docs/)** - API documentation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT © [prachwal](https://github.com/prachwal)

## 🙏 Acknowledgments

- Built with [Preact](https://preactjs.com/)
- Icons by [Lucide](https://lucide.dev/)
- Inspired by [Material-UI](https://mui.com/) and [Ant Design](https://ant.design/)

## 🔗 Links

- **Repository**: [GitHub](https://github.com/prachwal/preact-components-system)
- **Documentation**: [TypeDoc](https://prachwal.github.io/preact-components-system/docs/)
- **Storybook**: [Component Library](https://prachwal.github.io/preact-components-system/storybook/)
- **NPM**: [Package](https://www.npmjs.com/package/preact-components-system)
