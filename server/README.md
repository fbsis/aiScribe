# Medical Notes Server

This is the backend server for the Medical Notes System, built with Node.js, Express, and TypeScript.

## Features

- Patient management (CRUD operations)
- Note management with text and audio support
- Audio file storage using MinIO
- Audio transcription using OpenAI Whisper
- Text summarization using OpenAI GPT
- PostgreSQL database with Prisma ORM

## Prerequisites

- Node.js 20 or later
- Docker and Docker Compose
- PostgreSQL
- MinIO (S3-compatible storage)

## Environment Variables

Create a `.env` file in the server directory with the following variables:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/medical_notes?schema=public"

# JWT
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=24h

# MinIO Configuration
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET=medical-notes
MINIO_USE_SSL=false

# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key
```

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Docker Development

1. Start the development environment:
   ```bash
   docker-compose up
   ```

2. Access the services:
   - Server: http://localhost:3001
   - MinIO Console: http://localhost:9001
   - PostgreSQL: localhost:5432

## API Endpoints

### Patients

- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get patient by ID
- `POST /api/patients` - Create new patient
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

### Notes

- `GET /api/notes/patient/:patientId` - Get all notes for a patient
- `GET /api/notes/:id` - Get note by ID
- `POST /api/notes` - Create text note
- `POST /api/notes/audio` - Upload audio note
- `DELETE /api/notes/:id` - Delete note

## Project Structure

```
src/
├── application/          # Application services and use cases
├── domain/              # Domain entities and interfaces
├── infrastructure/      # External services and implementations
├── presentation/        # Controllers and middlewares
└── shared/             # Shared utilities and types
```

## Testing

Run the test suite:
```bash
npm test
```

## License

MIT 