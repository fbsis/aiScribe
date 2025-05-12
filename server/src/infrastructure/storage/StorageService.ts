import { IStorageService } from '../../domain/services/IStorageService';
import { MinioService } from './minioService';
import { AudioFileValue } from '../../domain/value-objects/AudioFile';
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