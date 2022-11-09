import { ConsoleLogger as NestConsoleLoggerService } from '@nestjs/common';
import dayjs from 'dayjs';

export class LoggerService extends NestConsoleLoggerService {
  error(message: any, stack?: string, context?: string): string;
  error(message: any, ...optionalParams: any[]): string;
  error(message: unknown, stack?: unknown, ...rest: unknown[]): string {
    const logTrackingCode = this.getLogTrackingCode();

    if (stack) {
      super.error(`[${logTrackingCode}] ${message}`, stack, ...rest);
    } else {
      super.error(`[${logTrackingCode}] ${message}`, ...rest);
    }

    return logTrackingCode;
  }

  private readonly getLogTrackingCode = (): string => {
    return `${dayjs().format('YYMMDD')}T${dayjs().format('HHmmss')}`;
  };
}
