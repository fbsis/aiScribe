import React, { useState, useRef } from 'react';
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
  Typography,
  CircularProgress,
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import TextFieldsIcon from '@mui/icons-material/TextFields';

interface NoteModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (type: 'text' | 'audio', content: string | File) => Promise<void>;
}

const NoteModal: React.FC<NoteModalProps> = ({ open, onClose, onSubmit }) => {
  const [noteType, setNoteType] = useState<'text' | 'audio'>('text');
  const [textContent, setTextContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleTypeChange = (_: React.MouseEvent<HTMLElement>, newType: 'text' | 'audio') => {
    if (newType !== null) {
      setNoteType(newType);
      setTextContent('');
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }
      setAudioChunks([]);
      audioChunksRef.current = [];
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      setAudioChunks([]);
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current = [...audioChunksRef.current, e.data];
          setAudioChunks(audioChunksRef.current);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        recorder.stream.getTracks().forEach(track => track.stop());
      };

      recorder.start(100); // Collect data every 100ms
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      if (noteType === 'text' && textContent.trim()) {
        await onSubmit('text', textContent);
      } else if (noteType === 'audio' && audioUrl) {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const file = new File([audioBlob], 'audio-note.webm', { type: 'audio/webm' });
        await onSubmit('audio', file);
      }
      handleClose();
    } catch (error) {
      console.error('Error submitting note:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setTextContent('');
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setAudioChunks([]);
    audioChunksRef.current = [];
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Note</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2, mt: 1 }}>
          <ToggleButtonGroup
            value={noteType}
            exclusive
            onChange={handleTypeChange}
            aria-label="note type"
            fullWidth
          >
            <ToggleButton value="text" aria-label="text note">
              <TextFieldsIcon sx={{ mr: 1 }} />
              Text Note
            </ToggleButton>
            <ToggleButton value="audio" aria-label="audio note">
              <MicIcon sx={{ mr: 1 }} />
              Audio Note
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {noteType === 'text' ? (
          <TextField
            autoFocus
            multiline
            rows={4}
            fullWidth
            label="Note Content"
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            disabled={isSubmitting}
          />
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="contained"
                color={isRecording ? 'error' : 'primary'}
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isSubmitting}
                startIcon={isRecording ? <StopIcon /> : <MicIcon />}
              >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </Button>
            </Box>
            {audioUrl && (
              <Box>
                <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                  Recording Preview:
                </Typography>
                <audio controls src={audioUrl} style={{ width: '100%' }} />
              </Box>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={
            isSubmitting ||
            (noteType === 'text' && !textContent.trim()) ||
            (noteType === 'audio' && !audioUrl)
          }
        >
          {isSubmitting ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              Submitting...
            </>
          ) : (
            'Submit'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoteModal; 