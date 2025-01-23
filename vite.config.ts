import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['lucide-react']
  },
  server: {
    port: 5173,
    open: true // This will automatically open the browser
  }
});
