import React from 'react';
import { Card, CardContent, Typography, Button, CircularProgress, Box } from '@mui/material';
import { Note } from '../../services/patientService';
import NoteStatusChip from '../atoms/NoteStatusChip';
import NoteContent from '../atoms/NoteContent';
import NoteSummary from '../atoms/NoteSummary';
import { styles } from '../../styles/NotesPanel.styles';

interface NoteCardProps {
  note: Note;
  isDeleting: boolean;
  onDelete: (id: string) => void;
  formatDate: (date: string | Date) => string;
}

const NoteCard: React.FC<NoteCardProps> = ({ 
  note, 
  isDeleting, 
  onDelete, 
  formatDate 
}) => {
  return (
    <Card 
      sx={{
        ...styles.noteCard,
        opacity: note.status === 'error' ? 0.8 : 1,
      }}
      elevation={1}
    >
      {isDeleting && (
        <Box sx={styles.noteCardOverlay}>
          <CircularProgress size={24} />
        </Box>
      )}
      <CardContent sx={{...styles.noteCardContent, elevation: 2}}>
        <Box sx={styles.noteCardHeader}>
          <Box sx={styles.noteCardHeaderLeft}>
            <Typography variant="caption" color="text.secondary">
              {formatDate(note.createdAt)}
            </Typography>
            <NoteStatusChip status={note.status} />
          </Box>
          <Button
            size="small"
            color="error"
            onClick={() => onDelete(note.id)}
            disabled={isDeleting}
          >
            Delete
          </Button>
        </Box>
        <NoteContent note={note} />
        <NoteSummary note={note} />
      </CardContent>
    </Card>
  );
};

export default NoteCard; 