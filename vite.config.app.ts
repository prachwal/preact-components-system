import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import packageJson from './package.json'

// Deployment URLs - can be overridden via environment variables
const DEPLOYMENT_BASE_URL = process.env.DEPLOYMENT_BASE_URL || 'https://prachwal.github.io/preact-components-system';

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  base: '/preact-components-system/',
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
    __STORYBOOK_URL__: JSON.stringify(`${DEPLOYMENT_BASE_URL}/storybook/`),
    __DOCS_URL__: JSON.stringify(`${DEPLOYMENT_BASE_URL}/docs/`),
    __COVERAGE_URL__: JSON.stringify(`${DEPLOYMENT_BASE_URL}/coverage/`),
    __REPOSITORY_URL__: JSON.stringify(
      packageJson.repository?.url?.endsWith('.git')
        ? packageJson.repository.url.replace(/\.git$/, '')
        : packageJson.repository?.url || 'https://github.com/prachwal/preact-components-system'
    ),
  },
  build: {
    outDir: 'dist-app',
    emptyOutDir: true,
    sourcemap: true,
  }
})
