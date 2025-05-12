import fs from 'fs';
import { Router } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validateRequest';
import { NoteService } from '../../application/services/noteService';
import { AppError } from '../middlewares/errorHandler';
import multer from 'multer';
import express from 'express';
import { AppDataSource } from '../../infrastructure/database/config';
import { StorageService } from '../../infrastructure/storage/StorageService';
import { AIService } from '../../infrastructure/external/AIService';
import { logger } from '../../shared/utils/logger';
import { QueueManager } from '../../infrastructure/queue/QueueManager';

const router = Router();
const storageService = new StorageService();
const aiService = new AIService();
const queueManager = new QueueManager(aiService, storageService);
const noteService = new NoteService(AppDataSource, storageService, queueManager);
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       required:
 *         - id
 *         - patientId
 *         - content
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated id of the note
 *         patientId:
 *           type: string
 *           format: uuid
 *           description: The ID of the patient this note belongs to
 *         content:
 *           type: string
 *           description: The content of the note
 *         summary:
 *           type: string
 *           description: AI-generated summary of the note
 *         audioFile:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *             filePath:
 *               type: string
 *             duration:
 *               type: number
 *             publicUrl:
 *               type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     CreateTextNoteRequest:
 *       type: object
 *       required:
 *         - patientId
 *         - content
 *       properties:
 *         patientId:
 *           type: string
 *           format: uuid
 *           description: The ID of the patient
 *         content:
 *           type: string
 *           description: The content of the note
 *     CreateAudioNoteRequest:
 *       type: object
 *       required:
 *         - patientId
 *         - audio
 *       properties:
 *         patientId:
 *           type: string
 *           format: uuid
 *           description: The ID of the patient
 *         audio:
 *           type: string
 *           format: binary
 *           description: The audio file (MP3, WAV, etc.)
 */

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Note management endpoints
 */

/**
 * @swagger
 * /notes/patient/{patientId}:
 *   get:
 *     summary: Get all notes for a patient
 *     description: Retrieve all notes associated with a specific patient
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the patient
 *     responses:
 *       200:
 *         description: List of notes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Internal server error
 */
router.get('/patient/:patientId', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const notes = await noteService.getNotesByPatientId(req.params.patientId);
    res.json(notes);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Get a note by ID
 *     description: Retrieve a specific note by its ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the note
 *     responses:
 *       200:
 *         description: Note retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       404:
 *         description: Note not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const note = await noteService.getNoteById(req.params.id);
    if (!note) {
      throw new AppError(404, 'Note not found');
    }
    res.json(note);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a new text note
 *     description: Create a new text note for a patient
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTextNoteRequest'
 *     responses:
 *       201:
 *         description: Note created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Internal server error
 */
router.post(
  '/',
  [
    body('patientId').notEmpty().withMessage('Patient ID is required'),
    body('content').notEmpty().withMessage('Content is required'),
  ],
  validateRequest,
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const note = await noteService.createTextNote(req.body);
      res.status(201).json(note);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /notes/audio:
 *   post:
 *     summary: Upload an audio note
 *     description: Create a new note with an audio file for a patient
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - patientId
 *               - audio
 *             properties:
 *               patientId:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the patient
 *               audio:
 *                 type: string
 *                 format: binary
 *                 description: The audio file (MP3, WAV, etc.)
 *     responses:
 *       201:
 *         description: Audio note created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Invalid request or missing audio file
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Internal server error
 */
router.post(
  '/audio',
  upload.single('audio'),
  [
    body('patientId').notEmpty().withMessage('Patient ID is required'),
  ],
  validateRequest,
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let tempFilePath: string | undefined;
    
    try {
      if (!req.file) {
        throw new AppError(400, 'Audio file is required');
      }

      const uploadsDir = '/tmp/uploads';
      await fs.promises.mkdir(uploadsDir, { recursive: true });
      tempFilePath = `${uploadsDir}/${Date.now()}-${req.file.originalname}`;
      
      await fs.promises.writeFile(tempFilePath, req.file.buffer);
      
      await fs.promises.access(tempFilePath, fs.constants.F_OK);

      const note = await noteService.createAudioNote(
        req.body.patientId,
        tempFilePath
      );

      res.status(201).json(note);
    } catch (error) {
      // If there's an error, try to clean up the temp file
      if (tempFilePath) {
        await fs.promises.unlink(tempFilePath).catch(err => 
          logger.warn(`Failed to delete temporary file ${tempFilePath}:`, err)
        );
      }
      next(error);
    }
  }
);

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Delete a note
 *     description: Delete a specific note by its ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the note to delete
 *     responses:
 *       204:
 *         description: Note deleted successfully
 *       404:
 *         description: Note not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const success = await noteService.deleteNote(req.params.id);
    if (!success) {
      throw new AppError(404, 'Note not found');
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export { router as noteRoutes }; 