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
  IconButton,
  Typography,
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import DeleteIcon from '@mui/icons-material/Delete';
import MediaPlayer from './MediaPlayer';

interface CommentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (comment: { type: 'text' | 'audio'; content: string }) => void;
}

const CommentModal: React.FC<CommentModalProps> = ({ open, onClose, onSubmit }) => {
  const [commentType, setCommentType] = useState<'text' | 'audio'>('text');
  const [textComment, setTextComment] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const handleTypeChange = (_: React.MouseEvent<HTMLElement>, newType: 'text' | 'audio') => {
    if (newType !== null) {
      setCommentType(newType);
      setTextComment('');
      setAudioUrl(null);
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
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
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
    setTextComment('');
    setAudioUrl(null);
  };

  const handleSubmit = () => {
    if (commentType === 'text' && textComment.trim()) {
      onSubmit({ type: 'text', content: textComment });
    } else if (commentType === 'audio' && audioUrl) {
      onSubmit({ type: 'audio', content: audioUrl });
    }
    onClose();
  };

  const isSubmitDisabled = (commentType === 'text' && !textComment.trim()) || 
                          (commentType === 'audio' && !audioUrl);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Patient Comment</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <ToggleButtonGroup
            value={commentType}
            exclusive
            onChange={handleTypeChange}
            aria-label="comment type"
          >
            <ToggleButton value="text" aria-label="text comment">
              Text
            </ToggleButton>
            <ToggleButton value="audio" aria-label="audio comment">
              Audio
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {commentType === 'text' ? (
          <TextField
            fullWidth
            multiline
            rows={4}
            value={textComment}
            onChange={(e) => setTextComment(e.target.value)}
            placeholder="Enter your comment here..."
            variant="outlined"
          />
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {!audioUrl ? (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton
                  color={isRecording ? 'error' : 'primary'}
                  onClick={isRecording ? stopRecording : startRecording}
                >
                  {isRecording ? <StopIcon /> : <MicIcon />}
                </IconButton>
                {isRecording && <Typography>Recording...</Typography>}
              </Box>
            ) : (
              <>
                <MediaPlayer audioUrl={audioUrl} />
                <IconButton onClick={handleClear} color="error">
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={isSubmitDisabled} variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommentModal; 