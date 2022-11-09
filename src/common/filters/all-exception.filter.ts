import { ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { HttpAdapterHost } from '@nestjs/core';
import { LoggerService } from '../modules/logger/logger.service';

@Catch()
export class AllExceptionFilter {
  private readonly logger = new LoggerService(AllExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let errorTrackingCode = '0';

    const responseBody = this.getResponseBody(exception, ctx);

    if (exception instanceof HttpException) {
      const request = ctx.getRequest();

      const logMessage = {
        request: {
          method: request.method,
          url: request.url,
          headers: request.headers,
          body: request.body,
          query: request.query,
          params: request.params,
        },
        response: responseBody,
      };

      errorTrackingCode = this.logger.error(JSON.stringify(logMessage));
    }

    httpAdapter.reply(
      ctx.getResponse(),
      {
        ...responseBody,
        code: errorTrackingCode,
      },
      responseBody.error.code,
    );
  }

  private readonly getHttpExceptionResponseBody = (exception: HttpException, ctx: HttpArgumentsHost) => {
    const request = ctx.getRequest();
    const status = exception.getStatus();

    let errorField = null;

    if (status === HttpStatus.UNPROCESSABLE_ENTITY) {
      errorField = exception.getResponse();
    }

    return {
      message: 'Error',
      code: status,
      data: null,
      error: {
        code: status,
        message: exception.message,
        ...(errorField && { field: errorField }),
        path: request.url,
        timestamp: new Date().toISOString(),
      },
    };
  };

  private readonly getErrorExceptionResponseBody = (exception: Error) => {
    return {
      message: 'Error',
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      data: null,
      error: {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception.message,
        stack: exception.stack,
        timestamp: new Date().toISOString(),
      },
    };
  };

  private readonly getResponseBody = (exception: unknown, ctx: HttpArgumentsHost) => {
    if (exception instanceof HttpException) {
      return this.getHttpExceptionResponseBody(exception, ctx);
    }

    return this.getErrorExceptionResponseBody(exception as Error);
  };
}
