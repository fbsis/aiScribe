import { Router } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validateRequest';
import { NoteService } from '../../application/services/noteService';
import { AppError } from '../middlewares/errorHandler';
import multer from 'multer';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { StorageService } from '@/infrastructure/storage/StorageService';
import { AIService } from '@/infrastructure/external/AIService';

const router = Router();
const prisma = new PrismaClient();
const storageService = new StorageService();
const aiService = new AIService();
const noteService = new NoteService(prisma, storageService, aiService);
const upload = multer({ storage: multer.memoryStorage() });

// Get all notes for a patient
router.get('/patient/:patientId', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const notes = await noteService.getNotesByPatientId(req.params.patientId);
    res.json(notes);
  } catch (error) {
    next(error);
  }
});

// Get note by ID
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

// Create new text note
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

// Upload audio note
router.post(
  '/audio',
  upload.single('audio'),
  [
    body('patientId').notEmpty().withMessage('Patient ID is required'),
  ],
  validateRequest,
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      if (!req.file) {
        throw new AppError(400, 'Audio file is required');
      }
      const fileLocate = req.file.path;
      const note = await noteService.createAudioNote(
        req.body.patientId,
        fileLocate
      );
      res.status(201).json(note);
    } catch (error) {
      next(error);
    }
  }
);

// Delete note
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