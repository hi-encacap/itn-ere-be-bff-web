import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudflareModule } from '../cloudflare/cloudflare.module';
import { PublicWebsiteConfigController } from './controllers/public-website-config.controller';
import { WebsiteConfigEntity } from './entities/website-config,entity';
import { WebsiteConfigService } from './services/website-config.service';

@Module({
  imports: [TypeOrmModule.forFeature([WebsiteConfigEntity]), CloudflareModule],
  controllers: [PublicWebsiteConfigController],
  providers: [WebsiteConfigService],
})
export class ConfigModule {}
