import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
  base: '/leadersA/',
  plugins: [imagetools()],
  build: {
    // Optimization for smaller builds
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['./src/router.ts', './src/config.ts', './src/utils.ts'],
        },
      },
    },
  },
});
