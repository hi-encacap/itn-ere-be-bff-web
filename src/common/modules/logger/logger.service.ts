import { ConsoleLogger as NestConsoleLoggerService } from '@nestjs/common';
import dayjs from 'dayjs';
import { randomStringPrefix } from 'src/common/utils/helpers.util';
import winston, { Logger } from 'winston';

export class LoggerService extends NestConsoleLoggerService {
  private readonly logger: Logger;

  constructor(readonly context: string) {
    super();

    this.logger = winston.createLogger({
      level: 'error',
      format: winston.format.combine(
        winston.format.splat(),
        winston.format.printf(({ level, message }) => {
          return `${dayjs().format('DD/MM/YYYY, HH:mm:ss')} - ${level.toUpperCase()} [${context}] ${message}`;
        }),
      ),
      defaultMeta: { service: 'user-service' },
      transports: [new winston.transports.File({ filename: './logs/development.log' })],
    });
  }

  error(message: unknown, stack?: string, context?: string): string;
  error(message: unknown, ...optionalParams: unknown[]): string;
  error(message: unknown, stack?: unknown): string {
    const logTrackingCode = randomStringPrefix();
    const errorMessage = this.getErrorMessage(message, stack);

    super.error(`[${logTrackingCode}] ${errorMessage}`);

    // Write to file
    this.logger.error(`[${logTrackingCode}] ${errorMessage}`);

    return logTrackingCode;
  }

  private readonly getErrorMessage = (message: unknown, stack?: unknown): string => {
    if (typeof message === 'string') {
      return message;
    }

    if (message instanceof Error) {
      return message.stack;
    }

    if (stack) {
      return stack.toString();
    }

    return '';
  };
}
