import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/news/romance': { target: 'datespot-production.up.railway.app', changeOrigin: true },
      '/uploadPhoto': { target: 'datespot-production.up.railway.app', changeOrigin: true },
      '/events': { target: 'datespot-production.up.railway.app', changeOrigin: true },
      '/register': { target: 'datespot-production.up.railway.app', changeOrigin: true },
      '/altText': { target: 'datespot-production.up.railway.app', changeOrigin: true },
      '/deleteEvent':{ target: 'datespot-production.up.railway.app', changeOrigin: true },
      '/editEvents/':{ target: 'datespot-production.up.railway.app', changeOrigin: true },
      '/userEventsTable/':{ target: 'datespot-production.up.railway.app', changeOrigin: true },
      '/deleteUserEvent/':{ target: 'datespot-production.up.railway.app', changeOrigin: true },
    },
  },
});

