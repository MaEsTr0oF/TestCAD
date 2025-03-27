import React from 'react';
import { Box, Container } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import styled from '@emotion/styled';

// Стилизованный контейнер для содержимого страницы
const PageContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: #f5f8fa; /* Светлый фоновый цвет для всей страницы */
`;

// Стилизованный основной контейнер контента
const MainContent = styled(Box)`
  flex-grow: 1;
  padding: 24px 0;
  
  @media (max-width: 600px) {
    padding: 16px 0;
  }
`;

// Стилизованный контейнер для центрирования
const CenteredContainer = styled(Container)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  
  @media (max-width: 600px) {
    padding: 0 12px;
  }
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <PageContainer>
      <Header />
      <MainContent component="main">
        <CenteredContainer maxWidth="lg">
          {children}
        </CenteredContainer>
      </MainContent>
      <Footer />
    </PageContainer>
  );
};

export default Layout; 