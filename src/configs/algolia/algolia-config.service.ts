import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AlgoliaConfigService {
  constructor(private readonly configService: ConfigService) {}

  get appID(): string {
    return this.configService.get('appID');
  }

  get apiKey(): string {
    return this.configService.get('apiKey');
  }
}
