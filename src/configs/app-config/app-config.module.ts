import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import appConfiguration from './app.configuration';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
      isGlobal: true,
      load: [appConfiguration],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        MONGO_URL: Joi.string().required(),
      }),
    }),
  ],
  exports: [NestConfigModule],
})
export class AppConfigModule {}
