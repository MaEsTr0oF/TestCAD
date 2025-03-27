import React, { Suspense } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  CircularProgress
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import styled from '@emotion/styled';
import YouTubeFacade from '../components/YouTubeFacade';

// Стилизованный Hero блок
const HeroSection = styled(Box)`
  background-color: #2c3e50;
  background-image: linear-gradient(135deg, #2c3e50 0%, #4c6b8a 100%);
  color: white;
  padding: 100px 0 80px;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 60px 0 40px;
  }
`;

const VideoContainer = styled(Box)`
  max-width: 800px;
  margin: 40px auto;
  
  @media (max-width: 768px) {
    margin: 30px auto;
    max-width: 100%;
    padding: 0 15px;
  }
`;

// Стилизованный раздел с информацией о компании
const InfoSection = styled(Box)`
  padding: 80px 0;
  background-color: #f8f9fa;
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
  
  @media (max-width: 480px) {
    padding: 40px 0;
  }
`;

// Стилизованный раздел с призывом к действию
const CtaSection = styled(Box)`
  padding: 100px 0;
  background-color: #e3f2fd;
  background-image: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
  
  @media (max-width: 480px) {
    padding: 40px 0;
  }
`;

// Стилизованные кнопки с анимацией
const AnimatedButton = styled(Button)`
  transition: all 0.3s ease;
  transform: translateY(0);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

// Стилизованные карточки
const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const HomePage: React.FC = () => {
  return (
    <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>}>
      <Box>
        {/* Hero секция с видео */}
        <HeroSection>
          <Container>
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 700
              }}
            >
              Инновационные решения для вашего бизнеса
            </Typography>
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom 
              sx={{ 
                mb: 4,
                fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' },
                maxWidth: '800px',
                mx: 'auto',
                opacity: 0.9
              }}
            >
              Мы создаем технологии, которые меняют мир
            </Typography>
            <AnimatedButton 
              variant="contained" 
              size="large" 
              component={RouterLink} 
              to="/contact" 
              sx={{ 
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                padding: '10px 30px',
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
              }}
            >
              Связаться с нами
            </AnimatedButton>
            
            <VideoContainer>
              <YouTubeFacade 
                videoId="dQw4w9WgXcQ" 
                title="Презентация нашей компании"
              />
            </VideoContainer>
          </Container>
        </HeroSection>
        
        {/* Информация о компании */}
        <InfoSection>
          <Container>
            <Typography 
              variant="h3" 
              component="h2" 
              align="center" 
              gutterBottom 
              sx={{ 
                mb: { xs: 4, md: 6 }, 
                color: '#2c3e50',
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                fontWeight: 700
              }}
            >
              Почему выбирают нас
            </Typography>
            
            <Grid container spacing={4}>
              <Grid sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, mb: { xs: 2, sm: 0 } }}>
                <StyledCard>
                  <CardMedia
                    component="div"
                    sx={{
                      height: 140,
                      backgroundColor: '#e0e0e0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, #e0e0e0 0%, #bbbbbb 100%)'
                    }}
                  >
                    <Typography variant="h6" color="text.secondary">Инновации</Typography>
                  </CardMedia>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Инновации
                    </Typography>
                    <Typography>
                      Мы постоянно следим за последними технологическими трендами и внедряем 
                      инновационные решения в наши продукты.
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
              
              <Grid sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, mb: { xs: 2, sm: 0 } }}>
                <StyledCard>
                  <CardMedia
                    component="div"
                    sx={{
                      height: 140,
                      backgroundColor: '#e0e0e0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, #e0e0e0 0%, #bbbbbb 100%)'
                    }}
                  >
                    <Typography variant="h6" color="text.secondary">Команда</Typography>
                  </CardMedia>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Опытная команда
                    </Typography>
                    <Typography>
                      Наша команда состоит из опытных специалистов, которые знают, как 
                      создавать качественные и надежные решения.
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
              
              <Grid sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' } }}>
                <StyledCard>
                  <CardMedia
                    component="div"
                    sx={{
                      height: 140,
                      backgroundColor: '#e0e0e0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, #e0e0e0 0%, #bbbbbb 100%)'
                    }}
                  >
                    <Typography variant="h6" color="text.secondary">Поддержка</Typography>
                  </CardMedia>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Поддержка 24/7
                    </Typography>
                    <Typography>
                      Мы обеспечиваем круглосуточную поддержку наших клиентов, чтобы вы 
                      всегда могли получить помощь, когда она вам нужна.
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            </Grid>
          </Container>
        </InfoSection>
        
        {/* Призыв к действию */}
        <CtaSection>
          <Container>
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom 
              sx={{ 
                color: '#2c3e50',
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                fontWeight: 700
              }}
            >
              Готовы начать сотрудничество?
            </Typography>
            <Typography 
              variant="h6" 
              component="p" 
              sx={{ 
                mb: 4, 
                maxWidth: '700px', 
                mx: 'auto', 
                color: '#546e7a',
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                opacity: 0.9
              }}
            >
              Свяжитесь с нами сегодня и узнайте, как мы можем помочь вашему бизнесу 
              достичь новых высот с помощью наших инновационных решений.
            </Typography>
            <AnimatedButton 
              variant="contained" 
              size="large" 
              component={RouterLink} 
              to="/contact" 
              sx={{ 
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                padding: '10px 30px',
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
              }}
            >
              Свяжитесь с нами
            </AnimatedButton>
          </Container>
        </CtaSection>
      </Box>
    </Suspense>
  );
};

export default HomePage; 