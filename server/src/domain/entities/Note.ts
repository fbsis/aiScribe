import { AudioFile } from './AudioFile';
import { Content } from '../value-objects/Content';
import { ValidationError } from '../errors/DomainError';

export class Note {
  constructor(
    public readonly id: string,
    public readonly patientId: string,
    private content: Content,
    private summary?: string,
    private audioFile?: AudioFile,
    public readonly createdAt: Date = new Date(),
    private updatedAt: Date = new Date()
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.id) {
      throw new ValidationError('Note ID is required');
    }
    if (!this.patientId) {
      throw new ValidationError('Patient ID is required');
    }
  }

  public getContent(): Content {
    return this.content;
  }

  public getSummary(): string | undefined {
    return this.summary;
  }

  public getAudioFile(): AudioFile | undefined {
    return this.audioFile;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public updateContent(content: Content): void {
    this.content = content;
    this.updatedAt = new Date();
  }

  public updateSummary(summary: string): void {
    this.summary = summary;
    this.updatedAt = new Date();
  }

  public attachAudioFile(audioFile: AudioFile): void {
    this.audioFile = audioFile;
    this.updatedAt = new Date();
  }

  public removeAudioFile(): void {
    this.audioFile = undefined;
    this.updatedAt = new Date();
  }
} 