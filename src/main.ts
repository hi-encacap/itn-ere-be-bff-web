import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { LoggerService } from './common/modules/logger/logger.service';
import AppConfigService from './configs/config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const httpAdapter = app.get(HttpAdapterHost);
  const configService = app.get(AppConfigService);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors({
    origin: ['https://dashboard.baolocre.encacap.dev:4002'],
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
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(configService.port);
}
bootstrap();
