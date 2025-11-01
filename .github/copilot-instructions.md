# Preact Components System - AI Agent Instructions

## Architecture Overview
This is a Preact component library built with Vite and TypeScript. The codebase follows a modular architecture with clear separation of concerns:

- **Components**: Organized in `src/components/` by category (`common/`, `layout/`, `ui/`)
- **State Management**: Theme context with provider pattern in `src/contexts/` and `src/providers/`
- **Types**: Centralized type definitions in `src/types/`
- **Hooks**: Custom hooks in `src/hooks/`
- **Theme System**: Custom implementation supporting 'light', 'dark', 'system' modes with CSS variables

## Build & Development
- **Build**: `npm run build` (runs TypeScript declarations, CSS compilation, then Vite library build)
- **Dev**: `npm run dev` (Vite dev server)
- **TypeScript**: Uses project references with separate configs:
  - `tsconfig.app.json`: App compilation (noEmit: true)
  - `tsconfig.lib.json`: Library declarations (emitDeclarationOnly: true)
  - `tsconfig.node.json`: Node tooling (Vite config)
- **Styling**: SCSS compiled to `dist/index.css` with source maps
- **Library Output**: ES module + UMD builds in `dist/`

## Component Patterns
- Functional components with explicit TypeScript interfaces
- Props destructuring with default values: `const Component = ({ prop = default }: Props) =>`
- Class name concatenation: `const className = \`base-class ${additionalClasses}\`.trim()`
- Wrapper component pattern: `as?: 'article' | 'section' | 'div'` prop for semantic flexibility
- SVG icons using `currentColor` for theme compatibility
- Theme cycling logic: light → dark → system → light

## Theme System
Custom theme implementation supporting 'light', 'dark', 'system':
- Persists to localStorage with key `'app:theme'`
- Applies `data-theme` attribute to `<html>` and `is-dark` class for system preference handling
- Use `useTheme()` hook from `src/contexts/ThemeContext`

## Responsive Design
- Mobile-first approach with breakpoint constants: `MOBILE_BREAKPOINT = 768`, `TABLET_BREAKPOINT = 1024`
- Responsive sidebar with collapse states based on viewport width
- Touch-friendly hamburger menu with accessibility controls

## Accessibility Patterns
- ARIA labels and controls: `aria-label`, `aria-controls`, `aria-expanded`
- Focus management: programmatic focus on menu open/close
- Keyboard navigation: Escape key handling, Tab trapping
- Semantic HTML with configurable wrapper elements
- Skip links for screen reader navigation

## Navigation & State
- Hash-based routing for section navigation
- Active section tracking via `window.location.hash`
- Responsive sidebar state management with body scroll locking

## Development Workflows
- **Storybook**: `npm run storybook` for component development and testing
- **Documentation**: `npm run docs` generates TypeDoc documentation
- **Type Checking**: `npm run type-check` for strict TypeScript validation
- **File Merging**: `npm run merge-ts` creates `merged-ts-files.txt` for AI analysis

## Versioning
App version injected via Vite's `define` from `package.json` as `__APP_VERSION__` global constant. Access via `useAppVersion()` hook or `APP_VERSION` from `src/config/constants.ts`.

## Key Files
- `src/App.tsx`: Root component wrapped in ThemeProvider
- `src/components/layout/AppShell.tsx`: Main layout with sidebar state management
- `src/providers/ThemeProvider.tsx`: Theme logic and system preference detection
- `src/components/layout/Sidebar.tsx`: Responsive navigation with accessibility features
- `tsconfig.app.json`: React path mapping for Preact compatibility (`"react": ["./node_modules/preact/compat/"]`)
- `index.ts`: Library entry point exporting components

## Build Configuration
- **Vite**: Configured for library mode with external dependencies (`preact`, `preact/hooks`)
- **CSS**: Compiled from `src/index.scss` using Sass
- **Declarations**: Generated from `index.ts` entry point, excluding runtime constants
- **Package**: Published as dual ES+UMD with TypeScript declarations

## Common Patterns
- Component composition over inheritance
- Context + hooks for shared state
- Semantic HTML with configurable wrapper elements
- Strict TypeScript with no unused variables/parameters
- Runtime constants with fallback values for build compatibility
- Responsive breakpoints defined as named constants
- Hash-based navigation with automatic active section detection

## Testing Patterns
- **Framework**: Vitest with jsdom environment
- **Utilities**: @testing-library/preact with jest-dom matchers
- **Setup**: Global test setup in `src/test/setup.ts` with cleanup after each test
- **Coverage**: V8 provider with HTML, JSON, and cobertura reporters
- **Test Files**: Component tests check class application, props handling, and DOM structure
- **Accessibility**: jest-axe integration for a11y testing

## Integration Points
- **External Dependencies**: `preact`, `preact/hooks`, `lucide-preact`, `clsx` (externals in build)
- **Build Tools**: Vite with @preact/preset-vite, rollup-plugin-visualizer for bundle analysis
- **Documentation**: Storybook with @storybook/preact-vite, TypeDoc for API docs
- **Deployment**: GitHub Pages integration with configurable base URLs via environment variables

## Critical Workflows & Conventions
- **Build Sequence**: `npm run build` runs TypeScript lib compilation first, then CSS compilation, then Vite library build
- **TypeScript Project References**: Separate configs for app (noEmit), lib (emitDeclarationOnly), and node tooling
- **React Compatibility**: Path mapping `"react": ["./node_modules/preact/compat/"]` for React ecosystem compatibility
- **Build-time Injection**: Runtime constants injected via Vite's `define` from package.json and environment variables
- **Theme Persistence**: localStorage key `'app:theme'` with validation and system preference detection
- **Bundle Optimization**: 96% size reduction achieved through tree-shaking, externals, and minification
- **Component Architecture**: Library-first design with dual ES+UMD outputs and tree-shakeable exports

## ABSOLUTE DIRECTIVE: Build Requirements
**MANDATORY BEFORE ANY PULL REQUEST**

When working as an AI agent, you MUST execute these build commands in sequence before creating or updating any pull request:

1. **Application Build**: `npm run build` - Validates TypeScript compilation and library generation
2. **Documentation Build**: `npm run docs` - Generates TypeDoc API documentation  
3. **Storybook Build**: `npm run build:storybook` - Builds static Storybook site for component documentation

**Failure to complete all three builds successfully will prevent pull request creation.** This ensures:
- Code compiles without TypeScript errors
- Documentation is up-to-date with latest changes
- Component stories are properly built and accessible
- All integration points remain functional