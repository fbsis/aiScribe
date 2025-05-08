import React from 'react';
import { Typography, TypographyProps } from '@mui/material';

interface PageTitleProps extends TypographyProps {
  children: React.ReactNode;
}

export const PageTitle: React.FC<PageTitleProps> = ({ children, ...props }) => (
  <Typography variant="h4" mb={3} {...props}>
    {children}
  </Typography>
); 