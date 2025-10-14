import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        calculator: resolve(__dirname, 'public/calculator.html'),
        embed: resolve(__dirname, 'public/embed.html')
      }
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
