import React from 'react';
import { Container, ContainerProps } from '@mui/material';

interface PageContainerProps extends ContainerProps {
  children: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children, ...props }) => (
  <Container maxWidth="md" sx={{ mt: 5 }} {...props}>
    {children}
  </Container>
); 