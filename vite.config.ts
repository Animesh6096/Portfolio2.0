import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.png', 'apple-touch-icon.png'],
      manifest: {
        name: 'Animesh Bhattacharjee Portfolio',
        short_name: 'AB Portfolio',
        description: 'Computer Science Student and Developer Portfolio',
        theme_color: '#a855f7',
        icons: [
          {
            src: '/icons/logo192.jpg',
            sizes: '192x192',
            type: 'image/jpeg',
            purpose: 'any maskable'
          },
          {
            src: '/icons/logo512.jpg',
            sizes: '512x512',
            type: 'image/jpeg',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  base: process.env.VITE_BASE_URL || '/', // or your specific base path if not deploying to root
  build: {
    assetsDir: 'assets',
    outDir: 'dist',
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
