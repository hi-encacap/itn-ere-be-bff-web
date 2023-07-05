import { MigrationInterface, QueryRunner } from 'typeorm';

export class WebsiteConfigRefactoring1687489472025 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('website_configs', 'group');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "website_configs" ADD "group" character varying(255) NOT NULL');
  }
}
