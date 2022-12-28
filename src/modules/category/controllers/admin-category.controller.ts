import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { IUser } from 'encacap/dist/re';
import { AddWebsiteIdToParam } from 'src/common/decorators/add-website-id-to-param.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CategoryCreateBodyDto } from '../dto/category-create-body.dto';
import { CategoryDeleteParamDto } from '../dto/category-delete-param.dto';
import { CategoryListQueryDto } from '../dto/category-list-query.dto';
import { CategoryUpdateBodyDto } from '../dto/category-update-body.dto';
import { CategoryUpdateParamDto } from '../dto/category-update-param.dto';
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
