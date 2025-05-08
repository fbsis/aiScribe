import { Router } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validateRequest';
import { PatientService } from '../../application/services/patientService';
import { AppError } from '../middlewares/errorHandler';
import express from 'express';
const router = Router();
const patientService = new PatientService();

// Get all patients
router.get('/', async (req, res, next) => {
  try {
    const patients = await patientService.getAllPatients();
    res.json(patients);
  } catch (error) {
    next(error);
  }
});

// Get patient by ID
router.get('/:id', async (req, res, next) => {
  try {
    const patient = await patientService.getPatientById(req.params.id);
    if (!patient) {
      throw new AppError(404, 'Patient not found');
    }
    res.json(patient);
  } catch (error) {
    next(error);
  }
});

// Create new patient
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('dob').isISO8601().withMessage('Invalid date of birth'),
  ],
  validateRequest,
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const patient = await patientService.createPatient(req.body);
      res.status(201).json(patient);
    } catch (error) {
      next(error);
    }
  }
);

// Update patient
router.put(
  '/:id',
  [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('dob').optional().isISO8601().withMessage('Invalid date of birth'),
  ],
  validateRequest,
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const patient = await patientService.updatePatient(req.params.id, req.body);
      if (!patient) {
        throw new AppError(404, 'Patient not found');
      }
      res.json(patient);
    } catch (error) {
      next(error);
    }
  }
);

// Delete patient
router.delete('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const success = await patientService.deletePatient(req.params.id);
    if (!success) {
      throw new AppError(404, 'Patient not found');
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export { router as patientRoutes }; 