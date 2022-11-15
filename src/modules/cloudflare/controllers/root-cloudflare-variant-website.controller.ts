import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RootGuard } from 'src/common/guards/root.guard';
import { RootCreateCloudflareVariantWebsiteDto } from '../dto/root-create-cloudflare-variant-website.dto';
import { CloudflareVariantWebsiteService } from '../services/cloudflare-variant-website.service';

@Controller('root/cloudflare/website-variants')
@UseGuards(JwtAuthGuard, RootGuard)
export class RootCloudflareVariantWebsiteController {
  constructor(private readonly cloudflareVariantWebsiteService: CloudflareVariantWebsiteService) {}

  @Post()
  createWebsiteVariant(@Body() body: RootCreateCloudflareVariantWebsiteDto) {
    return this.cloudflareVariantWebsiteService.createWebsiteVariant(body);
  }

  @Get()
  getWebsiteVariants() {
    return this.cloudflareVariantWebsiteService.getAll({});
  }
}
