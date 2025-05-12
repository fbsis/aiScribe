import { DataSource } from 'typeorm';
import { Note } from '../../domain/entities/Note';
import { AudioFile } from '../../domain/entities/AudioFile';
import { IStorageService } from '../../domain/services/IStorageService';
import { IAIService } from '../../domain/services/IAIService';
import { NotFoundError } from '../../domain/errors/DomainError';
import { DatabaseError } from '../../infrastructure/errors/InfrastructureError';

export class NoteService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly storageService: IStorageService,
    private readonly aiService: IAIService
  ) {}

  async getNotesByPatientId(patientId: string): Promise<Note[]> {
    try {
      const noteRepository = this.dataSource.getRepository(Note);
      const notes = await noteRepository.find({
        where: { patientId },
        relations: ['audioFile'],
        order: { createdAt: 'DESC' },
      });

      return notes;
    } catch (error) {
      throw new DatabaseError('Failed to fetch notes');
    }
  }

  async getNoteById(id: string): Promise<Note | null> {
    try {
      const noteRepository = this.dataSource.getRepository(Note);
      const note = await noteRepository.findOne({
        where: { id },
        relations: ['audioFile'],
      });

      return note;
    } catch (error) {
      throw new DatabaseError('Failed to fetch note');
    }
  }

  async createTextNote(data: { patientId: string; content: string }): Promise<Note> {
    try {
      const summary = await this.aiService.generateSummary(data.content);
      
      const noteRepository = this.dataSource.getRepository(Note);
      const note = noteRepository.create({
        ...data,
        summary,
      });

      await noteRepository.save(note);
      return note;
    } catch (error) {
      throw new DatabaseError('Failed to create note');
    }
  }

  async createAudioNote(patientId: string, audioLocate: string): Promise<Note> {
    try {
      // Upload audio file
      const audioFileValue = await this.storageService.uploadAudio(patientId, audioLocate);
      
      // Transcribe audio
      const transcription = await this.aiService.transcribeAudio(audioLocate);
      
      // Generate summary
      const summary = await this.aiService.generateSummary(transcription);

      const noteRepository = this.dataSource.getRepository(Note);
      const audioFileRepository = this.dataSource.getRepository(AudioFile);

      // Create note with audio file
      const note = noteRepository.create({
        patientId,
        content: transcription,
        summary,
      });

      await noteRepository.save(note);

      const audioFile = audioFileRepository.create({
        noteId: note.id,
        filePath: audioFileValue.getFilePath(),
        duration: audioFileValue.getDuration(),
      });

      await audioFileRepository.save(audioFile);

      return this.getNoteById(note.id) as Promise<Note>;
    } catch (error) {
      throw new DatabaseError('Failed to create audio note');
    }
  }

  async deleteNote(id: string): Promise<boolean> {
    try {
      const noteRepository = this.dataSource.getRepository(Note);
      const note = await noteRepository.findOne({
        where: { id },
        relations: ['audioFile'],
      });

      if (!note) {
        throw new NotFoundError('Note not found');
      }

      // Delete audio file if exists
      if (note.audioFile) {
        await this.storageService.deleteAudio(note.audioFile.filePath);
      }

      // Delete note
      await noteRepository.remove(note);

      return true;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new DatabaseError('Failed to delete note');
    }
  }
} 