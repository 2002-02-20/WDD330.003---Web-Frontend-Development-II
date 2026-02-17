import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        bible: resolve(__dirname, 'public/about_us/about_us.html'),
        heroes: resolve(__dirname, 'public/verse_page/verse_page.html'),
        header: resolve(__dirname, 'public/partials/header.html'),
        footer: resolve(__dirname, 'public/partials/footer.html'),
        favorite_page: resolve(__dirname, 'public/favorite_page/favorite_page.html')
      }
    }
  }
})