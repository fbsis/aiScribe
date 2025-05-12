import { DataSource } from 'typeorm';
import { Patient } from '../entities/Patient';
import { faker } from '@faker-js/faker';

export async function seedPatients(dataSource: DataSource): Promise<void> {
  const patientRepository = dataSource.getRepository(Patient);
  
  // Create 10 random patients
  const patients = Array.from({ length: 10 }, () => {
    const patient = new Patient();
    patient.name = faker.person.fullName();
    patient.dob = faker.date.birthdate({ min: 0, max: 100, mode: 'age' });
    return patient;
  });

  // Save all patients
  await patientRepository.save(patients);
  console.log('✅ Patients seeded successfully');
} 