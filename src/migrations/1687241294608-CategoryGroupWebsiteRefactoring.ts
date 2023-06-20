import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategoryGroupWebsiteRefactoring1687241294608 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "category_group_websites"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category_group_websites" ("category_group_id" uuid NOT NULL, "website_id" uuid NOT NULL, CONSTRAINT "PK_7e2c2f1b8d7c8e3f3f3e2f5f6a4" PRIMARY KEY ("category_group_id", "website_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_group_websites" ADD CONSTRAINT "FK_1c7b0c1b1c2a5b1e3f9b4f5e8a8" FOREIGN KEY ("category_group_id") REFERENCES "category_group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_group_websites" ADD CONSTRAINT "FK_9b7c0f7d1b9d0e0b3c4d7e4d3e0" FOREIGN KEY ("website_id") REFERENCES "website"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
