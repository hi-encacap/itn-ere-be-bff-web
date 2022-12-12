import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AddWebsiteIdToParam } from 'src/common/decorators/add-website-id-to-param.decorator';
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
  getAll(@Query() query: CategoryListQueryDto, @Req() { user }) {
    return this.categoryService.getAll({
      ...query,
      websiteId: user.websiteId,
    });
  }

  @Post()
  create(@Body() body: CategoryCreateBodyDto, @Req() { user }) {
    return this.categoryService.create(body, user);
  }

  @Put(':code')
  update(
    @AddWebsiteIdToParam() @Param() param: CategoryUpdateParamDto,
    @Body() body: CategoryUpdateBodyDto,
    @Req() { user },
  ) {
    return this.categoryService.update(param.code, body, user);
  }

  @Delete(':code')
  delete(@AddWebsiteIdToParam() @Param() param: CategoryDeleteParamDto) {
    return this.categoryService.delete(param.code);
  }
}
