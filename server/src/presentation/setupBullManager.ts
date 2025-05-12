import { Express } from 'express';
import { QueueManager } from '../infrastructure/queue/QueueManager';
import { AIService } from '../infrastructure/external/AIService';
import { StorageService } from '../infrastructure/storage/StorageService';

export function setupBullManager(app: Express): QueueManager {
  const aiService = new AIService();
  const storageService = new StorageService();
  
  const queueManager = new QueueManager(aiService, storageService);
  
  // Setup Bull Board for monitoring
  queueManager.setupBullBoard(app);
  
  return queueManager;
}
