/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text'],
      all: true,
      exclude: ['**/index.ts', '**/types.ts', '**/*.d.ts', '**/const.ts'],
      watermarks: {
        lines: [50, 80],
        functions: [50, 80],
        branches: [50, 80],
        statements: [50, 80],
      },
    },
  },
});
