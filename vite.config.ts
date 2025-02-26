import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      includeAssets: [
        'favicon.ico',
        'icons/*.{ico,png,jpg}',
        'images/**/*.{jpg,png}'
      ],
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
  base: '/',
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
    open: true,
    host: true // This enables access from other devices on the network
  }
})
