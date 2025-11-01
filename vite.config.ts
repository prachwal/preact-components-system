import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import packageJson from './package.json'
import { visualizer } from 'rollup-plugin-visualizer'

// Deployment URLs - can be overridden via environment variables
const DEPLOYMENT_BASE_URL = process.env.DEPLOYMENT_BASE_URL || 'https://prachwal.github.io/preact-components-system';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    // Bundle analyzer (only in analyze mode)
    process.env.ANALYZE === 'true' && visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ].filter(Boolean),
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
    __STORYBOOK_URL__: JSON.stringify(`${DEPLOYMENT_BASE_URL}/storybook/`),
    __DOCS_URL__: JSON.stringify(`${DEPLOYMENT_BASE_URL}/docs/`),
    __COVERAGE_URL__: JSON.stringify(`${DEPLOYMENT_BASE_URL}/coverage/`),
    __REPOSITORY_URL__: JSON.stringify(packageJson.repository?.url?.replace('.git', '') || 'https://github.com/prachwal/preact-components-system'),
  },
  build: {
    lib: {
      entry: './index.ts',
      name: 'PreactComponentsSystem',
      fileName: 'index',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['preact', 'preact/hooks', 'preact/compat', 'lucide-preact', 'clsx'],
      output: {
        globals: {
          preact: 'Preact',
          'preact/hooks': 'PreactHooks',
          'preact/compat': 'PreactCompat',
          'lucide-preact': 'LucidePreact',
          'clsx': 'clsx'
        },
        // Optimize chunk splitting
        manualChunks: undefined,
      },
    },
    // Use default minification (esbuild)
    minify: true,
    // Source maps for debugging
    sourcemap: true,
  }
})
