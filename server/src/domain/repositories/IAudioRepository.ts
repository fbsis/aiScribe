import { AudioFile } from '../entities/AudioFile';

export interface IAudioRepository {
  findByNoteId(noteId: string): Promise<AudioFile | null>;
  create(audioFile: Omit<AudioFile, 'id' | 'createdAt'>): Promise<AudioFile>;
  delete(id: string): Promise<boolean>;
} 