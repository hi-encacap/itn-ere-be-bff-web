import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class GHNConfigService {
  constructor(private readonly configService: ConfigService) {}

  get apiToken() {
    return this.configService.get<string>('apiToken');
  }

  get apiUrl() {
    return this.configService.get<string>('apiUrl');
  }
}
