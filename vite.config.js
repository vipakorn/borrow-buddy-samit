import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this repo under /borrow-buddy-samit/; other hosts (Vercel, etc.) serve from root.
  base: process.env.GITHUB_PAGES ? '/borrow-buddy-samit/' : '/',
  plugins: [react()],
})
