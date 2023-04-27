import { IREUser } from '@encacap-group/types/dist/re';
import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AddWebsiteIdToParam } from 'src/common/decorators/add-website-id-to-param.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { AdminAuthGuard } from 'src/common/guards/admin-auth.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { WardListQueryDto } from '../dtos/ward-list-query.dto';
import { WardWebsiteCreateBodyDto } from '../dtos/ward-website-create-body.dto';
import { WardWebsiteDeleteParamDto } from '../dtos/ward-website-delete-param.dto';
import { WardWebsiteService } from '../services/ward-website.service';
import { WardService } from '../services/ward.service';

@UseGuards(JwtAuthGuard, AdminAuthGuard)
@Controller('admin/locations/wards')
export class AdminWardController {
  constructor(
    private readonly wardService: WardService,
    private readonly wardWebsiteService: WardWebsiteService,
  ) {}

  @Get()
  getAll(@Query() query: WardListQueryDto, @User() user: IREUser) {
    return this.wardService.getAll({
      ...query,
      websiteId: user.websiteId,
    });
  }

  @Post()
  create(@Body() body: WardWebsiteCreateBodyDto, @User() user: IREUser) {
    return this.wardService.create(body, user);
  }

  @Delete(':code')
  delete(@AddWebsiteIdToParam() @Param() param: WardWebsiteDeleteParamDto, @User() user: IREUser) {
    return this.wardWebsiteService.delete(param.code, user.websiteId);
  }
}
