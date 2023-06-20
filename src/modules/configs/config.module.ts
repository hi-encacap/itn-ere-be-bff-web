import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudflareModule } from '../image/cloudflare.module';
import { AdminWebsiteConfigController } from './controllers/admin-website-config.controller';
import { PublicWebsiteConfigController } from './controllers/public-website-config.controller';
import { WebsiteConfigEntity } from './entities/website-config,entity';
import { WebsiteConfigService } from './services/website-config.service';
import { WebsiteConfigExistsValidator } from './validators/website-config-exists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([WebsiteConfigEntity]), CloudflareModule],
  controllers: [PublicWebsiteConfigController, AdminWebsiteConfigController],
  providers: [WebsiteConfigService, WebsiteConfigExistsValidator],
})
export class ConfigModule {}
