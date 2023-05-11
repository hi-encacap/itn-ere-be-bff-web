import { Logger, UnprocessableEntityException, ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import { existsSync, readFileSync } from 'fs';
import path from 'path';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import AppConfigService from './configs/app/config.service';

const getHttpsOptions = () => {
  const certPath = path.resolve(__dirname, '..', '.certs/encacap.com.crt');
  const keyPath = path.resolve(__dirname, '..', '.certs/encacap.com.key');

  if (!existsSync(certPath) || !existsSync(keyPath)) {
    return null;
  }

  return {
    key: readFileSync(keyPath),
    cert: readFileSync(certPath),
  };
};

const bootstrap = async () => {
  const httpsOptions = getHttpsOptions();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions,
  });
  const httpAdapter = app.get(HttpAdapterHost);
  const configService = app.get(AppConfigService);
  const loggerService = new Logger('NestApplication');

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableCors({
    origin: ['https://dev.dashboard.re.encacap.com:3012', 'https://dev.baolocre.encacap.com:3013'],
    credentials: true,
  });

  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory(errors) {
        const errorField = errors.reduce((errorField, error) => {
          const { property, constraints } = error;
          const errorMessages = Object.values(constraints);

          return {
            ...errorField,
            [property]: errorMessages,
          };
        }, {});

        return new UnprocessableEntityException(errorField);
      },
      forbidUnknownValues: true,
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Versioning
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  await app.listen(configService.port, configService.host);
  loggerService.debug(`Application is running on: ${await app.getUrl()}`);
};

bootstrap();
