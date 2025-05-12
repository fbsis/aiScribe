import { Router, Request, Response } from 'express';
import { AuthService } from '../../application/services/AuthService';
import { logger } from '../../shared/utils/logger';

const router = Router();
const authService = new AuthService();

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - appCode
 *       properties:
 *         appCode:
 *           type: string
 *           description: Application code for authentication
 *           example: LIME-MEDICAL-2024
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT token
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Get authentication token
 *     description: Generate a JWT token using application code
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Token generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Application code is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Application code is required
 *       401:
 *         description: Invalid application code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid application code
 */
router.post('/login', (req: Request, res: Response) => {
  try {
    const { appCode } = req.body;

    if (!appCode) {
      logger.warn('No application code provided');
      return res.status(400).json({ error: 'Application code is required' });
    }

    const token = authService.generateToken(appCode);
    res.json({ token });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(401).json({ error: 'Invalid application code' });
  }
});

export { router as authRoutes }; 