import React from 'react';
import { Chip, CircularProgress } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { Note } from '../../services/patientService';

interface NoteStatusChipProps {
  status: Note['status'];
}

const NoteStatusChip: React.FC<NoteStatusChipProps> = ({ status }) => {
  switch (status) {
    case 'processing':
      return (
        <Chip
          icon={<CircularProgress size={16} />}
          label="Processing"
          size="small"
          color="info"
          sx={{ ml: 1 }}
        />
      );
    case 'error':
      return (
        <Chip
          icon={<ErrorIcon />}
          label="Error"
          size="small"
          color="error"
          sx={{ ml: 1 }}
        />
      );
    default:
      return null;
  }
};

export default NoteStatusChip; 