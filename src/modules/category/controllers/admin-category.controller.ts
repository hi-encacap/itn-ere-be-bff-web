import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { QueryCategoryListDto } from '../dto/query-category-list.dto';
import { CategoryService } from '../services/category-service.service';

@Controller('admin/categories')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminCategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAll(@Query() query: QueryCategoryListDto) {
    return this.categoryService.getAll(query);
  }

  @Post()
  create(@Body() body: CreateCategoryDto, @Req() { user }) {
    return this.categoryService.create(body, user);
  }
}
