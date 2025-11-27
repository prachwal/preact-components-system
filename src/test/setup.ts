import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/preact';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Define global constants used in the app
(globalThis as any).__APP_VERSION__ = '1.0.1';
(globalThis as any).__STORYBOOK_URL__ = 'https://prachwal.github.io/preact-components-system/storybook/';
(globalThis as any).__DOCS_URL__ = 'https://prachwal.github.io/preact-components-system/docs/';
(globalThis as any).__COVERAGE_URL__ = 'https://prachwal.github.io/preact-components-system/coverage/';
(globalThis as any).__REPOSITORY_URL__ = 'https://github.com/prachwal/preact-components-system';
