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
        // Fixed filenames without hashes for main entry points
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
        // Named exports for better compatibility
        exports: 'named',
        // Fixed filenames without hashes for main entry files
        entryFileNames: '[name].js',
        // Only hash chunk files, not main files
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'styles/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        // Manual chunks for better optimization
        manualChunks: (id) => {
          // Create separate chunks for external dependencies
          if (id.includes('node_modules')) {
            if (id.includes('preact')) {
              return 'preact-vendor';
            }
            if (id.includes('lucide-preact') || id.includes('clsx')) {
              return 'ui-vendor';
            }
            return 'vendor';
          }
          
          // Separate chunks by module type for better tree-shaking
          if (id.includes('/theme/') || id.includes('/config/') || id.includes('/types/')) {
            return 'theme-chunk';
          }
          if (id.includes('/components/ui/')) {
            return 'ui-components';
          }
          if (id.includes('/components/layout/')) {
            return 'layout-components';
          }
          if (id.includes('/components/common/')) {
            return 'common-components';
          }
          if (id.includes('/components/utils/')) {
            return 'utils-components';
          }
          if (id.includes('/hooks/')) {
            return 'hooks-chunk';
          }
          if (id.includes('/providers/') || id.includes('/contexts/')) {
            return 'providers-chunk';
          }
        },
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
