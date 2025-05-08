import { ValidationError } from '../errors/DomainError';

export class AudioFileValue {
  constructor(
    private readonly filePath: string,
    private readonly duration: number,
    private readonly publicUrl: string
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.filePath) {
      throw new Error('File path is required');
    }
    if (this.duration < 0) {
      throw new Error('Duration must be a positive number');
    }
    if (!this.publicUrl) {
      throw new Error('Public URL is required');
    }
  }

  getFilePath(): string {
    return this.filePath;
  }

  getDuration(): number {
    return this.duration;
  }

  getPublicUrl(): string {
    return this.publicUrl;
  }

  public equals(other: AudioFileValue): boolean {
    return this.filePath === other.filePath && this.duration === other.duration;
  }
} 