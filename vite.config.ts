import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import packageJson from './package.json'

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
  },
  build: {
    lib: {
      entry: './index.ts',
      name: 'PreactComponentsSystem',
      fileName: 'index',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['preact', 'preact/hooks'],
      output: {
        globals: {
          preact: 'Preact',
          'preact/hooks': 'PreactHooks'
        }
      }
    }
  }
})
