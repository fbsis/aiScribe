import React from 'react';
import { CircularProgress, Box, BoxProps } from '@mui/material';

interface LoadingSpinnerProps extends BoxProps {
  size?: number;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 40, ...props }) => (
  <Box display="flex" justifyContent="center" my={5} {...props}>
    <CircularProgress size={size} />
  </Box>
); 