import React from 'react';
import { Box, Typography, Grid, Link, Container, Divider, useMediaQuery, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import styled from '@emotion/styled';

// Стилизованный футер
const StyledFooter = styled(Box)`
  background-color: #2c3e50;
  color: white;
  padding-top: 3rem;
  padding-bottom: 2rem;
  margin-top: auto;
`;

// Стилизованная ссылка
const StyledLink = styled(Link)`
  transition: color 0.3s ease;
  &:hover {
    color: #90caf9;
  }
`;

// Стилизованная иконка
const SocialIcon = styled(Box)`
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-3px);
  }
`;

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <StyledFooter component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={isMobile ? 3 : 4}>
          <Grid sx={{ width: { xs: '100%', sm: '50%', md: '25%' } }}>
            <Typography variant="h6" gutterBottom>
              О компании
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Мы предлагаем инновационные решения для вашего бизнеса, обеспечивая высокое качество и надежность.
            </Typography>
          </Grid>
          
          <Grid sx={{ width: { xs: '100%', sm: '50%', md: '25%' } }}>
            <Typography variant="h6" gutterBottom>
              Услуги
            </Typography>
            <StyledLink 
              component={RouterLink} 
              to="/services/web-development" 
              color="inherit" 
              display="block" 
              sx={{ mb: 1, opacity: 0.8 }}
            >
              Веб-разработка
            </StyledLink>
            <StyledLink 
              component={RouterLink} 
              to="/services/mobile-development" 
              color="inherit" 
              display="block" 
              sx={{ mb: 1, opacity: 0.8 }}
            >
              Мобильная разработка
            </StyledLink>
            <StyledLink 
              component={RouterLink} 
              to="/services/consulting" 
              color="inherit" 
              display="block"
              sx={{ opacity: 0.8 }}
            >
              Консалтинг
            </StyledLink>
          </Grid>
          
          <Grid sx={{ width: { xs: '100%', sm: '50%', md: '25%' } }}>
            <Typography variant="h6" gutterBottom>
              Контакты
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
              Email: info@example.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
              Телефон: +7 (123) 456-7890
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Адрес: г. Москва, ул. Примерная, 123
            </Typography>
          </Grid>
          
          <Grid sx={{ width: { xs: '100%', sm: '50%', md: '25%' } }}>
            <Typography variant="h6" gutterBottom>
              Социальные сети
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <SocialIcon>
                <StyledLink href="https://facebook.com" target="_blank" color="inherit">
                  <FacebookIcon />
                </StyledLink>
              </SocialIcon>
              <SocialIcon>
                <StyledLink href="https://twitter.com" target="_blank" color="inherit">
                  <TwitterIcon />
                </StyledLink>
              </SocialIcon>
              <SocialIcon>
                <StyledLink href="https://instagram.com" target="_blank" color="inherit">
                  <InstagramIcon />
                </StyledLink>
              </SocialIcon>
              <SocialIcon>
                <StyledLink href="https://linkedin.com" target="_blank" color="inherit">
                  <LinkedInIcon />
                </StyledLink>
              </SocialIcon>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3, bgcolor: 'rgba(255,255,255,0.2)' }} />
        
        <Typography variant="body2" align="center" sx={{ opacity: 0.7 }}>
          © {new Date().getFullYear()} Тестовая Компания. Все права защищены.
        </Typography>
      </Container>
    </StyledFooter>
  );
};

export default Footer; 