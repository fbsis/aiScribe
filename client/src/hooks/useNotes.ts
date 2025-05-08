import { useState } from 'react';

interface Note {
  id: string;
  type: 'text' | 'audio';
  content: string;
  createdAt: Date;
  file?: File;
}

const mockNotes: Note[] = [
  {
    id: '1',
    type: 'text',
    content: 'Patient reported feeling better today. Blood pressure is stable at 120/80.',
    createdAt: new Date(2024, 2, 15, 14, 30),
  },
  {
    id: '2',
    type: 'audio',
    content: 'https://example.com/mock-audio-1.mp3',
    createdAt: new Date(2024, 2, 15, 13, 15),
  },
  {
    id: '3',
    type: 'text',
    content: 'Follow-up appointment scheduled for next week. Patient needs to continue with prescribed medication.',
    createdAt: new Date(2024, 2, 14, 16, 45),
  },
  {
    id: '4',
    type: 'audio',
    content: 'https://example.com/mock-audio-2.mp3',
    createdAt: new Date(2024, 2, 14, 11, 20),
  },
];

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [noteType, setNoteType] = useState<'text' | 'audio'>('text');
  const [textNote, setTextNote] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const handleAddNote = () => {
    setIsAddingNote(true);
    setNoteType('text');
    setTextNote('');
    setAudioUrl(null);
  };

  const handleCancelAdd = () => {
    setIsAddingNote(false);
    setTextNote('');
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      setAudioChunks([]);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setAudioChunks(prev => [...prev, e.data]);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      recorder.start();
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
    setIsUploading(true);
    try {
      if (noteType === 'text' && textNote.trim()) {
        const newNote: Note = {
          id: Date.now().toString(),
          type: 'text',
          content: textNote,
          createdAt: new Date(),
        };
        setNotes(prev => [newNote, ...prev]);
        handleCancelAdd();
      } else if (noteType === 'audio' && audioUrl) {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const file = new File([audioBlob], 'audio-note.webm', { type: 'audio/webm' });
        const newNote: Note = {
          id: Date.now().toString(),
          type: 'audio',
          content: audioUrl,
          createdAt: new Date(),
          file,
        };
        setNotes(prev => [newNote, ...prev]);
        handleCancelAdd();
      }
    } catch (error) {
      console.error('Error submitting note:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return {
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
  };
}; 