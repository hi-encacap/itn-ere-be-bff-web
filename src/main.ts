import { UnprocessableEntityException, ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import { readFileSync } from 'fs';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { LoggerService } from './common/modules/logger/logger.service';
import AppConfigService from './configs/config.service';

async function bootstrap() {
  try {
    const httpsOptions = {
      key: readFileSync(__dirname + '/../.certs/encacap.com.key'),
      cert: readFileSync(__dirname + '/../.certs/encacap.com.crt'),
    };

    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      httpsOptions,
    });
    const httpAdapter = app.get(HttpAdapterHost);
    const configService = app.get(AppConfigService);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.enableCors({
      origin: ['https://dev.dashboard.re.encacap.com:3012'],
      credentials: true,
    });

    app.useLogger(app.get(LoggerService));

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

    await app.listen(configService.port);
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
