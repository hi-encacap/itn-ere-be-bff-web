import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminConfigController } from './controllers/admin-config.controller';
import { WebsiteConfigController } from './controllers/website-config.controller';
import { ConfigWebsiteEntity } from './entities/config-website.entity';
import { ConfigEntity } from './entities/config.entity';
import { ConfigWebsiteService } from './services/config-website.service';
import { ConfigService } from './services/config.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConfigEntity, ConfigWebsiteEntity])],
  controllers: [AdminConfigController, WebsiteConfigController],
  providers: [ConfigService, ConfigWebsiteService],
})
export class ConfigModule {}
