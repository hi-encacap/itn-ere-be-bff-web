import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RootGuard } from 'src/common/guards/root.guard';
import { RootCreateCloudflareVariantDto } from '../dto/root-create-cloudflare-variant.dto';
import { RootDeleteCloudflareVariantParamDto } from '../dto/root-delete-cloudflare-variant-param.dto';
import { RootUpdateCloudflareVariantDto } from '../dto/root-update-cloudflare-variant.dto';
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

  @Patch(':id')
  updateVariant(@Param('id') id: string, @Body() body: RootUpdateCloudflareVariantDto) {
    return this.cloudflareVariantService.updateVariant(id, body);
  }

  @Delete(':id')
  deleteVariant(@Param() { id }: RootDeleteCloudflareVariantParamDto) {
    return this.cloudflareVariantService.deleteVariant(id);
  }
}
