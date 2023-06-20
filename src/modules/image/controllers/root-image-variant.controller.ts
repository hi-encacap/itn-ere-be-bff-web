import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RootAuthGuard } from 'src/common/guards/root-auth.guard';
import { RootImageVariantCreateBodyDto } from '../dtos/root-image-variant-create-body.dto';
import { RootImageVariantDeleteParamDto } from '../dtos/root-image-variant-delete-query.dto';
import { RootImageVariantUpdateBodyDto } from '../dtos/root-image-variant-update-body.dto';
import { ImageVariantService } from '../services/image-variant.service';

@Controller('root/image-variants')
@UseGuards(JwtAuthGuard, RootAuthGuard)
export class RootImageVariantController {
  constructor(private readonly imageVariantService: ImageVariantService) {}

  @Post()
  createVariant(@Body() body: RootImageVariantCreateBodyDto) {
    return this.imageVariantService.createVariant(body);
  }

  @Get()
  getVariants() {
    return this.imageVariantService.getAll({});
  }

  @Patch(':id')
  updateVariant(@Param('id') id: string, @Body() body: RootImageVariantUpdateBodyDto) {
    return this.imageVariantService.updateVariant(id, body);
  }

  @Delete(':id')
  deleteVariant(@Param() { id }: RootImageVariantDeleteParamDto) {
    return this.imageVariantService.deleteVariant(id);
  }
}
