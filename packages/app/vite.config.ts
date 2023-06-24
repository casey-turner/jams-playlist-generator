import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace('/api', ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@components': path.resolve(__dirname, './src/components/'),
      '@assets': path.resolve(__dirname, './src/assets/'),
    },
  },
  plugins: [react()],
})
