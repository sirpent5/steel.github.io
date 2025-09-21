import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './frontend',          // 👈 set root folder
  publicDir: './frontend/public',
  build: {
    outDir: '../dist'
  }
})
