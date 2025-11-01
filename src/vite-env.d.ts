/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DEPLOYMENT_BASE_URL: string;
  readonly ANALYZE: string;
}

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}
