import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminWebsiteController } from './controllers/admin-website.controller';
import { PublicWebsiteController } from './controllers/public-website.controller';
import { RootWebsiteController } from './controllers/root-website.controller';
import { WebsiteController } from './controllers/website.controller';
import { WebsiteEntity } from './entities/website.entity';
import { WebsiteNotExistsValidator } from './validators/website-not-exists.validator';
import { WebsiteService } from './website.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([WebsiteEntity])],
  controllers: [WebsiteController, RootWebsiteController, PublicWebsiteController, AdminWebsiteController],
  providers: [WebsiteService, WebsiteNotExistsValidator],
  exports: [WebsiteService],
})
export class WebsiteModule {}
