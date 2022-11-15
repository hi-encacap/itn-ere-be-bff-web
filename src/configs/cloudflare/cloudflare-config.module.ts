import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { CloudflareConfigService } from './cloudflare-config.service';
import cloudflareConfiguration from './cloudflare-configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
      isGlobal: true,
      load: [cloudflareConfiguration],
      validationSchema: Joi.object({
        CLOUDFLARE_API_TOKEN: Joi.string().required(),
        CLOUDFLARE_ACCOUNT_ID: Joi.string().required(),
        CLOUDFLARE_IMAGE_URL: Joi.string().required(),
      }),
      expandVariables: true,
    }),
  ],
  providers: [CloudflareConfigService],
  exports: [CloudflareConfigService],
})
export class CloudflareConfigModule {}
