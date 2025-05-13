import React from 'react';
import { Box, Typography } from '@mui/material';
import { Note } from '../../services/patientService';

interface NoteSummaryProps {
  note: Note;
}

const NoteSummary: React.FC<NoteSummaryProps> = ({ note }) => {
  if (note.status === 'error' && note.errorMessage) {
    return (
      <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid #eee' }}>
        <Typography variant="caption" color="error">
          Error: {note.errorMessage}
        </Typography>
      </Box>
    );
  }

  if (note.status === 'done' && note.summary) {
    return (
      <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid #eee' }}>
        <Typography variant="caption" color="text.secondary">
          AI Summary: {note.summary}
        </Typography>
      </Box>
    );
  }

  return null;
};

export default NoteSummary; 