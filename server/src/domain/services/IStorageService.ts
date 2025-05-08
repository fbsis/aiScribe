import { AudioFileValue } from '../value-objects/AudioFile';

export interface IStorageService {
  uploadAudio(patientId: string, audioLocate: string): Promise<AudioFileValue>;
  getAudioUrl(filePath: string): Promise<string>;
  deleteAudio(filePath: string): Promise<void>;
} 