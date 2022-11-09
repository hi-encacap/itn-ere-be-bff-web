import { ConsoleLogger as NestConsoleLoggerService } from '@nestjs/common';
import dayjs from 'dayjs';
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
  error(message: unknown, stack?: unknown, ...rest: unknown[]): string {
    const logTrackingCode = this.getLogTrackingCode();

    if (stack) {
      super.error(`[${logTrackingCode}] ${message || ''}`, stack, ...rest);
    } else {
      super.error(`[${logTrackingCode}] ${message || ''}`, ...rest);
    }

    // Write to file
    this.logger.error(`[${logTrackingCode}] ${message || ''}`, stack, ...rest);

    return logTrackingCode;
  }

  private readonly getLogTrackingCode = (): string => {
    return `${dayjs().format('YYMMDD')}T${dayjs().format('HHmmss')}`;
  };
}
