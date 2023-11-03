import { WebsiteApiKeyGuard } from '@guards/website-api-key.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ShopifyService } from '../services/shopify.service';

@Controller('shopifies')
@UseGuards(WebsiteApiKeyGuard)
export class PublicShopifyController {
  constructor(private readonly shopifyService: ShopifyService) {}

  @Get('products')
  getProducts() {
    return this.shopifyService.getProducts();
  }
}
