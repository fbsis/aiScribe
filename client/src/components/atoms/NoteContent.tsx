import React from 'react';
import { Typography } from '@mui/material';
import { Note } from '../../services/patientService';

interface NoteContentProps {
  note: Note;
}

const NoteContent: React.FC<NoteContentProps> = ({ note }) => {
  if(note.content && note.status === 'done') {
    return;
  }
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

export default NoteContent; 