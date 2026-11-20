import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // The lazily-loaded LocationGlobe chunk is essentially three.js (~980 kB) and can't be
    // split further; everything else stays well under 500 kB.
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
    strictPort: true,
  },
})
