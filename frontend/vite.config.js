import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
  plugins: [react(),
  VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.svg', 'robots.txt', 'sena.png', 'koe.png'],
    workbox: {
      navigateFallback: "/index.html",
      globPatterns: ["**/*.{js,jsx,css,html,png,svg}"]
    },
    manifest: {
      name: 'PWA Felipe',
      short_name: 'PWA',
      description: 'My Awesome App description',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#000000',
      screenshots: [{
        src: '/img/chat.png',
        sizes: '848x444',
        type: 'image/png',
        form_factor: 'narrow',
      }],
      icons: [
        {
          src: '/img/sena.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/img/koe.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  }),
  ],
});
