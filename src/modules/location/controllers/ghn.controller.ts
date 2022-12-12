import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { DistrictListQueryDto } from '../dto/district-list-query.dto';
import { WardListQueryDto } from '../dto/ward-list-query.dto';
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
  getDistricts(@Query() query: DistrictListQueryDto) {
    return this.ghnService.getDistricts(query);
  }

  @Get('wards')
  getWards(@Query() query: WardListQueryDto) {
    return this.ghnService.getWards(query);
  }
}
