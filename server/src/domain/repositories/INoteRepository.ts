import { Note } from '../entities/Note';

export interface INoteRepository {
  findByPatientId(patientId: string): Promise<Note[]>;
  findById(id: string): Promise<Note | null>;
  create(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note>;
  update(id: string, note: Partial<Note>): Promise<Note | null>;
  delete(id: string): Promise<boolean>;
} 