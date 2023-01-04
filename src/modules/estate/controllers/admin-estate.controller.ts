import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { IUser } from 'encacap/dist/re';
import { BaseIdParamDto } from 'src/base/base.dto';
import { AddWebsiteIdToParam } from 'src/common/decorators/add-website-id-to-param.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { EstateCreateBodyDto } from '../dtos/estate-create-body.dto';
import { EstateListQueryDto } from '../dtos/estate-list-query.dto';
import { EstateModifyParamDto } from '../dtos/estate-modify-param.dto';
import { EstateUpdateBodyDto } from '../dtos/estate-update-body.dto';
import { EstateService } from '../services/estate.service';

@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin/estates')
export class AdminEstateController {
  constructor(private readonly estateService: EstateService) {}

  @Get()
  getAll(@Query() query: EstateListQueryDto, @User() user: IUser) {
    return this.estateService.getAll({
      ...query,
      websiteId: user.websiteId,
    });
  }

  @Post()
  create(@Body() body: EstateCreateBodyDto, @User() user: IUser) {
    return this.estateService.create(body, user);
  }

  @Get(':id')
  get(@Param() { id }: BaseIdParamDto) {
    return this.estateService.get({ id });
  }

  @Put(':id')
  update(@AddWebsiteIdToParam() @Param() { id }: EstateModifyParamDto, @Body() body: EstateUpdateBodyDto) {
    return this.estateService.update(id, body);
  }

  @Delete(':id')
  delete(@AddWebsiteIdToParam() @Param() { id }: EstateModifyParamDto) {
    return this.estateService.delete(id);
  }
}
