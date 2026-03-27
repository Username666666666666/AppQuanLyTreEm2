import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/', // Thêm dòng này cho chắc
  resolve: {
    alias: {
      '@': path.resolve(new URL('.', import.meta.url).pathname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
  build: {
    outDir: 'dist', // Đảm bảo folder output trùng với config trên Vercel
  }
})
