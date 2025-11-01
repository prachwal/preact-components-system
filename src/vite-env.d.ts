/// <reference types="vite/client" />

/** Injected application version from package.json via vite.config.ts */
declare global {
  const __APP_VERSION__: string;
}

export {};
