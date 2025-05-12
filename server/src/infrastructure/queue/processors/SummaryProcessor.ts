import { Job } from 'bull';
import { logger } from '../../../shared/utils/logger';
import { AIService } from '../../external/AIService';
import { AppDataSource } from '../../database/config';
import { Note } from '../../database/entities/Note';
import { NoteStatus } from '../../database/entities/Note';

interface SummaryJobData {
  noteId: string;
  content: string;
}

export class SummaryProcessor {
  constructor(
    private readonly aiService: AIService,
    private readonly dataSource = AppDataSource
  ) {}

  async process(job: Job<SummaryJobData>): Promise<void> {
    const { noteId, content } = job.data;
    const noteRepository = this.dataSource.getRepository(Note);

    try {
      logger.info(`Generating summary for note ${noteId}`);

      // Update note status to processing
      await noteRepository.update(noteId, { status: NoteStatus.PROCESSING });

      // Generate summary
      const summary = await this.aiService.generateSummary(content);
      logger.info(`Summary generated for note ${noteId}`);

      // Update note with summary
      await noteRepository.update(noteId, {
        summary,
        status: NoteStatus.DONE
      });

      logger.info(`Summary generation completed for note ${noteId}`);
    } catch (error) {
      logger.error(`Error generating summary for note ${noteId}:`, error);
      
      // Update note status to error
      await noteRepository.update(noteId, {
        status: NoteStatus.ERROR,
        errorMessage: error instanceof Error ? error.message : 'Unknown error occurred'
      });

      throw error;
    }
  }
} 