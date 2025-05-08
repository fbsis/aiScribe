import React from 'react';
import { Chip, ChipProps } from '@mui/material';

interface StatusChipProps extends Omit<ChipProps, 'color'> {
  status: string;
}

const statusColors: Record<string, "success" | "error"> = {
  Assigned: "success",
  "On Hold": "error",
};

export const StatusChip: React.FC<StatusChipProps> = ({ status, ...props }) => (
  <Chip
    label={status}
    color={statusColors[status]}
    size="small"
    {...props}
  />
); 