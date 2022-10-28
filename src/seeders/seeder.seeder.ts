import { TypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';
import { DatabaseModule } from 'src/configs/database/database.module';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { WebsiteSeeder } from './website.seeder';

seeder({
  imports: [DatabaseModule, TypeOrmModule.forFeature([WebsiteEntity])],
}).run([WebsiteSeeder]);
