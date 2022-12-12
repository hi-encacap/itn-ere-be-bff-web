import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RootGuard } from 'src/common/guards/root.guard';
import { RootCloudflareVariantWebsiteCreateBodyDto } from '../dto/root-cloudflare-variant-website-create-body.dto';
import { RootCloudflareVariantWebsiteListQueryDto } from '../dto/root-cloudflare-variant-website-list-query.dto';
import { CloudflareVariantWebsiteService } from '../services/cloudflare-variant-website.service';

@Controller('root/cloudflare/website-variants')
@UseGuards(JwtAuthGuard, RootGuard)
export class RootCloudflareVariantWebsiteController {
  constructor(private readonly cloudflareVariantWebsiteService: CloudflareVariantWebsiteService) {}

  @Post()
  createWebsiteVariant(@Body() body: RootCloudflareVariantWebsiteCreateBodyDto) {
    return this.cloudflareVariantWebsiteService.createWebsiteVariant(body);
  }

  @Get()
  getWebsiteVariants(@Query() query: RootCloudflareVariantWebsiteListQueryDto) {
    return this.cloudflareVariantWebsiteService.getAll(query);
  }
}
