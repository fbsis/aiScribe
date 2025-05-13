# Contributing to Medical Notes System

## Table of Contents
- [Development Environment](#development-environment)
- [Environment Variables](#environment-variables)
- [Port Configuration](#port-configuration)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)

## Development Environment

### Prerequisites
- VS Code with Remote - Containers extension
- Docker Desktop
- Git
- Node.js >= 18.x (installed in devcontainer)

### Required VS Code Extensions
- Remote - Containers
- ESLint
- Prettier
- GitLens
- Docker

## Environment Variables

### Creating .env File

1. **Copy the Template**
   ```bash
   cp .env.example .env
   ```

2. **Configure Variables**
   - Open `.env` in your editor
   - Fill in the required values
   - Save the file

3. **File Location**
   - Place `.env` in the root directory
   - Never commit `.env` to version control
   - Keep `.env.example` updated with new variables

### Environment Variables Reference

| Category | Variable | Description | Required | Default | Example |
|----------|----------|-------------|----------|---------|---------|
| **Application** | `NODE_ENV` | Environment mode | Yes | `development` | `development` |
| | `PORT` | Backend server port | Yes | `4000` | `4000` |
| | `CLIENT_PORT` | Frontend server port | Yes | `3000` | `3000` |
| | `API_URL` | Backend API URL | Yes | `http://localhost:4000` | `http://localhost:4000` |
| **Database** | `POSTGRES_HOST` | PostgreSQL host | Yes | `localhost` | `localhost` |
| | `POSTGRES_PORT` | PostgreSQL port | Yes | `5432` | `5432` |
| | `POSTGRES_USER` | Database user | Yes | - | `medical_user` |
| | `POSTGRES_PASSWORD` | Database password | Yes | - | `your_secure_password` |
| | `POSTGRES_DB` | Database name | Yes | `medical_notes` | `medical_notes` |
| | `DATABASE_URL` | Full database URL | Yes | - | `postgresql://user:pass@localhost:5432/medical_notes` |
| **Redis** | `REDIS_HOST` | Redis host | Yes | `localhost` | `localhost` |
| | `REDIS_PORT` | Redis port | Yes | `6379` | `6379` |
| | `REDIS_PASSWORD` | Redis password | No | - | `your_redis_password` |
| **MinIO** | `MINIO_ENDPOINT` | MinIO server endpoint | Yes | `localhost` | `localhost` |
| | `MINIO_PORT` | MinIO API port | Yes | `9000` | `9000` |
| | `MINIO_CONSOLE_PORT` | MinIO console port | Yes | `9001` | `9001` |
| | `MINIO_ACCESS_KEY` | MinIO access key | Yes | - | `minioadmin` |
| | `MINIO_SECRET_KEY` | MinIO secret key | Yes | - | `minioadmin` |
| | `MINIO_BUCKET_NAME` | Default bucket name | Yes | `medical-notes` | `medical-notes` |
| | `MINIO_USE_SSL` | Use SSL for MinIO | No | `false` | `false` |
| **Queue** | `BULL_BOARD_PORT` | Bull Board monitoring port | Yes | `3001` | `3001` |
| | `QUEUE_PREFIX` | Queue name prefix | No | `medical-notes` | `medical-notes` |
| | `QUEUE_CONCURRENCY` | Number of concurrent jobs | No | `2` | `2` |
| **OpenAI** | `OPENAI_API_KEY` | OpenAI API key | Yes | - | `sk-...` |
| | `OPENAI_MODEL` | GPT model to use | Yes | `gpt-4` | `gpt-4` |
| | `OPENAI_WHISPER_MODEL` | Whisper model to use | Yes | `whisper-1` | `whisper-1` |
| **Security** | `JWT_SECRET` | JWT signing key | Yes | - | `your-secret-key` |
| | `JWT_EXPIRES_IN` | JWT token expiration | Yes | `1d` | `1d` |
| | `CORS_ORIGIN` | Allowed CORS origins | Yes | `http://localhost:3000` | `http://localhost:3000` |
| **Logging** | `LOG_LEVEL` | Application log level | No | `info` | `debug` |
| | `LOG_FORMAT` | Log format | No | `json` | `json` |

### Example .env File
```env
# Application
NODE_ENV=development
PORT=4000
CLIENT_PORT=3000
API_URL=http://localhost:4000

# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=medical_user
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=medical_notes
DATABASE_URL=postgresql://medical_user:your_secure_password@localhost:5432/medical_notes

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password

# MinIO
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_CONSOLE_PORT=9001
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET_NAME=medical-notes
MINIO_USE_SSL=false

# Queue
BULL_BOARD_PORT=3001
QUEUE_PREFIX=medical-notes
QUEUE_CONCURRENCY=2

# OpenAI
OPENAI_API_KEY=sk-your-api-key
OPENAI_MODEL=gpt-4
OPENAI_WHISPER_MODEL=whisper-1

# Security
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1d
CORS_ORIGIN=http://localhost:3000

# Logging
LOG_LEVEL=debug
LOG_FORMAT=json
```

### Environment-specific Files
- `.env.development` - Development environment variables
- `.env.test` - Testing environment variables
- `.env.production` - Production environment variables

### Security Notes
1. Never commit `.env` files to version control
2. Use strong, unique passwords
3. Rotate secrets regularly
4. Use different values for development and production
5. Keep API keys secure and never expose them

## Port Configuration

| Service | Port | Description | Environment Variable |
|---------|------|-------------|---------------------|
| Frontend | 3000 | React development server | `PORT=3000` |
| Backend API | 4000 | Express server | `PORT=4000` |
| PostgreSQL | 5432 | Database | `POSTGRES_PORT=5432` |
| Redis | 6379 | Queue system | `REDIS_PORT=6379` |
| MinIO API | 9000 | Object storage API | `MINIO_PORT=9000` |
| MinIO Console | 9001 | Object storage console | `MINIO_CONSOLE_PORT=9001` |
| Bull Board | 3001 | Queue monitoring | `BULL_BOARD_PORT=3001` |

## Getting Started

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd medical-notes
   ```

2. **Open in DevContainer**
   - Open VS Code
   - Click "Reopen in Container" when prompted
   - Wait for the container to build and start

3. **Environment Setup**
   - The devcontainer will automatically:
     - Install all dependencies
     - Start all required services
     - Configure the development environment
     - Set up pre-commit hooks

4. **Verify Installation**
   ```bash
   # Check if all services are running
   docker-compose ps

   # Run database migrations
   npm run migrate

   # Start development servers
   npm run dev
   ```

## Development Workflow

### Branch Strategy
- `main` - Production branch
- `develop` - Development branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches
- `hotfix/*` - Hot fix branches

### Creating a New Feature
1. Create a new branch from `develop`:
   ```bash
   git checkout develop
   git pull
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following the code standards

3. Run tests and linting:
   ```bash
   npm run test
   npm run lint
   ```

4. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

5. Push and create a Pull Request to `develop`

### Code Standards

#### TypeScript/JavaScript
- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for formatting
- Maximum line length: 100 characters
- Use meaningful variable and function names

#### React Components
- Use functional components with hooks
- Follow the component structure:
  ```typescript
  // Component structure
  import { FC } from 'react';
  
  interface Props {
    // Props definition
  }
  
  export const Component: FC<Props> = ({ prop1, prop2 }) => {
    // Component logic
    
    return (
      // JSX
    );
  };
  ```

#### Backend Code
- Follow DDD principles
- Use dependency injection
- Implement proper error handling
- Add logging for important operations
- Write unit tests for business logic

### Testing

#### Frontend Testing
```bash
# Run frontend tests
npm run test:client

# Run frontend tests with coverage
npm run test:client:coverage
```

#### Backend Testing
```bash
# Run backend tests
npm run test:server

# Run backend tests with coverage
npm run test:server:coverage
```

#### E2E Testing
```bash
# Run E2E tests
npm run test:e2e
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start all services in development mode |
| `npm run dev:client` | Start frontend development server |
| `npm run dev:server` | Start backend development server |
| `npm run build` | Build both frontend and backend |
| `npm run test` | Run all tests |
| `npm run lint` | Run linting |
| `npm run migrate` | Run database migrations |
| `npm run seed` | Seed database with test data |

## Pull Request Process

1. **Before Submitting**
   - Update documentation if needed
   - Add tests for new features
   - Ensure all tests pass
   - Update CHANGELOG.md

2. **Pull Request Template**
   ```markdown
   ## Description
   [Describe your changes]

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Checklist
   - [ ] Tests added/updated
   - [ ] Documentation updated
   - [ ] Code follows style guidelines
   - [ ] Self-reviewed the code
   - [ ] Added comments for complex logic
   ```

3. **Review Process**
   - At least one approval required
   - All CI checks must pass
   - No merge conflicts
   - Up-to-date with develop branch

## Troubleshooting

### Common Issues

1. **DevContainer Not Starting**
   - Check Docker Desktop is running
   - Verify VS Code Remote - Containers extension
   - Check system resources (memory, CPU)

2. **Database Connection Issues**
   - Verify PostgreSQL is running: `docker-compose ps`
   - Check database credentials in `.env`
   - Ensure migrations are up to date

3. **Queue System Issues**
   - Check Redis connection: `docker-compose ps`
   - Verify Bull Board is accessible
   - Check queue configuration

4. **MinIO Issues**
   - Verify MinIO is running: `docker-compose ps`
   - Check MinIO credentials
   - Ensure buckets are created

### Getting Help
- Check existing issues
- Join our Slack channel
- Contact the maintainers

## Additional Resources

- [Architecture Documentation](architecture.md)
- [API Documentation](api.md)
- [Project Planning](planning.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [License](LICENSE) 