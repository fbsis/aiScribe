import { PrismaClient } from '@prisma/client';
import { Note } from '../../domain/entities/Note';
import { AudioFile } from '../../domain/entities/AudioFile';
import { IStorageService } from '../../domain/services/IStorageService';
import { IAIService } from '../../domain/services/IAIService';
import { NotFoundError } from '../../domain/errors/DomainError';
import { DatabaseError } from '../../infrastructure/errors/InfrastructureError';

export class NoteService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly storageService: IStorageService,
    private readonly aiService: IAIService
  ) {}

  async getNotesByPatientId(patientId: string): Promise<Note[]> {
    try {
      const notes = await this.prisma.note.findMany({
        where: { patientId },
        include: {
          audioFile: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      return notes.map(note => this.mapToNote(note));
    } catch (error) {
      throw new DatabaseError('Failed to fetch notes');
    }
  }

  async getNoteById(id: string): Promise<Note | null> {
    try {
      const note = await this.prisma.note.findUnique({
        where: { id },
        include: {
          audioFile: true,
        },
      });

      return note ? this.mapToNote(note) : null;
    } catch (error) {
      throw new DatabaseError('Failed to fetch note');
    }
  }

  async createTextNote(data: { patientId: string; content: string }): Promise<Note> {
    try {
      const summary = await this.aiService.generateSummary(data.content);
      
      const note = await this.prisma.note.create({
        data: {
          ...data,
          summary,
        },
      });

      return this.mapToNote(note);
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

      // Create note with audio file
      const note = await this.prisma.note.create({
        data: {
          patientId,
          content: transcription,
          summary,
          audioFile: {
            create: {
              filePath: audioFileValue.getFilePath(),
              duration: audioFileValue.getDuration(),
            },
          },
        },
        include: {
          audioFile: true,
        },
      });

      return this.mapToNote(note);
    } catch (error) {
      throw new DatabaseError('Failed to create audio note');
    }
  }

  async deleteNote(id: string): Promise<boolean> {
    try {
      const note = await this.prisma.note.findUnique({
        where: { id },
        include: { audioFile: true },
      });

      if (!note) {
        throw new NotFoundError('Note not found');
      }

      // Delete audio file if exists
      if (note.audioFile) {
        await this.storageService.deleteAudio(note.audioFile.filePath);
      }

      // Delete note
      await this.prisma.note.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new DatabaseError('Failed to delete note');
    }
  }

  private mapToNote(data: any): Note {
    // Map database entity to domain entity
    return new Note(
      data.id,
      data.patientId,
      data.content,
      data.summary,
      data.audioFile ? new AudioFile(
        data.audioFile.id,
        data.audioFile.noteId,
        data.audioFile.filePath,
        data.audioFile.duration
      ) : undefined,
      data.createdAt,
      data.updatedAt
    );
  }
} 