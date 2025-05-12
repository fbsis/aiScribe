import { Router, Request, Response } from 'express';
import { PatientService } from '../../application/services/patientService';
import { logger } from '../../shared/utils/logger';
import { authMiddleware } from '../middlewares/authMiddleware';
import { AppDataSource } from '../../infrastructure/database/config';

const router = Router();
const patientService = new PatientService(AppDataSource);

/**
 * @swagger
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       required:
 *         - name
 *         - dob
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated id of the patient
 *         name:
 *           type: string
 *           description: The patient's full name
 *         dob:
 *           type: string
 *           format: date
 *           description: The patient's date of birth
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the patient was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the patient was last updated
 *     CreatePatientRequest:
 *       type: object
 *       required:
 *         - name
 *         - dob
 *       properties:
 *         name:
 *           type: string
 *           description: The patient's full name
 *         dob:
 *           type: string
 *           format: date
 *           description: The patient's date of birth
 *     UpdatePatientRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The patient's full name
 *         dob:
 *           type: string
 *           format: date
 *           description: The patient's date of birth
 */

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: Patient management endpoints
 */

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Get all patients
 *     description: Retrieve a list of all patients
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of patients retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Patient'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const patients = await patientService.getAllPatients();
    res.json(patients);
  } catch (error) {
    logger.error('Error getting patients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /patients/{id}:
 *   get:
 *     summary: Get a patient by ID
 *     description: Retrieve a single patient by their ID
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: Patient retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const patient = await patientService.getPatientById(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    logger.error('Error getting patient:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /patients:
 *   post:
 *     summary: Create a new patient
 *     description: Create a new patient record
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePatientRequest'
 *     responses:
 *       201:
 *         description: Patient created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { name, dob } = req.body;
    const patient = await patientService.createPatient({ name, dob: new Date(dob) });
    res.status(201).json(patient);
  } catch (error) {
    logger.error('Error creating patient:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /patients/{id}:
 *   put:
 *     summary: Update a patient
 *     description: Update an existing patient's information
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Patient ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePatientRequest'
 *     responses:
 *       200:
 *         description: Patient updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { name, dob } = req.body;
    const updateData: { name?: string; dob?: Date } = {};
    if (name) updateData.name = name;
    if (dob) updateData.dob = new Date(dob);
    
    const patient = await patientService.updatePatient(req.params.id, updateData);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    logger.error('Error updating patient:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /patients/{id}:
 *   delete:
 *     summary: Delete a patient
 *     description: Delete a patient record
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Patient ID
 *     responses:
 *       204:
 *         description: Patient deleted successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const success = await patientService.deletePatient(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.status(204).send();
  } catch (error) {
    logger.error('Error deleting patient:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as patientRoutes }; 