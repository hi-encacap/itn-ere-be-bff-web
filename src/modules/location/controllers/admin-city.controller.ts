import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AddWebsiteIdToBody } from 'src/common/decorators/add-website-id-to-body.decorator';
import { AddWebsiteIdToParam } from 'src/common/decorators/add-website-id-to-param.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { IUser } from 'src/modules/user/interfaces/user.interface';
import { ProvinceWebsiteCreateBodyDto } from '../dto/province-website-create-body.dto';
import { ProvinceWebsiteDeleteParamDto } from '../dto/province-website-delete-param.dto';
import { ProvinceWebsiteService } from '../services/province-website.service';

@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin/locations/provinces')
export class AdminCityController {
  constructor(private readonly provinceWebsiteService: ProvinceWebsiteService) {}

  @Get()
  getCities(@User() user: IUser) {
    return this.provinceWebsiteService.getAll({
      websiteId: user.websiteId,
    });
  }

  @Post()
  createCity(@AddWebsiteIdToBody() @Body() body: ProvinceWebsiteCreateBodyDto, @User() user: IUser) {
    return this.provinceWebsiteService.create(body, user);
  }

  @Delete(':code')
  deleteCity(@User() user: IUser, @AddWebsiteIdToParam() @Param() { code }: ProvinceWebsiteDeleteParamDto) {
    return this.provinceWebsiteService.delete(code, user.websiteId);
  }
}
