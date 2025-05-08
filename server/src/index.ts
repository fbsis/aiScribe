import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import { errorHandler } from './presentation/middlewares/errorHandler';
import { patientRoutes } from './presentation/controllers/patientController';
import { noteRoutes } from './presentation/controllers/noteController';
import { logger } from './shared/utils/logger';

// Load environment variables
config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/patients', patientRoutes);
app.use('/api/notes', noteRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
}); 