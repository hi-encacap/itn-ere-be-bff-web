import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    let errorField = null;

    if (status === HttpStatus.UNPROCESSABLE_ENTITY) {
      errorField = exception.getResponse();
    }

    response.status(status).json({
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
    });
  }
}
