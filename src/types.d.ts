// Расширения типов для Material UI компонентов с поддержкой React Router

declare module '@mui/material/Link' {
  interface LinkPropsColorOverrides {
    [key: string]: true;
  }
  
  interface LinkProps {
    component?: React.ElementType;
    to?: string;
  }
}

declare module '@mui/material/Button' {
  interface ButtonProps {
    component?: React.ElementType;
    to?: string;
  }
}

declare module '@mui/material/Box' {
  interface BoxProps {
    component?: React.ElementType;
    to?: string;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyProps {
    component?: React.ElementType;
    to?: string;
  }
}

// Расширение типов для эмоций
declare module '@emotion/styled' {
  import styled from '@emotion/styled';
  export * from '@emotion/styled';
  export default styled;
} 