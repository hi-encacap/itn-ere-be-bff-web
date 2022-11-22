import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudflareConfigModule } from 'src/configs/cloudflare/cloudflare-config.module';
import { CloudflareConfigService } from 'src/configs/cloudflare/cloudflare-config.service';
import { WebsiteNotExistsValidator } from '../website/validators/website-not-exists.validator';
import { WebsiteModule } from '../website/website.module';
import { CloudflareImageConsumer } from './consumers/cloudflare-image.consumer';
import { AdminCloudflareImageController } from './controllers/admin-cloudflare-image.controller';
import { RootCloudflareVariantWebsiteController } from './controllers/root-cloudflare-variant-website.controller';
import { RootCloudflareVariantController } from './controllers/root-cloudflare-variant.controller';
import { CloudflareImageEntity } from './entities/cloudflare-image.entity';
import { CloudflareVariantWebsiteEntity } from './entities/cloudflare-variant-website.entity';
import { CloudflareVariantEntity } from './entities/cloudflare-variant.entity';
import { CloudflareImageService } from './services/cloudflare-image.service';
import { CloudflareVariantWebsiteService } from './services/cloudflare-variant-website.service';
import { CloudflareVariantService } from './services/cloudflare-variant.service';
import { CloudflareImageNotExistsValidator } from './validators/cloudflare-image-not-exists.validator';
import { CloudflareVariantCannotDeleteValidator } from './validators/cloudflare-variant-cannot-delete.validator';
import { CloudflareVariantExistsValidator } from './validators/cloudflare-variant-exists.validator';
import { CloudflareVariantNotExistsValidator } from './validators/cloudflare-variant-not-exists.validator';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CloudflareVariantEntity,
      CloudflareVariantWebsiteEntity,
      CloudflareImageEntity,
    ]),
    BullModule.registerQueue({
      name: 'cloudflare-image',
    }),
    HttpModule.registerAsync({
      imports: [CloudflareConfigModule],
      useFactory: (cloudflareConfigService: CloudflareConfigService) => ({
        baseURL: cloudflareConfigService.images.url,
        headers: {
          Authorization: `Bearer ${cloudflareConfigService.images.token}`,
        },
      }),
      inject: [CloudflareConfigService],
    }),
    WebsiteModule,
    CloudflareConfigModule,
  ],
  controllers: [
    RootCloudflareVariantController,
    RootCloudflareVariantWebsiteController,
    AdminCloudflareImageController,
  ],
  providers: [
    CloudflareVariantService,
    CloudflareVariantWebsiteService,
    CloudflareImageService,

    CloudflareImageConsumer,

    CloudflareVariantExistsValidator,
    CloudflareVariantNotExistsValidator,
    CloudflareVariantCannotDeleteValidator,
    CloudflareImageNotExistsValidator,

    WebsiteNotExistsValidator,
  ],
  exports: [
    CloudflareVariantService,
    CloudflareVariantWebsiteService,
    CloudflareImageService,
    CloudflareImageNotExistsValidator,
  ],
})
export class CloudflareModule {}
