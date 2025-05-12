import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Patient } from '../infrastructure/database/entities/Patient';
import { faker } from '@faker-js/faker';

export default class PatientSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(Patient);

    // Generate 20 random patients
    const patients = Array.from({ length: 20 }, () => ({
      name: faker.person.fullName(),
      dob: faker.date.birthdate({ min: 0, max: 100, mode: 'age' }),
    }));

    for (const data of patients) {
      // Check if patient with this name already exists
      const exists = await repo.findOneBy({ name: data.name });
      if (!exists) {
        const patient = repo.create(data);
        await repo.save(patient);
        console.log(`✅ Created patient: ${data.name}`);
      } else {
        console.log(`⏭️  Patient already exists: ${data.name}`);
      }
    }

    console.log('✨ Patient seeding completed');
  }
} 