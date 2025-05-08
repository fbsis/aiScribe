import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Fab,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  PlayArrow as PlayArrowIcon,
  Stop as StopIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import NoteForm from './NoteForm';

interface Note {
  id: string;
  text: string;
  timestamp: string;
  audioUrl?: string;
}

const NotesPanel: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      text: 'Patient reported increased pain in left knee during morning exercises.',
      timestamp: '2024-03-20 09:30 AM',
    },
    {
      id: '2',
      text: 'Administered prescribed pain medication. Patient resting comfortably.',
      timestamp: '2024-03-20 10:15 AM',
      audioUrl: '/path/to/audio.mp3',
    },
  ]);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [noteType, setNoteType] = useState<'text' | 'audio'>('text');
  const [textNote, setTextNote] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handlePlayAudio = (id: string) => {
    setIsPlaying(isPlaying === id ? null : id);
    // TODO: Implement audio playback logic
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    // TODO: Stop the MediaRecorder
  };

  const handleSubmit = async () => {
    setIsUploading(true);
    try {
      // TODO: Implement API call to save note
      const newNote: Note = {
        id: Date.now().toString(),
        text: textNote,
        timestamp: new Date().toLocaleString(),
        audioUrl: audioUrl || undefined,
      };
      setNotes([newNote, ...notes]);
      setShowNoteForm(false);
      setTextNote('');
      setAudioUrl(null);
    } catch (error) {
      console.error('Error saving note:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setShowNoteForm(false);
    setTextNote('');
    setAudioUrl(null);
  };

  return (
    <Box sx={{ height: '100%', position: 'relative' }}>
      <Box sx={{ p: 2, pb: 8 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Notes
        </Typography>
        <List>
          {notes.map((note, index) => (
            <React.Fragment key={note.id}>
              <ListItem>
                <ListItemText
                  primary={note.text}
                  secondary={note.timestamp}
                />
                <ListItemSecondaryAction>
                  {note.audioUrl && (
                    <IconButton
                      edge="end"
                      onClick={() => handlePlayAudio(note.id)}
                      sx={{ mr: 1 }}
                    >
                      {isPlaying === note.id ? <StopIcon /> : <PlayArrowIcon />}
                    </IconButton>
                  )}
                  <IconButton
                    edge="end"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {index < notes.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>

      <Fab
        color="primary"
        onClick={() => setShowNoteForm(true)}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
      >
        <AddIcon />
      </Fab>

      {showNoteForm && (
        <NoteForm
          noteType={noteType}
          textNote={textNote}
          isRecording={isRecording}
          audioUrl={audioUrl}
          isUploading={isUploading}
          setNoteType={setNoteType}
          setTextNote={setTextNote}
          setAudioUrl={setAudioUrl}
          startRecording={startRecording}
          stopRecording={stopRecording}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      )}
    </Box>
  );
};

export default NotesPanel; 