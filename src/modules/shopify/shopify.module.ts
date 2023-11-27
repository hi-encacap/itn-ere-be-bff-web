import { ShopifyConfigModule } from '@configs/shopify/shopify-config.module';
import ShopifyConfigService from '@configs/shopify/shopify-config.service';
import { ConfigModule } from '@modules/configs/config.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AdminShopifyController } from './controllers/admin-shopify.controller';
import { PublicShopifyController } from './controllers/public-shopify.controller';
import { ShopifyStaffService } from './services/shopify-staff.service';
import { ShopifyService } from './services/shopify.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ShopifyConfigModule],
      useFactory: (configService: ShopifyConfigService) => ({
        baseURL: configService.adminBaseURL,
        headers: {
          'X-Shopify-Access-Token': configService.adminAPIKey,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
      inject: [ShopifyConfigService],
    }),
    ConfigModule,
  ],
  controllers: [PublicShopifyController, AdminShopifyController],
  providers: [ShopifyService, ShopifyStaffService],
  exports: [ShopifyService],
})
export class ShopifyModule {}
