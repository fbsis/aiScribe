import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import { authMiddleware } from './presentation/middlewares/authMiddleware';
import { setupSwagger } from './presentation/swagger';
import { logger } from './shared/utils/logger';
import { AppDataSource } from './infrastructure/database/config';
import { patientRoutes } from './presentation/controllers/patientController';
import { noteRoutes } from './presentation/controllers/noteController';
import { authRoutes } from './presentation/controllers/AuthController';
import { setupBullManager } from './presentation/setupBullManager';

// Load environment variables
config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Setup Swagger
setupSwagger(app);

// Setup Bull Board
setupBullManager(app);

// Routes
app.use('/auth', authRoutes);
app.use('/patients',authMiddleware,  patientRoutes);
app.use('/notes', authMiddleware, noteRoutes);

// TODO: Import and use other routes (patients, notes) once controllers are updated with Swagger docs

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;

// Initialize database and start server
AppDataSource.initialize()
  .then(() => {
    logger.info('Database connection established');
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(`API documentation available at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((error) => {
    logger.error('Error during Data Source initialization:', error);
  }); 