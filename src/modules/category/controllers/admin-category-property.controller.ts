import { IREUser } from '@encacap-group/types/dist/re';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AddWebsiteIdToParam } from 'src/common/decorators/add-website-id-to-param.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CategoryPropertyCreateBodyDto } from '../dtos/category-property-create-body.dto';
import { CategoryPropertyListQueryDto } from '../dtos/category-property-list-query.dto';
import { CategoryPropertyModifyParamDto } from '../dtos/category-property-modify-param.dto';
import { CategoryPropertyUpdateBodyDto } from '../dtos/category-property-update-body.dto';
import { CategoryPropertyService } from '../services/category-property.service';

@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin/category-properties')
export class AdminCategoryPropertyController {
  constructor(private readonly categoryPropertyService: CategoryPropertyService) {}

  @Get()
  getAll(@Query() query: CategoryPropertyListQueryDto, @User() user: IREUser) {
    return this.categoryPropertyService.getAll({
      ...query,
      websiteId: user.websiteId,
    });
  }

  @Post()
  create(@Body() body: CategoryPropertyCreateBodyDto, @User() user: IREUser) {
    return this.categoryPropertyService.create({
      ...body,
      websiteId: user.websiteId,
    });
  }

  @Put(':id')
  update(
    @AddWebsiteIdToParam() @Param() param: CategoryPropertyModifyParamDto,
    @Body() body: CategoryPropertyUpdateBodyDto,
  ) {
    return this.categoryPropertyService.update(param.id, body);
  }

  @Delete(':id')
  delete(@AddWebsiteIdToParam() @Param() param: CategoryPropertyModifyParamDto) {
    return this.categoryPropertyService.delete(param.id);
  }
}
