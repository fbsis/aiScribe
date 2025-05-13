import React from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNotes } from '../../hooks/useNotes';
import NoteModal from './NoteModal';
import NoteCard from './NoteCard';
import { styles } from '../../styles/NotesPanel.styles';

interface NotesPanelProps {
  patientId?: string;
}

const NotesPanel: React.FC<NotesPanelProps> = ({ patientId }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const {
    notes,
    isLoading,
    isAddingNote,
    isDeletingNote,
    handleSubmit,
    handleDeleteNote,
    formatDate,
  } = useNotes(patientId);

  const handleNoteSubmit = async (type: 'text' | 'audio', content: string | File) => {
    await handleSubmit(type, content);
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Typography variant="h6">Notes</Typography>
        <Button
          variant="contained"
          startIcon={isAddingNote ? <CircularProgress size={20} color="inherit" /> : <AddIcon />}
          onClick={() => setIsModalOpen(true)}
          disabled={isAddingNote || !patientId}
        >
          Add Note
        </Button>
      </Box>

      <Box sx={styles.notesList}>
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            isDeleting={isDeletingNote}
            onDelete={handleDeleteNote}
            formatDate={formatDate}
          />
        ))}
      </Box>

      <NoteModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNoteSubmit}
      />
    </Box>
  );
};

export default NotesPanel; 