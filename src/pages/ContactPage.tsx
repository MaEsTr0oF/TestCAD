import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  TextField, 
  Button, 
  Grid, 
  Paper, 
  Alert,
  CircularProgress
} from '@mui/material';
import styled from '@emotion/styled';
import axios from 'axios';

// Интерфейсы для типизации данных
interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

// Стилизованные компоненты
const ContactContainer = styled(Container)`
  padding-top: 60px;
  padding-bottom: 60px;
`;

const ContactForm = styled(Paper)`
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
`;

const ContactInfo = styled(Box)`
  margin-bottom: 30px;
`;

const ContactPage: React.FC = () => {
  // Состояния для формы
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Валидация электронной почты
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Обработка изменений в полях формы
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Сброс ошибок при вводе
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Валидация формы
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Введите корректный email';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Сообщение обязательно';
      isValid = false;
    } else if (formData.message.length < 10) {
      newErrors.message = 'Сообщение должно содержать не менее 10 символов';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Отправка формы
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setResponseMessage(null);
    
    try {
      // Отправляем запрос на API
      const response = await axios.post<ApiResponse>('/api/contact', formData);
      
      setIsSuccess(response.data.success);
      setResponseMessage(response.data.message);
      
      // Очищаем форму при успешной отправке
      if (response.data.success) {
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      }
    } catch (error) {
      setIsSuccess(false);
      setResponseMessage('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
      console.error('Ошибка отправки формы:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f8f9fa', minHeight: '80vh', py: 6 }}>
      <ContactContainer maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h1" 
          align="center" 
          gutterBottom
          sx={{ mb: 5, color: '#2c3e50' }}
        >
          Свяжитесь с нами
        </Typography>
        
        <Grid container spacing={4}>
          {/* Левая колонка - информация о контактах */}
          <Grid sx={{ width: { xs: '100%', md: '40%' } }}>
            <ContactInfo>
              <Typography variant="h5" gutterBottom sx={{ color: '#2c3e50', mb: 3 }}>
                Контактная информация
              </Typography>
              <Typography paragraph sx={{ mb: 2 }}>
                У вас есть вопросы или предложения? Мы всегда готовы помочь!
                Заполните форму или воспользуйтесь одним из контактных способов ниже.
              </Typography>
              
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Адрес
                </Typography>
                <Typography paragraph>
                  г. Москва, ул. Примерная, 123
                </Typography>
                
                <Typography variant="h6" gutterBottom>
                  Телефон
                </Typography>
                <Typography paragraph>
                  +7 (123) 456-7890
                </Typography>
                
                <Typography variant="h6" gutterBottom>
                  Email
                </Typography>
                <Typography paragraph>
                  info@example.com
                </Typography>
                
                <Typography variant="h6" gutterBottom>
                  Часы работы
                </Typography>
                <Typography paragraph>
                  Пн-Пт: 9:00 - 18:00<br />
                  Сб-Вс: Выходные
                </Typography>
              </Box>
            </ContactInfo>
          </Grid>
          
          {/* Правая колонка - контактная форма */}
          <Grid sx={{ width: { xs: '100%', md: '60%' } }}>
            <ContactForm elevation={0}>
              {responseMessage && (
                <Alert 
                  severity={isSuccess ? "success" : "error"} 
                  sx={{ mb: 3 }}
                >
                  {responseMessage}
                </Alert>
              )}
              
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid sx={{ width: '100%' }}>
                    <TextField
                      fullWidth
                      label="Ваше имя"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      disabled={isSubmitting}
                      required
                    />
                  </Grid>
                  
                  <Grid sx={{ width: '100%' }}>
                    <TextField
                      fullWidth
                      label="Ваш Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      disabled={isSubmitting}
                      required
                    />
                  </Grid>
                  
                  <Grid sx={{ width: '100%' }}>
                    <TextField
                      fullWidth
                      label="Ваше сообщение"
                      name="message"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      error={!!errors.message}
                      helperText={errors.message}
                      disabled={isSubmitting}
                      required
                    />
                  </Grid>
                  
                  <Grid sx={{ width: '100%' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={isSubmitting}
                      sx={{ 
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                        padding: '10px 30px'
                      }}
                    >
                      {isSubmitting ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        'Отправить сообщение'
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </ContactForm>
          </Grid>
        </Grid>
      </ContactContainer>
    </Box>
  );
};

export default ContactPage; 