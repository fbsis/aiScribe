import { AudioFileValue } from '../value-objects/AudioFile';
import { ValidationError } from '../errors/DomainError';

export class AudioFile {
  constructor(
    public readonly id: string,
    public readonly noteId: string,
    private fileData: AudioFileValue,
    public readonly createdAt: Date = new Date()
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.id) {
      throw new ValidationError('Audio file ID is required');
    }
    if (!this.noteId) {
      throw new ValidationError('Note ID is required');
    }
  }

  public getFilePath(): string {
    return this.fileData.getFilePath();
  }

  public getDuration(): number {
    return this.fileData.getDuration();
  }

  public getFileData(): AudioFileValue {
    return this.fileData;
  }

  public updateFileData(fileData: AudioFileValue): void {
    this.fileData = fileData;
  }

  public toJSON(): any {
    return {
      id: this.id,
      noteId: this.noteId,
      filePath: this.fileData.getFilePath(),
      duration: this.fileData.getDuration(),
      createdAt: this.createdAt
    };
  }
} 