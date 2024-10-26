import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const proxyTarget = 'http://localhost:1113';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/news/romance': { target: proxyTarget, changeOrigin: true },
      '/uploadPhoto': { target: proxyTarget, changeOrigin: true },
      '/events': { target: proxyTarget, changeOrigin: true },
      '/register': { target: proxyTarget, changeOrigin: true },
      '/altText': { target: proxyTarget, changeOrigin: true },
    },
  },
});

