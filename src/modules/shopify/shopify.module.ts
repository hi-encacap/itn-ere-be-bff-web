import { ShopifyConfigModule } from '@configs/shopify/shopify-config.module';
import ShopifyConfigService from '@configs/shopify/shopify-config.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PublicShopifyController } from './controllers/public-shopify.controller';
import { ShopifyService } from './services/shopify.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ShopifyConfigModule],
      useFactory: (configService: ShopifyConfigService) => ({
        baseURL: configService.adminBaseURL,
        headers: {
          'X-Shopify-Access-Token': configService.adminAPIKey,
        },
      }),
      inject: [ShopifyConfigService],
    }),
  ],
  controllers: [PublicShopifyController],
  providers: [ShopifyService],
  exports: [ShopifyService],
})
export class ShopifyModule {}
