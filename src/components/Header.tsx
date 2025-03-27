import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Container, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  useMediaQuery,
  useTheme 
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import styled from '@emotion/styled';
import MenuIcon from '@mui/icons-material/Menu';

// Стилизованная кнопка для навигации
const StyledButton = styled(Box)`
  padding: 10px 15px;
  margin-left: 20px;
  color: #fff;
  border-radius: 4px;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 600px) {
    margin-left: 10px;
    padding: 8px 12px;
  }
`;

// Стилизованный логотип
const Logo = styled(Typography)`
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
  
  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Главная', path: '/' },
    { text: 'Контакты', path: '/contact' }
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Тестовая Компания
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem 
            key={item.text} 
            component={RouterLink} 
            to={item.path}
            sx={{ 
              textAlign: 'center',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#2c3e50' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', padding: isMobile ? '0 8px' : '0 16px' }}>
          <Typography 
            component={RouterLink} 
            to="/" 
            variant="h6" 
            sx={{ textDecoration: 'none', color: 'white' }}
          >
            <Logo>Тестовая Компания</Logo>
          </Typography>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="открыть меню"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box>
              {menuItems.map((item) => (
                <StyledButton 
                  key={item.text}
                  component={RouterLink} 
                  to={item.path}
                >
                  {item.text}
                </StyledButton>
              ))}
            </Box>
          )}
        </Toolbar>
      </Container>

      {/* Мобильное меню */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true // Лучшая производительность на мобильных устройствах
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header; 