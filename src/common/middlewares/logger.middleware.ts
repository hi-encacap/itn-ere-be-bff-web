import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggerService } from '../modules/logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new LoggerService('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl: url } = request;

    response.on('close', () => {
      const { statusCode } = response;

      this.logger.log(`${method} ${url} ${ip} - ${statusCode}`);
    });

    next();
  }
}
