import { MigrationInterface, QueryRunner } from 'typeorm';

export class CloudflareImageRefactoring1687325391265 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('cloudflare_images', 'images');
    await queryRunner.renameTable('cloudflare_variants', 'image_variants');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('images', 'cloudflare_images');
    await queryRunner.renameTable('image_variants', 'cloudflare_variants');
  }
}
