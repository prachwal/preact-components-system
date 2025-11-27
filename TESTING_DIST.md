# Jak używać katalogu dist

Katalog `dist` zawiera gotowy pakiet biblioteki komponentów. Oto jak z niego korzystać:

## 1. Testowanie lokalne

### npm link (zalecane dla development)

```bash
# W katalogu głównym pakietu
npm link

# W projekcie docelowym
npm link preact-components-system
```

### npm pack (do testowania)

```bash
npm run build
npm pack
# Tworzy plik preact-components-system-1.0.1.tgz
# W projekcie docelowym:
npm install preact-components-system-1.0.1.tgz
```

## 2. Testowanie w różnych środowiskach

### Node.js (CommonJS)

```javascript
// test-cjs.js
const { Button, createTheme } = require('preact-components-system');
const { h, render } = require('preact');

// Sprawdź czy moduły działają
console.log('Button component:', typeof Button);
console.log('createTheme function:', typeof createTheme);
```

```bash
node test-cjs.js
```

### ES Modules (modern browsers/bundlers)

```javascript
// test-esm.mjs
import { Button, createTheme } from 'preact-components-system';

console.log('Button component:', typeof Button);
console.log('createTheme function:', typeof createTheme);
```

```bash
node test-esm.mjs
```

### Vite test project

```bash
# Utwórz nowy projekt Vite
npm create vite@latest my-test-app -- --template preact-ts
cd my-test-app

# Zlinkuj nasz pakiet
npm link preact-components-system

# Usuń peer dependencies z package.json
# Dodaj nasz pakiet do dependencies
npm install preact-components-system

# Użyj w App.tsx
echo 'import { Button } from "preact-components-system";
import "preact-components-system/index.css";

export default function App() {
  return (
    <div>
      <h1>Test Preact Components</h1>
      <Button variant="primary">Test Button</Button>
    </div>
  );
}' > src/App.tsx

# Uruchom development server
npm run dev
```

### TypeScript compatibility test

```typescript
// test-ts.ts
import { Button, ThemeProvider, createTheme } from 'preact-components-system';
import 'preact-components-system/index.css';

// Test pełnej funkcjonalności TypeScript
const theme = createTheme({
  mode: 'light',
  primaryColor: '#646cff'
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="primary"
        onClick={() => console.log('Clicked!')}
      >
        Test Button
      </Button>
    </ThemeProvider>
  );
}

// Type checking
const buttonProps: import('preact-components-system').ButtonProps = {
  variant: 'primary',
  children: 'Test'
};

export { App };
```

```bash
npx tsc test-ts.ts --jsx react-jsx --moduleResolution node
```

## 3. Weryfikacja zawartości dist

### Sprawdź strukturę plików

```bash
ls -la dist/
```

### Sprawdź główny plik

```bash
# Sprawdź czy główny plik działa
head -10 dist/index.js
head -10 dist/index.mjs
```

### Sprawdź deklaracje TypeScript

```bash
head -20 dist/index.d.ts
```

### Sprawdź CSS

```bash
head -20 dist/index.css
```

## 4. Test z różnymi bundlerami

### Vite test

```typescript
// vite.config.ts w projekcie testowym
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

### Webpack test

```javascript
// webpack.config.js
module.exports = {
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
```

## 5. Publikacja do npm

### Przygotowanie do publikacji

```bash
# Sprawdź czy wszystko jest gotowe
npm run build
npm test
npm run lint

# Sprawdź package.json
npm publish --dry-run
```

### Publikacja

```bash
# Zaloguj się do npm
npm login

# Publikuj
npm publish
```

## 6. Debugowanie problemów

### Sprawdź ścieżki exports

```bash
node -e "
const pkg = require('./package.json');
console.log('Main:', pkg.main);
console.log('Module:', pkg.module);
console.log('Types:', pkg.types);
console.log('Style:', pkg.style);
console.log('Exports:', JSON.stringify(pkg.exports, null, 2));
"
```

### Sprawdź dependencies

```bash
# Lista dependencies
npm ls preact lucide-preact clsx
```

### Test import paths

```bash
# Test różnych ścieżek import
node -e "
try {
  console.log('Main import:', require('preact-components-system'));
  console.log('ESM import:', import('preact-components-system'));
} catch(e) {
  console.error('Error:', e.message);
}
"
```

## 7. Przykłady użycia w różnych scenariuszach

### Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Test Preact Components</title>
    <link rel="stylesheet" href="preact-components-system/index.css" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module">
      import { Button } from 'preact-components-system';
      import { h, render } from 'preact';

      function App() {
        return h(Button, { variant: 'primary' }, 'Test Button');
      }

      render(h(App), document.getElementById('app'));
    </script>
  </body>
</html>
```

### React compatibility

```jsx
// W projekcie React
import React from 'react';
import { Button } from 'preact-components-system';
import 'preact-components-system/index.css';

function App() {
  return <Button variant='primary'>Test Button</Button>;
}

export default App;
```

Ten przewodnik pokazuje jak dokładnie testować i używać zbudowany pakiet w różnych środowiskach i scenariuszach.
