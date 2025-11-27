import preact from '@preact/preset-vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'

import packageJson from './package.json'


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
      fileName: (format) => {
        // Output different filenames for different formats
        if (format === 'es') return 'index.mjs';
        if (format === 'cjs') return 'index.js';
        return 'index.js';
      },
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: [
        'preact',
        'preact/hooks',
        'preact/compat',
        'lucide-preact',
        'clsx'
      ],
      output: {
        globals: {
          preact: 'Preact',
          'preact/hooks': 'PreactHooks',
          'preact/compat': 'PreactCompat',
          'lucide-preact': 'LucidePreact',
          'clsx': 'clsx'
        },
        // Preserve module structure for better tree shaking
        preserveModules: true,
        preserveModulesRoot: 'src/lib',
        // Note: manualChunks is not compatible with preserveModules
        // Chunking will be handled automatically by Rollup
      },
    },
    // Minification settings
    minify: 'esbuild',
    sourcemap: true,
    // Copy CSS file
    copyPublicDir: false,
    assetsDir: 'assets',
  }
})
