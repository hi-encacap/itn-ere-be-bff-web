import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import Joi from 'joi';
import DatabaseConfigService from './database-config.service';
import databaseConfiguration from './database.configuration';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
      isGlobal: true,
      load: [databaseConfiguration],
      validationSchema: Joi.object({
        DB_TYPE: Joi.string().required().valid('postgres').default('postgres'),
        DB_HOST: Joi.string().required().default('localhost'),
        DB_PORT: Joi.number().required().default(5432),
        DB_USERNAME: Joi.string().required().default('postgres'),
        DB_PASSWORD: Joi.string().required().default('postgres'),
        DB_NAME: Joi.string().required().default('postgres'),
        REDIS_HOST: Joi.string().required().default('localhost'),
        REDIS_PORT: Joi.number().required().default(6379),
      }),
    }),
  ],
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigService],
})
export class DatabaseConfigModule {}
