import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { IUser } from 'src/modules/user/interfaces/user.interface';
import { ProvinceListQueryDto } from '../dtos/province-list-query.dto';
import { ProvinceService } from '../services/province.service';

@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin/locations/provinces')
export class AdminProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Get()
  getAll(@Query() query: ProvinceListQueryDto, @User() user: IUser) {
    return this.provinceService.getAll({
      ...query,
      websiteId: user.websiteId,
    });
  }
}
