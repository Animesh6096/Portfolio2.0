import { defineConfig } from 'vite';
import react from '@react-vite/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  optimizeDeps: {
    include: ['lucide-react']
  },
  server: {
    port: 5173,
    open: true // This will automatically open the browser
  }
});
