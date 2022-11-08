import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get rootPassword() {
    return this.configService.get<string>('rootPassword');
  }
}
