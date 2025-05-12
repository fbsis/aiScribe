import Bull from 'bull';
import { Job } from 'bull';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { logger } from '../../shared/utils/logger';
import { AudioProcessor } from './processors/AudioProcessor';
import { SummaryProcessor } from './processors/SummaryProcessor';
import { AIService } from '../external/AIService';
import { StorageService } from '../storage/StorageService';

import { Express } from 'express';

interface AudioJobData {
  noteId: string;
  patientId: string;
  audioFilePath: string;
}

interface SummaryJobData {
  noteId: string;
  content: string;
}

export class QueueManager {
  private audioQueue: Bull.Queue;
  private summaryQueue: Bull.Queue;
  private audioProcessor: AudioProcessor;
  private summaryProcessor: SummaryProcessor;

  constructor(
    private readonly aiService: AIService,
    private readonly storageService: StorageService
  ) {
    // Initialize queues
    this.audioQueue = Bull('audio-processing', {
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
    });

    this.summaryQueue = Bull('summary-generation', {
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
    });

    // Initialize processors
    this.audioProcessor = new AudioProcessor(this.aiService, this.storageService);
    this.summaryProcessor = new SummaryProcessor(this.aiService);

    // Set up queue processors
    this.setupProcessors();
    this.setupErrorHandling();
  }

  private setupProcessors(): void {
    // Process audio jobs
    this.audioQueue.process(async (job: Job<AudioJobData>) => {
      logger.info(`Starting audio processing job ${job.id}`);
      await this.audioProcessor.process(job);
    });

    // Process summary jobs
    this.summaryQueue.process(async (job: Job<SummaryJobData>) => {
      logger.info(`Starting summary generation job ${job.id}`);
      await this.summaryProcessor.process(job);
    });
  }

  private setupErrorHandling(): void {
    // Handle audio queue errors
    this.audioQueue.on('error', (error: Error) => {
      logger.error('Audio queue error:', error);
    });

    this.audioQueue.on('failed', (job: Job<AudioJobData>, error: Error) => {
      logger.error(`Audio job ${job.id} failed:`, error);
    });

    // Handle summary queue errors
    this.summaryQueue.on('error', (error: Error) => {
      logger.error('Summary queue error:', error);
    });

    this.summaryQueue.on('failed', (job: Job<SummaryJobData>, error: Error) => {
      logger.error(`Summary job ${job.id} failed:`, error);
    });
  }

  // Add jobs to queues
  async addAudioJob(data: AudioJobData): Promise<void> {
    await this.audioQueue.add(data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
    });
  }

  async addSummaryJob(data: SummaryJobData): Promise<void> {
    await this.summaryQueue.add(data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
    });
  }

  // Setup Bull Board for monitoring
  setupBullBoard(app: Express): void {
    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath('/admin/queues');
    console.log("Bull manager setup - '/admin/queues'", );
    createBullBoard({
      queues: [
        new BullAdapter(this.audioQueue),
        new BullAdapter(this.summaryQueue),
      ],
      serverAdapter,
    });

    app.use('/admin/queues', serverAdapter.getRouter());
  }

  // Graceful shutdown
  async shutdown(): Promise<void> {
    await this.audioQueue.close();
    await this.summaryQueue.close();
  }
} 