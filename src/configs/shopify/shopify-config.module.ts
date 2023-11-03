import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import Joi from 'joi';
import ShopifyConfigService from './shopify-config.service';
import shopifyConfiguration from './shopify.configuration';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      isGlobal: true,
      load: [shopifyConfiguration],
      validationSchema: Joi.object({
        RE_API_SHOPIFY_BASE_URL: Joi.string().required(),
        RE_API_SHOPIFY_ADMIN_BASE_URL: Joi.string().required(),
        RE_API_SHOPIFY_ADMIN_API_KEY: Joi.string().required(),
        RE_API_SHOPIFY_API_KEY: Joi.string().required(),
        RE_API_SHOPIFY_SECRET_KEY: Joi.string().required(),
      }),
    }),
  ],
  providers: [ShopifyConfigService],
  exports: [ShopifyConfigService],
})
export class ShopifyConfigModule {}
