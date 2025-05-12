import 'reflect-metadata';

// Mock environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret';
process.env.APP_CODE = 'test-app';
process.env.PORT = '3000';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db';
process.env.MINIO_ENDPOINT = 'localhost';
process.env.MINIO_PORT = '9000';
process.env.MINIO_ACCESS_KEY = 'test-access-key';
process.env.MINIO_SECRET_KEY = 'test-secret-key';
process.env.MINIO_BUCKET = 'test-bucket';
process.env.OPENAI_API_KEY = 'test-api-key';

// Mock TypeORM decorators
jest.mock('typeorm', () => {
  const actual = jest.requireActual('typeorm');
  return {
    ...actual,
    PrimaryGeneratedColumn: () => () => {},
    Column: () => () => {},
    Entity: () => () => {},
    ManyToOne: () => () => {},
    OneToMany: () => () => {},
    OneToOne: () => () => {},
    JoinColumn: () => () => {},
    CreateDateColumn: () => () => {},
    UpdateDateColumn: () => () => {}
  };
});

// Global test timeout
jest.setTimeout(10000);

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
}); 