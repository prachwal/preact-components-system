# Preact Components System - AI Agent Instructions

## Architecture Overview
This is a Preact component library built with Vite and TypeScript. The codebase follows a modular architecture with clear separation of concerns:

- **Components**: Organized in `src/components/` by category (`common/`, `layout/`, `ui/`)
- **State Management**: Theme context with provider pattern in `src/contexts/` and `src/providers/`
- **Types**: Centralized type definitions in `src/types/`
- **Hooks**: Custom hooks in `src/hooks/`

## Build & Development
- **Build**: `npm run build` (runs TypeScript compilation first, then Vite build)
- **Dev**: `npm run dev` (Vite dev server)
- **TypeScript**: Uses project references with separate configs for app and node environments
- **Styling**: SCSS with class-based CSS architecture

## Component Patterns
- Functional components with explicit TypeScript interfaces
- Props destructuring with default values: `const Component = ({ prop = default }: Props) =>`
- Class name concatenation: `const className = \`base-class ${additionalClasses}\`.trim()`
- Wrapper component pattern: `as?: 'article' | 'section' | 'div'` prop for semantic flexibility

## Theme System
Custom theme implementation supporting 'light', 'dark', 'system':
- Persists to localStorage with key `'app:theme'`
- Applies `data-theme` attribute to `<html>` and `is-dark` class for system preference handling
- Use `useTheme()` hook from `src/contexts/ThemeContext`

## Versioning
App version injected via Vite's `define` from `package.json` as `__APP_VERSION__` global constant. Access via `useAppVersion()` hook.

## Key Files
- `src/App.tsx`: Root component wrapped in ThemeProvider
- `src/components/layout/AppShell.tsx`: Main layout with sidebar state management
- `src/providers/ThemeProvider.tsx`: Theme logic and system preference detection
- `tsconfig.app.json`: React path mapping for Preact compatibility (`"react": ["./node_modules/preact/compat/"]`)

## Common Patterns
- Component composition over inheritance
- Context + hooks for shared state
- Semantic HTML with configurable wrapper elements
- Strict TypeScript with no unused variables/parameters