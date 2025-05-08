import React from 'react';
import { IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface BackButtonProps {
  onClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <IconButton 
      onClick={onClick}
      sx={{ 
        color: 'primary.main',
        '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.04)' }
      }}
    >
      <ArrowBackIcon />
      <Typography variant="body1" sx={{ ml: 1, fontWeight: 500 }}>
        Back
      </Typography>
    </IconButton>
  );
};

export default BackButton; 