import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AddWebsiteIdToBody } from 'src/common/decorators/add-website-id-to-body.decorator';
import { AddWebsiteIdToParam } from 'src/common/decorators/add-website-id-to-param.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { IUser } from 'src/modules/user/interfaces/user.interface';
import { DistrictWebsiteCreateBodyDto } from '../dto/district-website-create-body.dto';
import { DistrictWebsiteDeleteParamDto } from '../dto/district-website-delete-param.dto';
import { DistrictWebsiteService } from '../services/district-website.service';

@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin/locations/districts')
export class AdminDistrictController {
  constructor(private readonly districtWebsiteService: DistrictWebsiteService) {}

  @Get()
  getAll(@User() user: IUser) {
    return this.districtWebsiteService.getAll({
      websiteId: user.websiteId,
    });
  }

  @Post()
  create(@AddWebsiteIdToBody() @Body() body: DistrictWebsiteCreateBodyDto, @User() user: IUser) {
    return this.districtWebsiteService.create(body, user);
  }

  @Delete(':code')
  delete(@User() user: IUser, @AddWebsiteIdToParam() @Param() { code }: DistrictWebsiteDeleteParamDto) {
    return this.districtWebsiteService.delete(code, user.websiteId);
  }
}
