export interface IAIService {
  transcribeAudio(audioLocate: string): Promise<string>;
  generateSummary(text: string): Promise<string>;
} 