import { MigrationInterface, QueryRunner } from "typeorm";
import { faker } from '@faker-js/faker';

export class SeedRandomPatients1715531234568 implements MigrationInterface {
    name = 'SeedRandomPatients1715531234568'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Generate 5 random patients
        const patients = Array.from({ length: 5 }, () => ({
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            dob: faker.date.birthdate({ min: 0, max: 100, mode: 'age' }).toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }));

        // Insert patients
        for (const patient of patients) {
            await queryRunner.query(`
                INSERT INTO "patients" ("id", "name", "dob", "created_at", "updated_at")
                VALUES ($1, $2, $3, $4, $5)
            `, [
                patient.id,
                patient.name,
                patient.dob,
                patient.created_at,
                patient.updated_at
            ]);
        }

        // Log created patients
        console.log('✅ Patients created:');
        patients.forEach(patient => {
            console.log(`- ${patient.name} (${new Date(patient.dob).toLocaleDateString('en-US')})`);
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove created patients
        await queryRunner.query(`
            DELETE FROM "patients"
            WHERE "created_at" >= NOW() - INTERVAL '1 minute'
        `);
    }
} 