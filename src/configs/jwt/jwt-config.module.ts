import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { JwtConfigService } from './jwt-config.service';
import jwtConfiguration from './jwt.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      isGlobal: true,
      load: [jwtConfiguration],
      validationSchema: Joi.object({
        RE_API_APP_JWT_SECRET: Joi.string().required(),
        RE_API_APP_JWT_EXPIRATION_MINUTES: Joi.number().required(),
        RE_API_APP_JWT_REFRESH_EXPIRATION_DAYS: Joi.number().required(),
      }),
    }),
  ],
  providers: [JwtConfigService],
  exports: [JwtConfigService],
})
export class JwtConfigModule {}
