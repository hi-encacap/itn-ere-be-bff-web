import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import Joi from 'joi';
import GHNConfigService from './ghn-config.service';
import ghnConfiguration from './ghn.configuration';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
      isGlobal: true,
      load: [ghnConfiguration],
      validationSchema: Joi.object({
        GHN_API_TOKEN: Joi.string().required(),
        GHN_API_URL: Joi.string().required(),
      }),
    }),
  ],
  providers: [GHNConfigService],
  exports: [GHNConfigService],
})
export class GHNConfigModule {}
