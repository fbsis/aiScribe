import OpenAI from "openai";
import fs from "fs";

import { logger } from "../../shared/utils/logger";
import { IAIService } from "../../domain/services/IAIService";
import { ExternalServiceError } from "../errors/InfrastructureError";

export class OpenAIService implements IAIService {
  private client: OpenAI;

  private readonly transcriptionModel = "gpt-4o-transcribe";
  private readonly summaryModel = "gpt-4o-mini";
  private readonly summaryPrompt =
    "You are a medical note summarizer. Create a concise summary of the given medical note, focusing on key points and important information. Use SOAP format.";
  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async transcribeAudio(audioLocate: string): Promise<string> {
    try {
      const transcription = await this.client.audio.transcriptions.create({
        file: fs.createReadStream(audioLocate),
        model: this.transcriptionModel,
      });
      logger.info("Transcription completed:", transcription);
      return transcription.text;
    } catch (error) {
      logger.error("Error transcribing audio:", error);
      throw new ExternalServiceError("Failed to transcribe audio");
    }
  }

  async generateSummary(text: string): Promise<string> {
    try {
      const completion = await this.client.chat.completions.create({
        model: this.summaryModel,
        messages: [
          {
            role: "system",
            content: this.summaryPrompt,
          },
          {
            role: "user",
            content: text,
          },
        ],
        max_tokens: 150,
      });

      return completion.choices[0].message.content || "";
    } catch (error) {
      logger.error("Error generating summary:", error);
      throw new ExternalServiceError("Failed to generate summary");
    }
  }
}
