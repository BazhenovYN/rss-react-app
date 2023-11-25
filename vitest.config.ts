import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr({ include: '**/*.svg' })],
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
      include: [
        '**/src/components/**/*.{tsx,ts}',
        '**/src/pages/**/*.{tsx,ts}',
        '**/src/services/**/*.{tsx,ts}',
        '**/src/utils/**/*.{tsx,ts}',
      ],
      exclude: ['**/const.ts', '**/index.ts', '**/types.ts', '**/*.d.ts'],
      watermarks: {
        lines: [50, 80],
        functions: [50, 80],
        branches: [50, 80],
        statements: [50, 80],
      },
    },
  },
});
