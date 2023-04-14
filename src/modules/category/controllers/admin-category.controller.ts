import { IREUser } from '@encacap-group/types/dist/re';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AddWebsiteIdToParam } from 'src/common/decorators/add-website-id-to-param.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CategoryCreateBodyDto } from '../dtos/category-create-body.dto';
import { CategoryDeleteParamDto } from '../dtos/category-delete-param.dto';
import { CategoryListQueryDto } from '../dtos/category-list-query.dto';
import { CategoryUpdateBodyDto } from '../dtos/category-update-body.dto';
import { CategoryUpdateParamDto } from '../dtos/category-update-param.dto';
import { CategoryService } from '../services/category.service';

@Controller('admin/categories')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminCategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAll(@Query() query: CategoryListQueryDto, @User() user: IREUser) {
    return this.categoryService.getAll({
      ...query,
      websiteId: user.websiteId,
    });
  }

  @Post()
  create(@Body() body: CategoryCreateBodyDto, @User() user: IREUser) {
    return this.categoryService.create(body, user);
  }

  @Put(':id')
  update(@AddWebsiteIdToParam() @Param() param: CategoryUpdateParamDto, @Body() body: CategoryUpdateBodyDto) {
    return this.categoryService.update(param.id, body);
  }

  @Delete(':id')
  delete(@AddWebsiteIdToParam() @Param() param: CategoryDeleteParamDto) {
    return this.categoryService.delete(param.id);
  }
}
