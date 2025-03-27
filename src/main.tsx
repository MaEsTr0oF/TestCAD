import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import './index.css'
import App from './App.tsx'

// Создаем тему для Material UI
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
})

// Импортируем и инициализируем MSW только в режиме разработки
async function setupMockServiceWorker() {
  if (import.meta.env.DEV) {
    try {
      const { worker } = await import('./mocks/browser')
      
      // Запускаем MSW с дополнительными настройками
      await worker.start({
        onUnhandledRequest: 'bypass', // Пропускать необработанные запросы без ошибок
        serviceWorker: {
          url: '/mockServiceWorker.js', // Явно указываем путь к сервис-воркеру
          options: {
            scope: '/', // Расширяем область видимости сервис-воркера
          },
        },
      })
      
      console.log('[MSW] Сервис успешно запущен')
    } catch (error) {
      console.error('[MSW] Ошибка при инициализации:', error)
    }
  }
}

// Запускаем приложение после инициализации MSW
setupMockServiceWorker().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </StrictMode>,
  )
})
