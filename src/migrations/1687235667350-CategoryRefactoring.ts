import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategoryRefactoring1687235667350 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('categories', 'thumbnail_id', 'avatar_id');
    await queryRunner.dropColumn('categories', 'parent_id');
    await queryRunner.query('ALTER TABLE "categories" ADD "left" integer');
    await queryRunner.query('ALTER TABLE "categories" ADD "right" integer');
    await queryRunner.query(
      'UPDATE "categories" SET "left" = 1, "right" = 2 WHERE "left" IS NULL AND "right" IS NULL',
    );
    await queryRunner.query('ALTER TABLE "categories" ALTER COLUMN "left" SET NOT NULL');
    await queryRunner.query('ALTER TABLE "categories" ALTER COLUMN "right" SET NOT NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('categories', 'avatar_id', 'thumbnail_id');
    await queryRunner.query('ALTER TABLE "categories" ADD "parent_id" uuid');
    await queryRunner.dropColumn('categories', 'left');
    await queryRunner.dropColumn('categories', 'right');
  }
}
