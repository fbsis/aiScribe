import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { patientService } from '../services/patientService';

const POLLING_INTERVAL = 2000; // 2 seconds

export const useNotes = (patientId?: string) => {
  const queryClient = useQueryClient();

  const { data: notes = [], isLoading, refetch } = useQuery({
    queryKey: ['notes', patientId],
    queryFn: () => patientId ? patientService.getPatientNotes(patientId) : Promise.resolve([]),
    enabled: !!patientId,
  });

  // Polling effect for processing notes
  useEffect(() => {
    const hasProcessingNotes = notes.some(note => note.status === 'processing');
    
    if (!hasProcessingNotes) return;

    const pollInterval = setInterval(() => {
      refetch();
    }, POLLING_INTERVAL);

    return () => clearInterval(pollInterval);
  }, [notes, refetch]);

  const addNoteMutation = useMutation({
    mutationFn: async ({ type, content }: { type: 'text' | 'audio', content: string | File }) => {
      if (!patientId) throw new Error('Patient ID is required');
      
      if (type === 'text') {
        return patientService.addPatientNote(patientId, content as string);
      } else {
        return patientService.addPatientAudioNote(patientId, content as File);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', patientId] });
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: (noteId: string) => patientService.deletePatientNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', patientId] });
    },
  });

  const handleSubmit = async (type: 'text' | 'audio', content: string | File) => {
    await addNoteMutation.mutateAsync({ type, content });
  };

  const handleDeleteNote = async (noteId: string) => {
    await deleteNoteMutation.mutateAsync(noteId);
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleString();
  };

  return {
    notes,
    isLoading,
    isAddingNote: addNoteMutation.isLoading,
    isDeletingNote: deleteNoteMutation.isLoading,
    handleSubmit,
    handleDeleteNote,
    formatDate,
  };
}; 