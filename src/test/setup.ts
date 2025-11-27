/// <reference types="@testing-library/jest-dom" />

import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/preact';
import { expect, afterEach } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Define global constants used in the app
(globalThis as Record<string, unknown>).__APP_VERSION__ = '1.0.1';
(globalThis as Record<string, unknown>).__STORYBOOK_URL__ =
  'https://prachwal.github.io/preact-components-system/storybook/';
(globalThis as Record<string, unknown>).__DOCS_URL__ =
  'https://github.com/prachwal/preact-components-system/docs/';
(globalThis as Record<string, unknown>).__COVERAGE_URL__ =
  'https://github.com/prachwal/preact-components-system/coverage/';
(globalThis as Record<string, unknown>).__REPOSITORY_URL__ =
  'https://github.com/prachwal/preact-components-system';
