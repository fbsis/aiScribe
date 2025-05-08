import { Client } from 'minio';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../../shared/utils/logger';
import { IStorageService } from '../../domain/services/IStorageService';
import { AudioFileValue } from '../../domain/value-objects/AudioFile';
import { StorageError } from '../errors/InfrastructureError';
import fs from 'fs';

export class MinioService implements IStorageService {
  private client: Client;
  private bucket: string;
  private timelimitGetPublicUrl: number = 7 * 24 * 60 * 60; // 7 days

  constructor() {
    this.client = new Client({
      endPoint: process.env.MINIO_ENDPOINT || 'localhost',
      port: parseInt(process.env.MINIO_PORT || '9000'),
      useSSL: process.env.MINIO_USE_SSL === 'true',
      accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
      secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
    });

    this.bucket = process.env.MINIO_BUCKET || 'medical-notes';
    this.initializeBucket();
  }

  private async initializeBucket() {
    try {
      const exists = await this.client.bucketExists(this.bucket);
      if (!exists) {
        await this.client.makeBucket(this.bucket);
        logger.info(`Created bucket: ${this.bucket}`);
      }
    } catch (error) {
      logger.error('Error initializing storage bucket:', error);
      throw new StorageError('Failed to initialize storage bucket');
    }
  }

  async uploadAudio(patientId: string, audioLocate: string): Promise<AudioFileValue> {
    const fileName = `${patientId}/${uuidv4()}.webm`;
    
    try {
      await this.client.putObject(
        this.bucket,
        fileName,
        fs.createReadStream(audioLocate),
        {
          'Content-Type': 'audio/webm',
        }
      );
      
      // Get public URL
      const publicUrl = await this.getAudioUrl(fileName);
      
      return new AudioFileValue(fileName, 0, publicUrl); // TODO: Calculate actual duration
    } catch (error) {
      logger.error('Error uploading audio:', error);
      throw new StorageError('Failed to upload audio file');
    }
  }

  async getAudioUrl(filePath: string): Promise<string> {
    try {
      return await this.client.presignedGetObject(this.bucket, filePath, this.timelimitGetPublicUrl);
    } catch (error) {
      logger.error('Error generating audio URL:', error);
      throw new StorageError('Failed to generate audio URL');
    }
  }

  async deleteAudio(filePath: string): Promise<void> {
    try {
      await this.client.removeObject(this.bucket, filePath);
    } catch (error) {
      logger.error('Error deleting audio:', error);
      throw new StorageError('Failed to delete audio file');
    }
  }
} 