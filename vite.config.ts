import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, './src/client/'),
  base: path.resolve(__dirname, './dist/client/'),
  plugins: [vue()],
  build: {
    outDir: path.resolve(__dirname, "dist", "client"),
    sourcemap: true
  }
})