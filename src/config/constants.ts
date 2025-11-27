/**
 * Application configuration constants
 */

/** Extend globalThis to include build variables */
declare global {
  var __APP_VERSION__: string | undefined;
  var __STORYBOOK_URL__: string | undefined;
  var __DOCS_URL__: string | undefined;
  var __COVERAGE_URL__: string | undefined;
  var __REPOSITORY_URL__: string | undefined;
}

/** Application information */
export const APP_NAME = 'Preact Components System';
// Note: APP_VERSION is injected via vite.config.ts as __APP_VERSION__ from package.json

/** Storage keys */
export const THEME_STORAGE_KEY = 'app:theme';
export const USER_PREFERENCES_KEY = 'app:preferences';
export const AUTH_TOKEN_KEY = 'app:auth-token';

/** API configuration */
export const API_BASE_URL = 'https://api.example.com';
export const API_TIMEOUT = 5000;

/** Feature flags */
export const ENABLE_ANALYTICS = false;
export const ENABLE_DEBUG_MODE = true;

/** UI Configuration */
export const SIDEBAR_WIDTH = 280;
export const ANIMATION_DURATION = 300;

/** Theme configuration */
export const DEFAULT_THEME = 'system';
export const AVAILABLE_THEMES = ['light', 'dark', 'system'] as const;

/**
 * Injected at build time via vite.config.ts
 * Use this for runtime version information
 */
export const APP_VERSION = globalThis.__APP_VERSION__ ?? '0.0.0';

/**
 * Deployment URLs - injected at build time via vite.config.ts
 */
export const STORYBOOK_URL = globalThis.__STORYBOOK_URL__ ?? 'https://prachwal.github.io/preact-components-system/storybook/';
export const DOCS_URL = globalThis.__DOCS_URL__ ?? 'https://prachwal.github.io/preact-components-system/docs/';
export const COVERAGE_URL = globalThis.__COVERAGE_URL__ ?? 'https://prachwal.github.io/preact-components-system/coverage/';
export const REPOSITORY_URL = globalThis.__REPOSITORY_URL__ ?? 'https://github.com/prachwal/preact-components-system';