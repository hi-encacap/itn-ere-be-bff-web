import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RootGuard } from 'src/common/guards/root.guard';
import { RootCloudflareVariantCreateBodyDto } from '../dto/root-cloudflare-variant-create-body.dto';
import { RootCloudflareVariantDeleteParamDto } from '../dto/root-cloudflare-variant-delete-query.dto';
import { RootCloudflareVariantUpdateBodyDto } from '../dto/root-cloudflare-variant-update-body.dto';
import { CloudflareVariantService } from '../services/cloudflare-variant.service';

@Controller('root/cloudflare/variants')
@UseGuards(JwtAuthGuard, RootGuard)
export class RootCloudflareVariantController {
  constructor(private readonly cloudflareVariantService: CloudflareVariantService) {}

  @Post()
  createVariant(@Body() body: RootCloudflareVariantCreateBodyDto) {
    return this.cloudflareVariantService.createVariant(body);
  }

  @Get()
  getVariants() {
    return this.cloudflareVariantService.getAll({});
  }

  @Patch(':id')
  updateVariant(@Param('id') id: string, @Body() body: RootCloudflareVariantUpdateBodyDto) {
    return this.cloudflareVariantService.updateVariant(id, body);
  }

  @Delete(':id')
  deleteVariant(@Param() { id }: RootCloudflareVariantDeleteParamDto) {
    return this.cloudflareVariantService.deleteVariant(id);
  }
}
