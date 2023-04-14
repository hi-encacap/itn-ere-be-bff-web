import { IREUser } from '@encacap-group/types/dist/re';
import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AddWebsiteIdToParam } from 'src/common/decorators/add-website-id-to-param.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { DistrictListQueryDto } from '../dtos/district-list-query.dto';
import { DistrictWebsiteCreateBodyDto } from '../dtos/district-website-create-body.dto';
import { DistrictWebsiteDeleteParamDto } from '../dtos/district-website-delete-param.dto';
import { DistrictWebsiteService } from '../services/district-website.service';
import { DistrictService } from '../services/district.service';

@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin/locations/districts')
export class AdminDistrictController {
  constructor(
    private readonly districtService: DistrictService,
    private readonly districtWebsiteService: DistrictWebsiteService,
  ) {}

  @Get()
  getAll(@Query() query: DistrictListQueryDto, @User() user: IREUser) {
    return this.districtService.getAll({
      ...query,
      websiteId: user.websiteId,
    });
  }

  @Post()
  create(@Body() body: DistrictWebsiteCreateBodyDto, @User() user: IREUser) {
    return this.districtService.create(body, user);
  }

  @Delete(':code')
  delete(@AddWebsiteIdToParam() @Param() param: DistrictWebsiteDeleteParamDto, @User() user: IREUser) {
    return this.districtWebsiteService.delete(param.code, user.websiteId);
  }
}
