# Użycie pakietu preact-components-system

Pakiet jest teraz skonfigurowany do pracy z projektami JavaScript i TypeScript.

## Instalacja

```bash
npm install preact-components-system
# lub
yarn add preact-components-system
```

## Użycie w projektach

### 1. Użycie w projektach TypeScript

```typescript
// main.ts
import { Button, ThemeProvider, createTheme } from 'preact-components-system';
import 'preact-components-system/index.css'; // Import CSS

// Użycie komponentów z pełną obsługą TypeScript
const theme = createTheme({
  mode: 'light',
  primaryColor: '#646cff'
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="primary" onClick={() => console.log('Clicked!')}>
        Kliknij mnie
      </Button>
    </ThemeProvider>
  );
}
```

### 2. Użycie w projektach JavaScript

```javascript
// main.js
import { Button, ThemeProvider, createTheme } from 'preact-components-system';
import 'preact-components-system/index.css'; // Import CSS

// Użycie komponentów w JavaScript
const theme = createTheme({
  mode: 'dark',
  primaryColor: '#ff6464',
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button variant='secondary' onClick={() => alert('Hello!')}>
        Powitanie
      </Button>
    </ThemeProvider>
  );
}
```

### 3. Import selektywny (Tree Shaking)

```typescript
// Import tylko potrzebnych komponentów
import { Button } from 'preact-components-system/ui';
import { Container } from 'preact-components-system/layout';
import { useTheme } from 'preact-components-system/hooks';
```

### 4. Import modułowy

```typescript
// Import poszczególnych modułów
import * as Theme from 'preact-components-system/theme';
import * as UI from 'preact-components-system/ui';
import * as Layout from 'preact-components-system/layout';

// Użycie
const theme = Theme.createTheme(Theme.defaultTheme);
const ButtonComponent = UI.Button;
const ContainerComponent = Layout.Container;
```

## Konfiguracja bundlera

### Vite

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      preact: 'preact',
      react: 'preact/compat',
    },
  },
});
```

### Webpack

```javascript
// webpack.config.js
module.exports = {
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
};
```

## CSS

Pakiet zawiera dwa pliki CSS:

- `index.css` - główny plik stylów
- `preact-components-system.css` - plik wygenerowany przez Vite

```javascript
// Import CSS
import 'preact-components-system/index.css';
// lub
import 'preact-components-system/dist/index.css';
```

## Funkcje

- ✅ **Pełna kompatybilność TypeScript** - deklaracje typów
- ✅ **Tree Shaking** - importowanie tylko używanych komponentów
- ✅ **Moduły ES i CommonJS** - obsługa różnych środowisk bundlerów
- ✅ **CSS Modules** - style zoptymalizowane dla komponentów
- ✅ **Source Maps** - łatwe debugowanie
- ✅ **External Dependencies** - Preact i inne zależności jako peer dependencies

## Struktura exports

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "style": "./dist/index.css",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./ui": {
      "types": "./dist/ui.d.ts",
      "import": "./dist/ui.mjs",
      "require": "./dist/ui.js"
    },
    "/layout": {
      "types": "./dist/layout.d.ts",
      "import": "./dist/layout.mjs",
      "require": "./dist/layout.js"
    }
    // ... więcej modułów
  }
}
```

Ta konfiguracja zapewnia optymalne ładowanie w różnych środowiskach i bundlerach.
