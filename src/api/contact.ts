// Эмуляция бэкенд API для обработки контактной формы
// В реальном проекте это был бы серверный код

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const submitContactForm = async (formData: ContactFormData) => {
  // Эмуляция задержки запроса к серверу
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Логирование данных в консоль, как требуется в задании
  console.log('Получены данные из формы:', formData);
  
  // Возвращаем ответ, который включает имя пользователя из формы
  return {
    success: true,
    message: `Спасибо за ваш интерес, ${formData.name}!`,
  };
}; 