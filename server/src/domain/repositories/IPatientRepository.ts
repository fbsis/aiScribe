import { Patient } from '../entities/Patient';

export interface IPatientRepository {
  findAll(): Promise<Patient[]>;
  findById(id: string): Promise<Patient | null>;
  create(patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>): Promise<Patient>;
  update(id: string, patient: Partial<Patient>): Promise<Patient | null>;
  delete(id: string): Promise<boolean>;
} 