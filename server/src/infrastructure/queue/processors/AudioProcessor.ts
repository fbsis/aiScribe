import { Job } from 'bull';
import { logger } from '../../../shared/utils/logger';
import { AIService } from '../../external/AIService';
import { StorageService } from '../../storage/StorageService';
import { AppDataSource } from '../../database/config';
import { Note, NoteStatus } from '../../database/entities/Note';
import fs from 'fs';

interface AudioJobData {
  noteId: string;
  patientId: string;
  audioFilePath: string;
}

export class AudioProcessor {
  constructor(
    private readonly aiService: AIService,
    private readonly storageService: StorageService
  ) {}

  async process(job: Job<AudioJobData>): Promise<void> {
    const { noteId, audioFilePath } = job.data;
    logger.info(`Processing audio for note ${noteId}`);

    try {
      // Verify the file exists
      await fs.promises.access(audioFilePath, fs.constants.F_OK);

      // Transcribe audio
      const transcription = await this.aiService.transcribeAudio(audioFilePath);
      logger.info(`Audio transcribed for note ${noteId}`);

      // Generate summary
      const summary = await this.aiService.generateSummary(transcription);
      logger.info(`Summary generated for note ${noteId}`);

      // Update note
      const noteRepository = AppDataSource.getRepository(Note);
      await noteRepository.update(noteId, {
        content: transcription,
        summary,
        status: NoteStatus.DONE,
      });

      logger.info(`Note ${noteId} processed successfully`);

      // Clean up temporary file
      try {
        await fs.promises.unlink(audioFilePath);
        logger.debug(`Temporary file ${audioFilePath} deleted successfully`);
      } catch (error) {
        logger.warn(`Failed to delete temporary file ${audioFilePath}:`, error);
      }

    } catch (error) {
      logger.error(`Error processing audio for note ${noteId}:`, error);

      // Update note status to failed
      const noteRepository = AppDataSource.getRepository(Note);
      await noteRepository.update(noteId, {
        status: NoteStatus.ERROR,
        errorMessage: error instanceof Error ? error.message : 'Unknown error occurred'
      });

      throw error;
    }
  }
} 