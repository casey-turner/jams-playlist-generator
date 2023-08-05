import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        // target: 'http://localhost:3000',
        target: 'https://jams-playlist-generator-production.up.railway.app',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace('/api', ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@api': path.resolve(__dirname, './src/api/'),
      '@assets': path.resolve(__dirname, './src/assets/'),
      '@components': path.resolve(__dirname, './src/components/'),
      '@data': path.resolve(__dirname, './src/data/'),
      '@features': path.resolve(__dirname, './src/features/'),
      '@types': path.resolve(__dirname, './src/types/'),
      '@utils': path.resolve(__dirname, './src/utils/'),
    },
  },
  plugins: [react()],
})
