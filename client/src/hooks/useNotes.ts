import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { patientService } from '../services/patientService';

interface Note {
  id: string;
  type: 'text' | 'audio';
  content: string;
  createdAt: Date;
  file?: File;
}

export const useNotes = (patientId?: string) => {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [noteType, setNoteType] = useState<'text' | 'audio'>('text');
  const [textNote, setTextNote] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const queryClient = useQueryClient();

  const { data: notes = [] } = useQuery<Note[]>({
    queryKey: ['notes', patientId],
    queryFn: () => patientService.getPatientNotes(patientId!),
    enabled: !!patientId,
  });

  const addNoteMutation = useMutation({
    mutationFn: (note: Omit<Note, 'id' | 'createdAt'>) => 
      patientService.addPatientNote(patientId!, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', patientId] });
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: (noteId: string) => 
      patientService.deletePatientNote(patientId!, noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', patientId] });
    },
  });

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
        await addNoteMutation.mutateAsync({
          type: 'text',
          content: textNote,
        });
        handleCancelAdd();
      } else if (noteType === 'audio' && audioUrl) {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const file = new File([audioBlob], 'audio-note.webm', { type: 'audio/webm' });
        await addNoteMutation.mutateAsync({
          type: 'audio',
          content: audioUrl,
          file,
        });
        handleCancelAdd();
      }
    } catch (error) {
      console.error('Error submitting note:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteNoteMutation.mutateAsync(noteId);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
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