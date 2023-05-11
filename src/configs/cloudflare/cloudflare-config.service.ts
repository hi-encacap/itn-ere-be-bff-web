import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudflareConfigService {
  constructor(private readonly configService: ConfigService) {}

  get image() {
    return {
      token: this.configService.get<string>('cloudflare.token.image'),
      url: this.configService.get<string>('cloudflare.url.image'),
      delivery: this.configService.get<string>('cloudflare.url.deliveryImage'),
    };
  }
}
