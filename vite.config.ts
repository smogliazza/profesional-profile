import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// `base: './'` keeps asset paths relative, so the build works on
// GitHub Pages (username.github.io/repo) or any sub-folder without changes.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
