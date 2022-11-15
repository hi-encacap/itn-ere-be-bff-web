import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudflareConfigModule } from 'src/configs/cloudflare/cloudflare-config.module';
import { CloudflareConfigService } from 'src/configs/cloudflare/cloudflare-config.service';
import { WebsiteNotExistsValidator } from '../website/validators/website-not-exists.validator';
import { WebsiteModule } from '../website/website.module';
import { RootCloudflareVariantWebsiteController } from './controllers/root-cloudflare-variant-website.controller';
import { RootCloudflareVariantController } from './controllers/root-cloudflare-variant.controller';
import { CloudflareVariantWebsiteEntity } from './entities/cloudflare-variant-website.entity';
import { CloudflareVariantEntity } from './entities/cloudflare-variant.entity';
import { CloudflareVariantWebsiteService } from './services/cloudflare-variant-website.service';
import { CloudflareVariantService } from './services/cloudflare-variant.service';
import { CloudflareVariantCannotDeleteValidator } from './validators/cloudflare-variant-cannot-delete.validator';
import { CloudflareVariantExistsValidator } from './validators/cloudflare-variant-exists.validator';
import { CloudflareVariantNotExistsValidator } from './validators/cloudflare-variant-not-exists.validator';

@Module({
  imports: [
    TypeOrmModule.forFeature([CloudflareVariantEntity, CloudflareVariantWebsiteEntity]),
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
  ],
  controllers: [RootCloudflareVariantController, RootCloudflareVariantWebsiteController],
  providers: [
    CloudflareVariantService,
    CloudflareVariantWebsiteService,

    CloudflareVariantExistsValidator,
    CloudflareVariantNotExistsValidator,
    CloudflareVariantCannotDeleteValidator,
    WebsiteNotExistsValidator,
  ],
})
export class CloudflareModule {}
