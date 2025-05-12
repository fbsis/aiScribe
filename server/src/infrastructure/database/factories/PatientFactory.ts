import { Patient } from '../entities/Patient';
import { faker } from '@faker-js/faker';

export default class PatientFactory {
  async make(): Promise<Patient> {
    const patient = new Patient();
    
    patient.name = faker.person.fullName();
    patient.dob = faker.date.birthdate({ min: 0, max: 100, mode: 'age' });
    
    return patient;
  }
} 