import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from "unplugin-auto-import/vite"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // AutoImport ({
    //   imports: ["vue", "vue-router","pinia"], //自动引入vue的ref、toRefs、onmounted等，无需在页面中再次引入
    //   resolvers:[ElementPlusResolver()]
    // })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})


