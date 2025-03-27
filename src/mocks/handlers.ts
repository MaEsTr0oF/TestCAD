import { http, HttpResponse, delay } from 'msw';
import { submitContactForm } from '../api/contact';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const handlers = [
  http.post('/api/contact', async ({ request }) => {
    try {
      // Добавляем искусственную задержку для имитации реальной сети
      await delay(800);
      
      // Получаем данные формы из запроса
      const formData = await request.json() as ContactFormData;
      
      // Проверка обязательных полей
      if (!formData.name || !formData.email || !formData.message) {
        return new HttpResponse(
          JSON.stringify({
            success: false,
            message: 'Пожалуйста, заполните все обязательные поля'
          }),
          { status: 400 }
        );
      }
      
      // Обработка данных с использованием нашей функции API
      const response = await submitContactForm(formData);
      
      // Возвращаем успешный ответ
      return HttpResponse.json(response, { status: 200 });
    } catch (error) {
      console.error('[MSW] Ошибка обработки запроса:', error);
      
      // Возвращаем ответ с ошибкой
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: 'Произошла ошибка при обработке запроса'
        }),
        { status: 500 }
      );
    }
  }),
]; 