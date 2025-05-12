import { DataSource } from 'typeorm';
import { Patient } from './infrastructure/database/entities/Patient';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'medical_notes',
  entities: [Patient],
  migrations: ['src/infrastructure/database/migrations/**/*.ts'],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
}); 