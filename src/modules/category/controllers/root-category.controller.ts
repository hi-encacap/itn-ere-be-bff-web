import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RootAuthGuard } from 'src/common/guards/root-auth.guard';
import { CategoryListQueryDto } from '../dtos/category-list-query.dto';
import { RootCategoryCreateBody } from '../dtos/root-category-create-body.dto';
import { CategoryService } from '../services/category.service';

@Controller('root/categories')
@UseGuards(JwtAuthGuard, RootAuthGuard)
export class RootCategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAll(@Query() query: CategoryListQueryDto) {
    return this.categoryService.getAll({
      ...query,
    });
  }

  @Post()
  create(@Body() body: RootCategoryCreateBody) {
    return this.categoryService.create(body);
  }
}
