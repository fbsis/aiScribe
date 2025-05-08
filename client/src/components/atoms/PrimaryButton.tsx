import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface PrimaryButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, ...props }) => (
  <Button
    variant="contained"
    color="primary"
    fullWidth
    sx={{ mt: 4, py: 2, fontSize: 18 }}
    {...props}
  >
    {children}
  </Button>
); 