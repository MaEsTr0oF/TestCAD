import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Название репозитория можно будет изменить при деплое
const repoName = 'testCAD'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? `/${repoName}/` : '/',
})
