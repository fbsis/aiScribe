import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  CircularProgress,
} from '@mui/material';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import DeleteIcon from '@mui/icons-material/Delete';
import MediaPlayer from './MediaPlayer';

interface NoteFormProps {
  noteType: 'text' | 'audio';
  textNote: string;
  isRecording: boolean;
  audioUrl: string | null;
  isUploading: boolean;
  setNoteType: (type: 'text' | 'audio') => void;
  setTextNote: (text: string) => void;
  setAudioUrl: (url: string | null) => void;
  startRecording: () => void;
  stopRecording: () => void;
  handleSubmit: () => void;
  handleCancel: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({
  noteType,
  textNote,
  isRecording,
  audioUrl,
  isUploading,
  setNoteType,
  setTextNote,
  setAudioUrl,
  startRecording,
  stopRecording,
  handleSubmit,
  handleCancel,
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Button
          variant={noteType === 'text' ? 'contained' : 'outlined'}
          startIcon={<TextFieldsIcon />}
          onClick={() => setNoteType('text')}
          fullWidth
        >
          Text
        </Button>
        <Button
          variant={noteType === 'audio' ? 'contained' : 'outlined'}
          startIcon={<MicIcon />}
          onClick={() => setNoteType('audio')}
          fullWidth
        >
          Audio
        </Button>
      </Box>

      {noteType === 'text' ? (
        <TextField
          fullWidth
          multiline
          rows={4}
          value={textNote}
          onChange={(e) => setTextNote(e.target.value)}
          placeholder="Enter your note here..."
          variant="outlined"
          sx={{ mb: 2 }}
        />
      ) : (
        <Box sx={{ mb: 2 }}>
          {!audioUrl ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton
                color={isRecording ? 'error' : 'primary'}
                onClick={isRecording ? stopRecording : startRecording}
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: isRecording ? 'error.light' : 'primary.light',
                  '&:hover': {
                    bgcolor: isRecording ? 'error.main' : 'primary.main',
                  }
                }}
              >
                {isRecording ? <StopIcon /> : <MicIcon />}
              </IconButton>
              {isRecording && (
                <Typography color="error" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={16} color="error" />
                  Recording...
                </Typography>
              )}
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <MediaPlayer audioUrl={audioUrl} />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton
                  onClick={() => {
                    URL.revokeObjectURL(audioUrl);
                    setAudioUrl(null);
                  }}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          )}
        </Box>
      )}

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          onClick={handleCancel}
          disabled={isUploading}
          fullWidth
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isUploading || (noteType === 'text' && !textNote.trim()) || (noteType === 'audio' && !audioUrl)}
          variant="contained"
          fullWidth
          startIcon={isUploading ? <CircularProgress size={20} /> : null}
        >
          {isUploading ? 'Saving...' : 'Save Note'}
        </Button>
      </Box>
    </Box>
  );
};

export default NoteForm; 