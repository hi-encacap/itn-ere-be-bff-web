import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RootGuard } from 'src/common/guards/root.guard';
import { RootCreateCloudflareVariantDto } from '../dto/root-create-cloudflare-variant.dto';
import { CloudflareVariantService } from '../services/cloudflare-variant.service';

@Controller('root/cloudflare/variants')
@UseGuards(JwtAuthGuard, RootGuard)
export class RootCloudflareVariantController {
  constructor(private readonly cloudflareVariantService: CloudflareVariantService) {}

  @Post()
  createVariant(@Body() body: RootCreateCloudflareVariantDto) {
    return this.cloudflareVariantService.createVariant(body);
  }

  @Get()
  getVariants() {
    return this.cloudflareVariantService.getAll({});
  }
}
