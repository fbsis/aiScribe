import { IStorageService } from '../../domain/services/IStorageService';
import { AudioFileValue } from '../../domain/value-objects/AudioFile';
import { MinioService } from './minioService';

export class StorageService implements IStorageService {
  private minioService: MinioService;

  constructor() {
    this.minioService = new MinioService();
  }

  async uploadAudio(patientId: string, audioLocate: string): Promise<AudioFileValue> {
    return this.minioService.uploadAudio(patientId, audioLocate);
  }

  async getAudioUrl(filePath: string): Promise<string> {
    return this.minioService.getAudioUrl(filePath);
  }

  async deleteAudio(filePath: string): Promise<void> {
    return this.minioService.deleteAudio(filePath);
  }
} 