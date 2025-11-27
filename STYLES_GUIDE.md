# Przewodnik po Stylach dla Systemu Komponentów

## Problem

Import SCSS bezpośrednio w komponentach TypeScript nie jest zalecany dla bibliotek komponentów.

```typescript
// ❌ Nie rób tego w bibliotece komponentów
import '../../styles/index.scss';
```

## Zalecane Rozwiązania

### 1. **Zewnętrzny plik CSS (Najlepsze dla bibliotek)**

#### Dlaczego?

- Komponenty pozostają czyste i niezależne od stylów
- Użytkownicy biblioteki mogą nadpisać style według potrzeb
- Lepsza kompatybilność z różnymi bundlerami
- Mniejszy rozmiar bundle'a

#### ✅ Aktualna implementacja (już skonfigurowana):

**Step 1: Importy SCSS zostały usunięte z komponentów**

```typescript
// ✅ src/lib/providers/ThemeProvider.tsx - IMPORT USUNIĘTY
// import '../../styles/index.scss'; <- Ta linia została usunięta
```

**Step 2: Package.json jest skonfigurowany**

```json
{
  "style": "dist/index.css", // ✅ Wskazuje na wygenerowany CSS
  "main": "dist/index.js", // ✅ Główny plik JS
  "types": "dist/index.d.ts", // ✅ Typy TypeScript
  "files": ["dist"] // ✅ Tylko katalog dist
}
```

**Step 3: Build script zawiera CSS**

```json
{
  "scripts": {
    "build": "tsc -p tsconfig.lib.json && npm run build:css && vite build",
    "build:css": "sass src/styles/index.scss dist/index.css --style=compressed"
  }
}
```

**Step 4: Wygenerowany plik CSS**
Po uruchomieniu `npm run build` tworzy się:

```
dist/
├── index.js          # 55.92 kB (ES modules)
├── index.umd.cjs     # 39.06 kB (UMD bundle)
├── index.css         # 81.38 kB (Styles)
├── index.css.map     # Source map
└── index.d.ts        # TypeScript definitions
```

**Step 5: Użytkownik biblioteki importuje style:**

```typescript
// W aplikacji użytkownika
import 'preact-components-system/dist/index.css';
import { Button } from 'preact-components-system';
```

**Auto-aktualizacja przy modyfikacjach:**
Każda modyfikacja plików SCSS w `src/styles/` automatycznie generuje nową wersję `dist/index.css` podczas budowania.

### 2. **CSS Modules (Dla komponentów izolowanych)**

Jeśli potrzebujesz izolacji stylów na poziomie komponentu:

```typescript
// Button.module.scss
.button {
  padding: 8px 16px;
  background: blue;
}

// Button.tsx
import styles from './Button.module.scss';

export const Button = ({ children }) => {
  return <button className={styles.button}>{children}</button>;
};
```

### 3. **CSS-in-JS (Dla dynamicznych stylów)**

Dla komponentów z dynamicznymi stylami:

```typescript
// Styled approach
import { styled } from 'preact-jsx-styles';

const Button = styled.button`
  padding: 8px 16px;
  background: ${(props) => (props.variant === 'primary' ? 'blue' : 'gray')};
`;
```

### 4. **Stylowanie komponentów (BEM methodology)**

Najlepsze dla systemu komponentów z predefiniowanymi klasami:

```scss
/* src/styles/components/button.scss */
.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &--primary {
    background: blue;
    color: white;
  }

  &--secondary {
    background: gray;
    color: black;
  }
}
```

```typescript
// Button.tsx - bez importów stylów
export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: preact.ComponentChildren;
}

export const Button = ({ variant = 'primary', children }: ButtonProps) => {
  return (
    <button className={`btn btn--${variant}`}>
      {children}
    </button>
  );
};
```

## Build Configuration

### Dla biblioteki komponentów:

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    lib: {
      entry: './index.ts',
      name: 'PreactComponentsSystem',
      fileName: 'index',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['preact', 'preact/hooks'],
      output: {
        globals: {
          preact: 'Preact',
          'preact/hooks': 'PreactHooks',
        },
      },
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});
```

### Dla SCSS w bibliotece:

```json
// package.json scripts
{
  "scripts": {
    "build:css": "sass src/styles/index.scss dist/index.css --style=compressed",
    "build": "tsc && npm run build:css && vite build"
  }
}
```

## Najlepsze Praktyki

### ✅ Rób:

- Używaj zewnętrznych plików CSS
- Implementuj BEM methodology dla klas CSS
- Używaj CSS custom properties (zmiennych CSS) dla themingu
- Eksportuj style jako osobny plik CSS
- Dokumentuj jak używać stylów w README

### ❌ Nie rób:

- Nie importuj SCSS bezpośrednio w komponentach TypeScript
- Nie używaj inline styles dla całych komponentów
- Nie polegaj na stylach globalnych w komponentach
- Nie mieszaj różnych metod stylizacji w jednym projekcie

## Przykład końcowej struktury

```
src/
├── lib/
│   ├── components/
│   │   ├── Button.tsx          # Bez importów stylów
│   │   ├── Button.test.tsx
│   │   └── index.ts            # Export komponentów
│   └── theme/
├── styles/
│   ├── index.scss             # Główny plik SCSS
│   ├── components/
│   │   ├── button.scss        # Style komponentów
│   │   └── index.scss
│   └── index.css              # Kompilowany CSS
└── dist/
    ├── index.js               # JavaScript
    └── index.css              # Style dla użytkowników
```

## Dla użytkowników biblioteki

```typescript
// Instalacja
npm install preact-components-system

// Użycie
import 'preact-components-system/dist/index.css'; // Style
import { Button } from 'preact-components-system'; // Komponenty

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
    </div>
  );
}
```

## Szczegóły wygenerowanego CSS

**Plik:** `dist/index.css`
**Rozmiar:** 81.38 kB (skompresowany)
**Zawiera:**

- ✅ Kompletny system kolorów (light/dark theme)
- ✅ Responsywne breakpoints (xs, sm, md, lg, xl)
- ✅ Fluid typography z clamp()
- ✅ Spacing utilities
- ✅ Component styles (Button, Card, Grid, etc.)
- ✅ Layout utilities (Box, Stack, Container)
- ✅ Form components styling
- ✅ Accessibility features
- ✅ CSS custom properties dla themingu

**CSS Custom Properties dostępne:**

```css
:root {
  /* Colors */
  --pta-color-primary: #646cff;
  --pta-color-background: #242424;
  --pta-color-text: rgba(255, 255, 255, 0.87);

  /* Spacing */
  --pta-spacing-unit: 1rem;

  /* Typography */
  --pta-font-family-base: system-ui, sans-serif;

  /* Breakpoints */
  --pta-breakpoint-xs: 480px;
  --pta-breakpoint-sm: 768px;
  --pta-breakpoint-md: 1024px;
}
```

To podejście zapewnia najlepszą kompatybilność, wydajność i łatwość użycia dla użytkowników biblioteki komponentów.
