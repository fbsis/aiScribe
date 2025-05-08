import { IAIService } from "../../domain/services/IAIService";
import { OpenAIService } from "./openaiService";

export class AIService implements IAIService {
  private openAIService: OpenAIService;

  constructor() {
    this.openAIService = new OpenAIService();
  }

  async transcribeAudio(audioLocate: string): Promise<string> {
    return this.openAIService.transcribeAudio(audioLocate);
  }

  async generateSummary(text: string): Promise<string> {
    return this.openAIService.generateSummary(text);
  }
}
