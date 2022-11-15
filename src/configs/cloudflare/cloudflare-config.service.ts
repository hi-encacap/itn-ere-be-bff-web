import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudflareConfigService {
  constructor(private readonly configService: ConfigService) {}

  get images() {
    return {
      token: this.configService.get<string>('token.images'),
      url: this.configService.get<string>('url.images'),
    };
  }
}
