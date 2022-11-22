import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AddWebsiteIdToParam } from 'src/common/decorators/add-website-id-to-param.decorator';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { DeleteCategoryParamDto } from '../dto/delete-category-param.dto';
import { QueryCategoryListDto } from '../dto/query-category-list.dto';
import { UpdateCategoryBodyDto } from '../dto/update-category-body.dto';
import { UpdateCategoryParamDto } from '../dto/update-category-param.dto';
import { CategoryService } from '../services/category.service';

@Controller('admin/categories')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminCategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAll(@Query() query: QueryCategoryListDto, @Req() { user }) {
    return this.categoryService.getAll({
      ...query,
      websiteId: user.websiteId,
    });
  }

  @Post()
  create(@Body() body: CreateCategoryDto, @Req() { user }) {
    return this.categoryService.create(body, user);
  }

  @Put(':code')
  update(
    @AddWebsiteIdToParam() @Param() param: UpdateCategoryParamDto,
    @Body() body: UpdateCategoryBodyDto,
    @Req() { user },
  ) {
    return this.categoryService.update(param.code, body, user);
  }

  @Delete(':code')
  delete(@AddWebsiteIdToParam() @Param() param: DeleteCategoryParamDto) {
    return this.categoryService.delete(param.code);
  }
}
