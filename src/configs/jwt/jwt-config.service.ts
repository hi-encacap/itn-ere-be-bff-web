import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigService {
  constructor(private readonly configService: ConfigService) {}

  get secret() {
    return this.configService.get<string>('secret');
  }

  get authExpirationMinutes() {
    return this.configService.get<number>('signOptions.authExpirationMinutes');
  }

  get refreshExpirationDays() {
    return this.configService.get<number>('signOptions.refreshExpirationDays');
  }
}
