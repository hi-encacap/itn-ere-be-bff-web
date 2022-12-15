import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { IUser } from 'src/modules/user/interfaces/user.interface';
import { DistrictListQueryDto } from '../dto/district-list-query.dto';
import { WardListQueryDto } from '../dto/ward-list-query.dto';
import { GHNService } from '../services/ghn.service';

@UseGuards(JwtAuthGuard)
@Controller('locations/ghn')
export class GHNController {
  constructor(private readonly ghnService: GHNService) {}

  @Get('provinces')
  getProvinces(@User() user: IUser) {
    return this.ghnService.getProvinces(true, user.websiteId);
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
