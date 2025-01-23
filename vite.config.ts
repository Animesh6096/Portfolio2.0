import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    assetsDir: 'assets',
    copyPublicDir: true,
  },
  optimizeDeps: {
    include: ['lucide-react']
  },
  server: {
    port: 5173,
    open: true // This will automatically open the browser
  }
})
