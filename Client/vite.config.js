import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  test: {
    globals: true, 
    environment: 'jsdom',
},
=======
  server: {
    proxy: {
      '/news/romance': { target: 'https://datespot-production.up.railway.app', changeOrigin: true },
      '/uploadPhoto': { target:'https://datespot-production.up.railway.app', changeOrigin: true },
      '/events': { target: 'https://datespot-production.up.railway.app', changeOrigin: true },
      '/register': { target: 'https://datespot-production.up.railway.app', changeOrigin: true },
      '/altText': { target: 'https://datespot-production.up.railway.app', changeOrigin: true },
      '/deleteEvent':{ target: 'https://datespot-production.up.railway.app', changeOrigin: true },
      '/editEvents/':{ target: 'https://datespot-production.up.railway.app', changeOrigin: true },
      '/userEventsTable/':{ target: 'https://datespot-production.up.railway.app', changeOrigin: true },
      '/deleteUserEvent/':{ target:'https://datespot-production.up.railway.app', changeOrigin: true },
    },
  },
>>>>>>> 507d4e2 (deleted an extra db.sql)
});

