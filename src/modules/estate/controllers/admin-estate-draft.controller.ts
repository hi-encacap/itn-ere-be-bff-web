import { IREUser } from '@encacap-group/types/dist/re';
import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { BaseIdParamDto } from 'src/base/base.dto';
import { User } from 'src/common/decorators/user.decorator';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { EstateDraftCreateBodyDto } from '../dtos/estate-draft-create-body.dto';
import { EstateListQueryDto } from '../dtos/estate-list-query.dto';
import { EstateDraftService } from '../services/estate-draft.service';

@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin/estate-drafts')
export class AdminEstateDraftController {
  constructor(private readonly estateDraftService: EstateDraftService) {}

  @Get()
  getAll(@Query() query: EstateListQueryDto, @User() user: IREUser) {
    return this.estateDraftService.getAll({
      ...query,
      websiteId: user.websiteId,
    });
  }

  @Post()
  create(@Body() body: EstateDraftCreateBodyDto, @User() user: IREUser) {
    return this.estateDraftService.create(body, user);
  }

  @Get(':id')
  getOne(@Param() param: BaseIdParamDto, @User() user: IREUser) {
    return this.estateDraftService.get({
      id: param.id,
      websiteId: user.websiteId,
    });
  }

  @Delete(':id')
  delete(@Param() param: BaseIdParamDto, @User() user: IREUser) {
    return this.estateDraftService.delete({
      id: param.id,
      websiteId: user.websiteId,
    });
  }
}
