import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    // Enable SPA fallback for client-side routing in development
    historyApiFallback: true
  },
  // Configure SPA fallback for client-side routing
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  // Ensure all routes fallback to index.html for SPA routing
  preview: {
    port: 5173,
    host: true
  }
})