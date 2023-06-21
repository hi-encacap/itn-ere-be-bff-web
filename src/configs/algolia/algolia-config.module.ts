import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { AlgoliaConfigService } from './algolia-config.service';
import algoliaConfiguration from './algolia.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      isGlobal: true,
      load: [algoliaConfiguration],
      validationSchema: Joi.object({
        RE_API_ALGOLIA_APP_ID: Joi.string().required(),
        RE_API_ALGOLIA_API_KEY: Joi.string().required(),
      }),
      expandVariables: true,
    }),
  ],
  providers: [AlgoliaConfigService],
  exports: [AlgoliaConfigService],
})
export class AlgoliaConfigModule {}
