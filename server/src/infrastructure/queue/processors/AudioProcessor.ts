import { Job } from 'bull';
import { logger } from '../../../shared/utils/logger';
import { AIService } from '../../external/AIService';
import { StorageService } from '../../storage/StorageService';
import { AppDataSource } from '../../database/config';
import { Note } from '../../database/entities/Note';
import { NoteStatus } from '../../database/entities/Note';

interface AudioJobData {
  noteId: string;
  patientId: string;
  audioFilePath: string;
}

export class AudioProcessor {
  constructor(
    private readonly aiService: AIService,
    private readonly storageService: StorageService,
    private readonly dataSource = AppDataSource
  ) {}

  async process(job: Job<AudioJobData>): Promise<void> {
    const { noteId, patientId, audioFilePath } = job.data;
    const noteRepository = this.dataSource.getRepository(Note);

    try {
      logger.info(`Processing audio for note ${noteId}`);

      // Update note status to processing
      await noteRepository.update(noteId, { status: NoteStatus.PROCESSING });

      // Upload audio to storage
      const audioFileValue = await this.storageService.uploadAudio(patientId, audioFilePath);
      logger.info(`Audio uploaded for note ${noteId}`);

      // Transcribe audio
      const transcription = await this.aiService.transcribeAudio(audioFilePath);
      logger.info(`Audio transcribed for note ${noteId}`);

      // Update note with transcription
      await noteRepository.update(noteId, {
        content: transcription,
        status: NoteStatus.DONE
      });

      logger.info(`Audio processing completed for note ${noteId}`);
    } catch (error) {
      logger.error(`Error processing audio for note ${noteId}:`, error);
      
      // Update note status to error
      await noteRepository.update(noteId, {
        status: NoteStatus.ERROR,
        errorMessage: error instanceof Error ? error.message : 'Unknown error occurred'
      });

      throw error;
    }
  }
} 