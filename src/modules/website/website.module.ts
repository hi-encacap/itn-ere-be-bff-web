import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicWebsiteController } from './controllers/public-website.controller';
import { WebsiteController } from './controllers/website.controller';
import { WebsiteEntity } from './entities/website.entity';
import { WebsiteNotExistsValidator } from './validators/website-not-exists.validator';
import { WebsiteService } from './website.service';

@Module({
  imports: [TypeOrmModule.forFeature([WebsiteEntity])],
  controllers: [WebsiteController, PublicWebsiteController],
  providers: [WebsiteService, WebsiteNotExistsValidator],
  exports: [WebsiteService],
})
export class WebsiteModule {}
