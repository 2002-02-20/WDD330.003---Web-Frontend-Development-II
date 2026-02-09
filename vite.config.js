import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        bible: resolve(__dirname, 'hero_page/hero_page.html'),
        heroes: resolve(__dirname, 'verse_page/verse_page.html'),
        header: resolve(__dirname, 'public/partials/header.html'),
        footer: resolve(__dirname, 'public/partials/footer.html')
      }
    }
  }
})