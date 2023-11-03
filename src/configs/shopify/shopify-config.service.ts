import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class ShopifyConfigService {
  constructor(private readonly configService: ConfigService) {}

  get adminBaseURL(): string {
    return this.configService.get<string>('shopify.adminBaseURL');
  }

  get adminAPIKey(): string {
    return this.configService.get<string>('shopify.adminAPIKey');
  }

  get apiKey(): string {
    return this.configService.get<string>('shopify.apiKey');
  }

  get secretKey(): string {
    return this.configService.get<string>('shopify.secretKey');
  }
}
