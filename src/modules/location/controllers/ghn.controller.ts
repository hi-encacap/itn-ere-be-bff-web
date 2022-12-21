import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { GHNDistrictListQueryDto } from '../dtos/ghn-district-list-query.dto';
import { GHNWardListQueryDto } from '../dtos/ghn-ward-list-query.dto';
import { GHNService } from '../services/ghn.service';

@UseGuards(JwtAuthGuard)
@Controller('locations/ghn')
export class GHNController {
  constructor(private readonly ghnService: GHNService) {}

  @Get('provinces')
  getProvinces() {
    return this.ghnService.getProvinces();
  }

  @Get('districts')
  getDistricts(@Query() { provinceCode }: GHNDistrictListQueryDto) {
    return this.ghnService.getDistricts(provinceCode);
  }

  @Get('wards')
  getWards(@Query() { districtCode }: GHNWardListQueryDto) {
    return this.ghnService.getWards(districtCode);
  }
}
