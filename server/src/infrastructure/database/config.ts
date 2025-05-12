import { DataSource } from 'typeorm';
import { Patient } from './entities/Patient';
import { Note } from './entities/Note';
import { AudioFile } from './entities/AudioFile';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities: [Patient, Note, AudioFile],
  migrations: [],
  subscribers: [],
}); 