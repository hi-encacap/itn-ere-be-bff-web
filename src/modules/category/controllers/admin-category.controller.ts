import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AddWebsiteIdToParam } from 'src/common/decorators/add-website-id-to-param.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { IUser } from 'src/modules/user/interfaces/user.interface';
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
  getAll(@Query() query: CategoryListQueryDto, @User() user: IUser) {
    return this.categoryService.getAll({
      ...query,
      websiteId: user.websiteId,
    });
  }

  @Post()
  create(@Body() body: CategoryCreateBodyDto, @User() user: IUser) {
    return this.categoryService.create(body, user);
  }

  @Put(':code')
  update(@AddWebsiteIdToParam() @Param() param: CategoryUpdateParamDto, @Body() body: CategoryUpdateBodyDto) {
    return this.categoryService.update(param.code, body);
  }

  @Delete(':code')
  delete(@AddWebsiteIdToParam() @Param() param: CategoryDeleteParamDto) {
    return this.categoryService.delete(param.code);
  }
}
