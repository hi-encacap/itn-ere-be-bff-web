import { ESTATE_STATUS_ENUM, IREUser } from '@encacap-group/common/dist/re';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { BaseIdParamDto } from 'src/base/base.dto';
import { AddWebsiteIdToParam } from 'src/common/decorators/add-website-id-to-param.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { AdminAuthGuard } from 'src/common/guards/admin-auth.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { EstateCreateBodyDto } from '../dtos/estate-create-body.dto';
import { EstateListQueryDto } from '../dtos/estate-list-query.dto';
import { EstateModifyParamDto } from '../dtos/estate-modify-param.dto';
import { EstateUpdateBodyDto } from '../dtos/estate-update-body.dto';
import { EstateDraftService } from '../services/estate-draft.service';
import { EstateService } from '../services/estate.service';

@UseGuards(JwtAuthGuard, AdminAuthGuard)
@Controller('admin/estates')
export class AdminEstateController {
  constructor(
    private readonly estateService: EstateService,
    private readonly estateDraftService: EstateDraftService,
  ) {}

  @Get()
  getAll(@Query() query: EstateListQueryDto, @User() user: IREUser) {
    if (query.status === ESTATE_STATUS_ENUM.DRAFT) {
      return this.estateDraftService.getAll({
        ...query,
        websiteId: user.websiteId,
      });
    }

    return this.estateService.getAll({
      ...query,
      websiteId: user.websiteId,
    });
  }

  @Post()
  create(@Body() body: EstateCreateBodyDto, @User() user: IREUser) {
    return this.estateService.create(body, user);
  }

  @Get(':id')
  get(@Param() { id }: BaseIdParamDto) {
    return this.estateService.get({ id });
  }

  @Post(':id/un-publish')
  unPublish(@Param() { id }: BaseIdParamDto) {
    return this.estateService.unPublishById(id);
  }

  @Post(':id/publish')
  publish(@Param() { id }: BaseIdParamDto) {
    return this.estateService.publishById(id);
  }

  @Post(':id/up-top')
  upTop(@Param() { id }: BaseIdParamDto) {
    return this.estateService.upTopById(id);
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
