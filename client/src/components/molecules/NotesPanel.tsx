import React from 'react';
import { Box, Typography, Button, CircularProgress, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ErrorIcon from '@mui/icons-material/Error';
import { useNotes } from '../../hooks/useNotes';
import NoteModal from './NoteModal';
import { Note } from '../../services/patientService';

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

  const renderNoteContent = (note: Note) => {
    if (note.audioFile) {
      return (
        <audio 
          controls 
          src={note.audioFile.publicUrl} 
          style={{ width: '100%' }} 
        />
      );
    }
    return <Typography>{note.content}</Typography>;
  };

  const renderStatusChip = (note: Note) => {
    switch (note.status) {
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

  if (isLoading) {
    return (
      <Box sx={{ p: 2, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
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

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {notes.map((note) => (
          <Box
            key={note.id}
            sx={{
              p: 2,
              mb: 2,
              borderRadius: 1,
              bgcolor: 'background.paper',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              position: 'relative',
              opacity: note.status === 'error' ? 0.8 : 1,
            }}
          >
            {isDeletingNote && (
              <Box sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                bgcolor: 'rgba(255, 255, 255, 0.7)',
                zIndex: 1,
                borderRadius: 1,
              }}>
                <CircularProgress size={24} />
              </Box>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(note.createdAt)}
                </Typography>
                {renderStatusChip(note)}
              </Box>
              <Button
                size="small"
                color="error"
                onClick={() => handleDeleteNote(note.id)}
                disabled={isAddingNote || isDeletingNote}
              >
                Delete
              </Button>
            </Box>
            {renderNoteContent(note)}
            {note.status === 'error' && note.errorMessage && (
              <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid #eee' }}>
                <Typography variant="caption" color="error">
                  Error: {note.errorMessage}
                </Typography>
              </Box>
            )}
            {note.status === 'done' && note.summary && (
              <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid #eee' }}>
                <Typography variant="caption" color="text.secondary">
                  AI Summary: {note.summary}
                </Typography>
              </Box>
            )}
          </Box>
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