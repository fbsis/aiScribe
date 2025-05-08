import React from 'react';
import { Chip } from '@mui/material';

interface StatusBadgeProps {
  status: string;
  color?: 'success' | 'error' | 'warning' | 'info';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, color = 'success' }) => {
  return (
    <Chip
      label={status}
      color={color}
      size="small"
      sx={{ fontWeight: 600 }}
    />
  );
};

export default StatusBadge; 