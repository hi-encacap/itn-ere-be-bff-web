import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    response.status(status).json({
      data: null,
      error: {
        code: status,
        message: exception.message,
        path: request.url,
        timestamp: new Date().toISOString(),
      },
    });
  }
}
