import { DataSource } from 'typeorm';
import { Note } from '../../infrastructure/database/entities/Note';
import { AudioFile } from '../../infrastructure/database/entities/AudioFile';
import { IStorageService } from '../../domain/services/IStorageService';
import { IAIService } from '../../domain/services/IAIService';
import { NotFoundError } from '../../domain/errors/DomainError';
import { DatabaseError } from '../../infrastructure/errors/InfrastructureError';
import { logger } from '../../shared/utils/logger';

export class NoteService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly storageService: IStorageService,
    private readonly aiService: IAIService
  ) {}

  async getNotesByPatientId(patientId: string): Promise<Note[]> {
    try {
      logger.debug(`Fetching notes for patient ${patientId}`);
      const noteRepository = this.dataSource.getRepository(Note);
      const notes = await noteRepository.find({
        where: { patientId },
        relations: ['audioFile'],
        order: { createdAt: 'DESC' },
      });

      logger.debug(`Found ${notes.length} notes for patient ${patientId}`);
      return notes;
    } catch (error) {
      logger.error(`Error fetching notes for patient ${patientId}:`, error);
      throw new DatabaseError('Failed to fetch notes');
    }
  }

  async getNoteById(id: string): Promise<Note | null> {
    try {
      logger.debug(`Fetching note with id ${id}`);
      const noteRepository = this.dataSource.getRepository(Note);
      const note = await noteRepository.findOne({
        where: { id },
        relations: ['audioFile'],
      });

      if (!note) {
        logger.debug(`Note with id ${id} not found`);
      } else {
        logger.debug(`Found note with id ${id}`);
      }

      return note;
    } catch (error) {
      logger.error(`Error fetching note with id ${id}:`, error);
      throw new DatabaseError('Failed to fetch note');
    }
  }

  async createTextNote(data: { patientId: string; content: string }): Promise<Note> {
    try {
      logger.debug(`Creating text note for patient ${data.patientId}`);
      const summary = await this.aiService.generateSummary(data.content);
      logger.debug(`Generated summary for note`);
      
      const noteRepository = this.dataSource.getRepository(Note);
      const note = noteRepository.create({
        ...data,
        summary,
      });

      await noteRepository.save(note);
      logger.info(`Created text note with id ${note.id} for patient ${data.patientId}`);
      return note;
    } catch (error) {
      logger.error(`Error creating text note for patient ${data.patientId}:`, error);
      throw new DatabaseError('Failed to create note');
    }
  }

  async createAudioNote(patientId: string, audioLocate: string): Promise<Note> {
    try {
      logger.debug(`Creating audio note for patient ${patientId}`);
      
      // Upload audio file
      logger.debug(`Uploading audio file for patient ${patientId}`);
      const audioFileValue = await this.storageService.uploadAudio(patientId, audioLocate);
      logger.debug(`Audio file uploaded successfully`);
      
      // Transcribe audio
      logger.debug(`Transcribing audio for patient ${patientId}`);
      const transcription = await this.aiService.transcribeAudio(audioLocate);
      logger.debug(`Audio transcription completed`);
      
      // Generate summary
      logger.debug(`Generating summary for transcription`);
      const summary = await this.aiService.generateSummary(transcription);
      logger.debug(`Summary generated successfully`);

      const noteRepository = this.dataSource.getRepository(Note);
      const audioFileRepository = this.dataSource.getRepository(AudioFile);

      // Create note with audio file
      const note = noteRepository.create({
        patientId,
        content: transcription,
        summary,
      });

      await noteRepository.save(note);
      logger.debug(`Note created with id ${note.id}`);

      const audioFile = audioFileRepository.create({
        noteId: note.id,
        filePath: audioFileValue.getFilePath(),
        duration: audioFileValue.getDuration(),
      });

      await audioFileRepository.save(audioFile);
      logger.debug(`Audio file record created for note ${note.id}`);

      const completeNote = await this.getNoteById(note.id) as Note;
      logger.info(`Created audio note with id ${note.id} for patient ${patientId}`);
      return completeNote;
    } catch (error) {
      logger.error(`Error creating audio note for patient ${patientId}:`, error);
      throw new DatabaseError('Failed to create audio note');
    }
  }

  async deleteNote(id: string): Promise<boolean> {
    try {
      logger.debug(`Attempting to delete note with id ${id}`);
      const noteRepository = this.dataSource.getRepository(Note);
      const note = await noteRepository.findOne({
        where: { id },
        relations: ['audioFile'],
      });

      if (!note) {
        logger.warn(`Note with id ${id} not found for deletion`);
        throw new NotFoundError('Note not found');
      }

      // Delete audio file if exists
      if (note.audioFile) {
        logger.debug(`Deleting audio file for note ${id}`);
        await this.storageService.deleteAudio(note.audioFile.filePath);
        logger.debug(`Audio file deleted successfully`);
      }

      // Delete note
      await noteRepository.remove(note);
      logger.info(`Note with id ${id} deleted successfully`);

      return true;
    } catch (error) {
      if (error instanceof NotFoundError) {
        logger.warn(`Note not found error for id ${id}:`, error);
        throw error;
      }
      logger.error(`Error deleting note with id ${id}:`, error);
      throw new DatabaseError('Failed to delete note');
    }
  }
} 