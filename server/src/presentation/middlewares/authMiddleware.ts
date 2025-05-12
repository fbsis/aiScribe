import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../../application/services/AuthService';
import { logger } from '../../shared/utils/logger';

const authService = new AuthService();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    logger.warn('No authorization header provided');
    return res.status(401).json({ error: 'No authorization header' });
  }

  const token = authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    logger.warn('No token provided');
    return res.status(401).json({ error: 'No token provided' });
  }

  if (!authService.verifyToken(token)) {
    logger.warn('Invalid token');
    return res.status(401).json({ error: 'Invalid token' });
  }

  next();
}; 