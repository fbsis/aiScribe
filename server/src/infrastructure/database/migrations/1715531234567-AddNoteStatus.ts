import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNoteStatus1715531234567 implements MigrationInterface {
    name = 'AddNoteStatus1715531234567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Primeiro, criar o tipo enum
        await queryRunner.query(`
            CREATE TYPE "public"."note_status_enum" AS ENUM ('processing', 'done', 'error')
        `);

        // Adicionar as novas colunas
        await queryRunner.query(`
            ALTER TABLE "notes" 
            ADD COLUMN "status" "public"."note_status_enum" NOT NULL DEFAULT 'processing',
            ADD COLUMN "error_message" text
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover as colunas
        await queryRunner.query(`
            ALTER TABLE "notes" 
            DROP COLUMN "status",
            DROP COLUMN "error_message"
        `);

        // Remover o tipo enum
        await queryRunner.query(`
            DROP TYPE "public"."note_status_enum"
        `);
    }
} 