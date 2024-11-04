import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/news/romance': { target: 'http://localhost:1113', changeOrigin: true },
      '/uploadPhoto': { target: 'http://localhost:1113', changeOrigin: true },
      '/events': { target: 'http://localhost:1113', changeOrigin: true },
      '/register': { target: 'http://localhost:1113', changeOrigin: true },
      '/altText': { target: 'http://localhost:1113', changeOrigin: true },
      '/deleteEvent': { target: 'http://localhost:1113', changeOrigin: true },
      '/editEvents': { target: 'http://localhost:1113', changeOrigin: true },
      '/userEventsTable': { target: 'http://localhost:1113', changeOrigin: true },
      '/deleteUserEvent': { target: 'http://localhost:1113', changeOrigin: true },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
});


