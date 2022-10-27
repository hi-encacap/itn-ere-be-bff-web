import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsiteEntity } from './entities/website.entity';
import { WebsiteController } from './website.controller';
import { WebsiteService } from './website.service';

@Module({
  imports: [TypeOrmModule.forFeature([WebsiteEntity])],
  controllers: [WebsiteController],
  providers: [WebsiteService],
})
export class WebsiteModule {}
