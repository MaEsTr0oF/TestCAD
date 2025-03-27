import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Название репозитория можно будет изменить при деплое на GitHub Pages
const repoName = 'testCAD'

// Определяем базовый путь в зависимости от среды и платформы
function getBaseUrl() {
  // На Netlify используем корневой путь
  if (process.env.NETLIFY) {
    return '/'
  }
  
  // Для GitHub Pages используем путь с именем репозитория
  if (process.env.NODE_ENV === 'production') {
    return `/${repoName}/`
  }
  
  // По умолчанию для разработки используем корневой путь
  return '/'
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: getBaseUrl(),
})
