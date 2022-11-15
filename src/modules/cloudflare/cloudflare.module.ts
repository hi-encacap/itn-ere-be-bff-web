import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsiteNotExistsValidator } from '../website/validators/website-not-exists.validator';
import { WebsiteModule } from '../website/website.module';
import { RootCloudflareVariantWebsiteController } from './controllers/root-cloudflare-variant-website.controller';
import { RootCloudflareVariantController } from './controllers/root-cloudflare-variant.controller';
import { CloudflareVariantWebsiteEntity } from './entities/cloudflare-variant-website.entity';
import { CloudflareVariantEntity } from './entities/cloudflare-variant.entity';
import { CloudflareVariantWebsiteService } from './services/cloudflare-variant-website.service';
import { CloudflareVariantService } from './services/cloudflare-variant.service';
import { CloudflareVariantExistsValidator } from './validators/cloudflare-variant-exists.validator';
import { CloudflareVariantNotExistsValidator } from './validators/cloudflare-variant-not-exists.validator';

@Module({
  imports: [
    TypeOrmModule.forFeature([CloudflareVariantEntity, CloudflareVariantWebsiteEntity]),
    WebsiteModule,
  ],
  controllers: [RootCloudflareVariantController, RootCloudflareVariantWebsiteController],
  providers: [
    CloudflareVariantService,
    CloudflareVariantWebsiteService,

    CloudflareVariantExistsValidator,
    CloudflareVariantNotExistsValidator,
    WebsiteNotExistsValidator,
  ],
})
export class CloudflareModule {}
