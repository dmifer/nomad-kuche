import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // For GitHub Pages: replace 'nomad-kuche' with your repo name
  // If using a custom domain, set base: '/'
  base: '/',
})
