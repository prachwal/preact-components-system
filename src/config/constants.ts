/**
 * Application configuration constants
 */

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
export const APP_VERSION = (globalThis as any).__APP_VERSION__ || '0.0.0';