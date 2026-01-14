import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  test: {
    coverage: {
      include: ['src/**/*.{ts,svelte}'],
      thresholds: {
        functions: 70,
        statements: 70,
        lines: 70,
        branches: 50
      }
    }
  },
});
