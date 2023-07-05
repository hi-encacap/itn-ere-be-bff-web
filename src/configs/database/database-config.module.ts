import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import Joi from 'joi';
import DatabaseConfigService from './database-config.service';
import databaseConfiguration from './database.configuration';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      isGlobal: true,
      load: [databaseConfiguration],
      validationSchema: Joi.object({
        RE_API_DB_TYPE: Joi.string().required().valid('postgres').default('postgres'),
        DB_POSTGRES_HOST: Joi.string().required().default('localhost'),
        DB_POSTGRES_PORT: Joi.number().required().default(5432),
        DB_POSTGRES_USERNAME: Joi.string().required().default('postgres'),
        DB_POSTGRES_PASSWORD: Joi.string().required().default('postgres'),
        DB_POSTGRES_NAME: Joi.string().required().default('postgres'),
        DB_REDIS_HOST: Joi.string().required().default('localhost'),
        DB_REDIS_PORT: Joi.number().required().default(6379),
        DB_REDIS_USERNAME: Joi.string().allow(''),
        DB_REDIS_PASSWORD: Joi.string().allow(''),
        DB_REDIS_DATABASE: Joi.number().required().default(0),
      }),
    }),
  ],
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigService],
})
export class DatabaseConfigModule {}
