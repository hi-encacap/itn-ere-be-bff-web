import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsiteEntity } from './entities/website.entity';
import { WebsiteNotExistsValidator } from './validators/website-not-exists.validator';
import { WebsiteController } from './website.controller';
import { WebsiteService } from './website.service';

@Module({
  imports: [TypeOrmModule.forFeature([WebsiteEntity])],
  controllers: [WebsiteController],
  providers: [WebsiteService, WebsiteNotExistsValidator],
  exports: [WebsiteService],
})
export class WebsiteModule {}
