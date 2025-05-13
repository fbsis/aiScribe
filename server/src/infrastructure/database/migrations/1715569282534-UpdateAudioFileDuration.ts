import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAudioFileDuration1715569282534 implements MigrationInterface {
    name = 'UpdateAudioFileDuration1715569282534'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // First, update any null durations to 0
        await queryRunner.query(`UPDATE "audio_files" SET "duration" = 0 WHERE "duration" IS NULL`);
        
        // Then alter the column to be NOT NULL and float type
        await queryRunner.query(`ALTER TABLE "audio_files" ALTER COLUMN "duration" TYPE double precision USING "duration"::double precision`);
        await queryRunner.query(`ALTER TABLE "audio_files" ALTER COLUMN "duration" SET NOT NULL`);

        // Add cascade delete to the relationship
        await queryRunner.query(`ALTER TABLE "audio_files" DROP CONSTRAINT IF EXISTS "FK_b15ffdd3983c9a039234905e805"`);
        await queryRunner.query(`ALTER TABLE "audio_files" ADD CONSTRAINT "FK_b15ffdd3983c9a039234905e805" FOREIGN KEY ("noteId") REFERENCES "notes"("id") ON DELETE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove cascade delete
        await queryRunner.query(`ALTER TABLE "audio_files" DROP CONSTRAINT IF EXISTS "FK_b15ffdd3983c9a039234905e805"`);
        await queryRunner.query(`ALTER TABLE "audio_files" ADD CONSTRAINT "FK_b15ffdd3983c9a039234905e805" FOREIGN KEY ("noteId") REFERENCES "notes"("id")`);

        // Revert duration column to nullable
        await queryRunner.query(`ALTER TABLE "audio_files" ALTER COLUMN "duration" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "audio_files" ALTER COLUMN "duration" TYPE integer USING "duration"::integer`);
    }
} 