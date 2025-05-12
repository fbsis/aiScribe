import React from 'react';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface BackButtonProps {
  onClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      mr: 2,
      color: 'text.secondary',
      '&:hover': {
        color: 'primary.main',
      },
    }}
  >
    <ArrowBackIcon />
  </IconButton>
);

export default BackButton; 