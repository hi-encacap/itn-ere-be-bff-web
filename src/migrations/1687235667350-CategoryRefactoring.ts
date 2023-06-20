import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategoryRefactoring1687235667350 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "categories" RENAME COLUMN "thumbnail_id" TO "avatar"');
    await queryRunner.query('ALTER TABLE "categories" DROP COLUMN "parent_id"');
    await queryRunner.query('ALTER TABLE "categories" ADD "left" integer NOT NULL');
    await queryRunner.query('ALTER TABLE "categories" ADD "right" integer NOT NULL');
    await queryRunner.query(
      'UPDATE "categories" SET "left" = 1, "right" = 2 WHERE "left" IS NULL AND "right" IS NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "categories" RENAME COLUMN "avatar" TO "thumbnail_id"');
    await queryRunner.query('ALTER TABLE "categories" ADD "parent_id" uuid');
    await queryRunner.query('ALTER TABLE "categories" DROP COLUMN "left"');
    await queryRunner.query('ALTER TABLE "categories" DROP COLUMN "right"');
  }
}
