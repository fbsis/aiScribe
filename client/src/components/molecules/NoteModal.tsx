import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import MediaPlayer from './MediaPlayer';

interface NoteModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (note: { type: 'text' | 'audio'; content: string; file?: File }) => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ open, onClose, onSubmit }) => {
  const [noteType, setNoteType] = useState<'text' | 'audio'>('text');
  const [textNote, setTextNote] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioBlobRef = useRef<Blob | null>(null);

  // Cleanup audio URL when modal closes
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const handleTypeChange = (_: React.MouseEvent<HTMLElement>, newType: 'text' | 'audio') => {
    if (newType !== null) {
      setNoteType(newType);
      setTextNote('');
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        audioBlobRef.current = audioBlob;
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleClear = () => {
    setTextNote('');
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    audioBlobRef.current = null;
  };

  const handleSubmit = async () => {
    setIsUploading(true);
    try {
      if (noteType === 'text' && textNote.trim()) {
        // Simulate API call for text note
        await new Promise(resolve => setTimeout(resolve, 1000));
        onSubmit({ type: 'text', content: textNote });
      } else if (noteType === 'audio' && audioBlobRef.current) {
        // Simulate API call for audio note
        const file = new File([audioBlobRef.current], 'audio-note.webm', { type: 'audio/webm' });
        await new Promise(resolve => setTimeout(resolve, 1000));
        onSubmit({ type: 'audio', content: audioUrl!, file });
      }
      onClose();
    } catch (error) {
      console.error('Error submitting note:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const isSubmitDisabled = (noteType === 'text' && !textNote.trim()) || 
                          (noteType === 'audio' && !audioUrl) ||
                          isUploading;

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
        pb: 2
      }}>
        <NoteAddIcon color="primary" />
        Add Patient Note
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ mb: 3 }}>
          <ToggleButtonGroup
            value={noteType}
            exclusive
            onChange={handleTypeChange}
            aria-label="note type"
            fullWidth
            sx={{
              '& .MuiToggleButton-root': {
                textTransform: 'none',
                fontWeight: 500,
                px: 3,
              }
            }}
          >
            <ToggleButton value="text" aria-label="text note">
              Text Note
            </ToggleButton>
            <ToggleButton value="audio" aria-label="audio note">
              Audio Note
            </ToggleButton>
          </ToggleButtonGroup>
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
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
        ) : (
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              bgcolor: 'background.default'
            }}
          >
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
                    onClick={handleClear} 
                    color="error"
                    sx={{ 
                      '&:hover': { 
                        bgcolor: 'error.light',
                      }
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            )}
          </Paper>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Button 
          onClick={onClose}
          disabled={isUploading}
          sx={{ 
            textTransform: 'none',
            fontWeight: 500,
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitDisabled} 
          variant="contained"
          startIcon={isUploading ? <CircularProgress size={20} /> : null}
          sx={{ 
            textTransform: 'none',
            fontWeight: 500,
            minWidth: 100,
          }}
        >
          {isUploading ? 'Saving...' : 'Save Note'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoteModal; 