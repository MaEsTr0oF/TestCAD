import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Функция для проверки, является ли запрос внешним (не к нашему домену)
const isExternalRequest = (url: string): boolean => {
  const isYouTubeRequest = url.includes('youtube.com') || url.includes('youtu.be');
  const isExternalDomain = !url.startsWith(window.location.origin) && !url.startsWith('/');
  return isYouTubeRequest || isExternalDomain;
};

// Создаем и экспортируем сервис-воркер для разработки с фильтрацией запросов
export const worker = setupWorker(...handlers);

// Добавляем кастомный обработчик для пропуска внешних запросов
const originalFetch = window.fetch;
window.fetch = async (input, init) => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
  
  // Если это внешний запрос, используем оригинальный fetch
  if (isExternalRequest(url)) {
    return originalFetch(input, init);
  }
  
  // Иначе используем обычный fetch, который может быть перехвачен MSW
  return originalFetch(input, init);
}; 