import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from 'src/configs/app/config.module';
import { CloudflareConfigModule } from 'src/configs/cloudflare/cloudflare-config.module';
import { CloudflareConfigService } from 'src/configs/cloudflare/cloudflare-config.service';
import { MemCachingProviderModule } from 'src/providers/mem-caching/mem-caching.module';
import { WebsiteNotExistsValidator } from '../website/validators/website-not-exists.validator';
import { WebsiteModule } from '../website/website.module';
import { ImageConsumer } from './consumers/image.consumer';
import { AdminImageController } from './controllers/admin-image.controller';
import { ImageController } from './controllers/image.controller';
import { RootImageVariantController } from './controllers/root-image-variant.controller';
import { ImageVariantEntity } from './entities/image-variant.entity';
import { ImageEntity } from './entities/image.entity';
import { ImageVariantService } from './services/image-variant.service';
import { ImageService } from './services/image.service';
import { ImageNotExistsValidator } from './validators/image-not-exists.validator';
import { ImageVariantCannotDeleteValidator } from './validators/image-variant-cannot-delete.validator';
import { ImageVariantExistsValidator } from './validators/image-variant-exists.validator';
import { ImageVariantNotExistsValidator } from './validators/image-variant-not-exists.validator';

@Module({
  imports: [
    TypeOrmModule.forFeature([ImageVariantEntity, ImageEntity]),
    BullModule.registerQueue({
      name: 'image',
    }),
    HttpModule.registerAsync({
      imports: [CloudflareConfigModule],
      useFactory: (cloudflareConfigService: CloudflareConfigService) => ({
        baseURL: cloudflareConfigService.image.url,
        headers: {
          Authorization: `Bearer ${cloudflareConfigService.image.token}`,
        },
      }),
      inject: [CloudflareConfigService],
    }),
    AppConfigModule,
    MemCachingProviderModule,
    WebsiteModule,
    CloudflareConfigModule,
  ],
  controllers: [RootImageVariantController, ImageController, AdminImageController],
  providers: [
    ImageVariantService,
    ImageService,

    ImageConsumer,

    ImageVariantExistsValidator,
    ImageVariantNotExistsValidator,
    ImageVariantCannotDeleteValidator,
    ImageNotExistsValidator,

    WebsiteNotExistsValidator,
  ],
  exports: [ImageVariantService, ImageService, ImageNotExistsValidator],
})
export class CloudflareModule {}
