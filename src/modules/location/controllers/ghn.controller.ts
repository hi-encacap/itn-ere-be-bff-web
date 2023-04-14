import { IREUser } from '@encacap-group/types/dist/re';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { GHNDistrictListQueryDto } from '../dtos/ghn-district-list-query.dto';
import { GHNWardListQueryDto } from '../dtos/ghn-ward-list-query.dto';
import { GHNService } from '../services/ghn.service';

@UseGuards(JwtAuthGuard)
@Controller('locations/ghn')
export class GHNController {
  constructor(private readonly ghnService: GHNService) {}

  @Get('provinces')
  getProvinces(@User() user: IREUser) {
    return this.ghnService.getProvinces(user.websiteId);
  }

  @Get('districts')
  getDistricts(@Query() { provinceCode }: GHNDistrictListQueryDto, @User() user: IREUser) {
    return this.ghnService.getDistricts(provinceCode, user.websiteId);
  }

  @Get('wards')
  getWards(@Query() { districtCode }: GHNWardListQueryDto) {
    return this.ghnService.getWards(districtCode);
  }
}
