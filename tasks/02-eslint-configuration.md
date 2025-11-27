# 🔧 Task: ESLint Configuration Setup

**Status**: ✅ COMPLETED
**Priority**: HIGH
**Estimated Time**: 1-2 hours
**Scope**: Configure comprehensive ESLint rules for TypeScript and Preact

## 🎯 Current Issues

- No ESLint config found in project root
- Only incomplete config in `src/stories/.eslintrc.json`
- Missing TypeScript-specific linting rules
- No accessibility linting rules configured
- No import/order rules enforced
- No complexity rules
- No consistent coding standards

## 📋 Implementation Tasks

### 1. Create Main ESLint Configuration

Create `eslint.config.js` in project root with:

```javascript
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      'import': importPlugin,
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',

      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Accessibility rules
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/aria-role': 'error',

      // Import rules
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
        },
      ],

      // General code quality
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
  {
    files: ['**/*.test.{js,jsx,ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
    },
  },
];
```

### 2. Install Required Dependencies

```bash
npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-import
```

### 3. Update Package.json Scripts

Add to `scripts` section:

```json
"lint": "eslint src --ext .ts,.tsx --report-unused-disable-directives --max-warnings 0",
"lint:fix": "eslint src --ext .ts,.tsx --fix",
"lint:check": "eslint src --ext .ts,.tsx --report-unused-disable-directives"
```

### 4. Remove Old Configuration

Remove or update `src/stories/.eslintrc.json` to extend main config.

### 5. Configure VS Code Integration

Create `.vscode/settings.json`:

```json
{
  "eslint.experimental.useFlatConfig": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.formatOnSave": true
}
```

## ✅ Success Criteria

- ESLint runs without errors on entire codebase
- TypeScript-specific rules configured
- Accessibility linting enabled
- Import ordering enforced
- VS Code integration working
- Pre-commit hooks can use linting
- Zero linting errors in CI/CD

## 📚 Resources

- [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files-new)
- [TypeScript ESLint Rules](https://typescript-eslint.io/rules/)
- [ESLint Plugin React Hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
- [ESLint Plugin JSX A11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)
