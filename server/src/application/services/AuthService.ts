import jwt from 'jsonwebtoken';
import { logger } from '../../shared/utils/logger';

export class AuthService {
  private readonly JWT_SECRET: string;
  private readonly APP_CODE: string;

  constructor() {
    this.JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
    this.APP_CODE = process.env.APP_CODE || 'LIME-MEDICAL-2024';
  }

  generateToken(appCode: string): string {
    if (appCode !== this.APP_CODE) {
      throw new Error('Invalid application code');
    }

    const token = jwt.sign(
      { 
        appCode,
        timestamp: new Date().toISOString()
      },
      this.JWT_SECRET,
      { expiresIn: '24h' }
    );

    logger.info('Generated new JWT token');
    return token;
  }

  verifyToken(token: string): boolean {
    try {
      jwt.verify(token, this.JWT_SECRET);
      return true;
    } catch (error) {
      logger.error('Invalid token:', error);
      return false;
    }
  }
} 