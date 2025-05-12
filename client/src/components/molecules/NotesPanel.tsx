import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNotes } from '../../hooks/useNotes';
import NoteModal from './NoteModal';

interface NotesPanelProps {
  patientId?: string;
}

const NotesPanel: React.FC<NotesPanelProps> = ({ patientId }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const {
    notes,
    isAddingNote,
    noteType,
    textNote,
    isRecording,
    audioUrl,
    isUploading,
    setNoteType,
    setTextNote,
    setAudioUrl,
    handleAddNote,
    handleCancelAdd,
    startRecording,
    stopRecording,
    handleSubmit,
    handleDeleteNote,
    formatDate,
  } = useNotes(patientId);

  return (
    <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Notes</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsModalOpen(true)}
          disabled={isAddingNote}
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
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="caption" color="text.secondary">
                {formatDate(note.createdAt)}
              </Typography>
              <Button
                size="small"
                color="error"
                onClick={() => handleDeleteNote(note.id)}
              >
                Delete
              </Button>
            </Box>
            {note.type === 'text' ? (
              <Typography>{note.content}</Typography>
            ) : (
              <audio controls src={note.content} style={{ width: '100%' }} />
            )}
          </Box>
        ))}
      </Box>

      <NoteModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default NotesPanel; 