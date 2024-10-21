import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/news/romance': {
        target: 'http://localhost:1113', 
        changeOrigin: true,
      },
    },
  },
});