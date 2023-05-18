import { IWebsite } from '@encacap-group/common/dist/re';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { BaseCodeParamDto } from 'src/base/base.dto';
import { Website } from 'src/common/decorators/website.decorator';
import { WebsiteApiKeyGuard } from 'src/common/guards/website-api-key.guard';
import { CategoryListQueryDto } from '../dtos/category-list-query.dto';
import { CategoryService } from '../services/category.service';

@UseGuards(WebsiteApiKeyGuard)
@Controller('public/categories')
export class PublicCategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getPublicCategories(@Query() query: CategoryListQueryDto, @Website() website: IWebsite) {
    return this.categoryService.getAll({
      ...query,
      websiteId: website.id,
    });
  }

  @Get(':code')
  getPublicCategoryByCode(@Param() param: BaseCodeParamDto, @Website() website: IWebsite) {
    return this.categoryService.get({
      code: param.code,
      websiteId: website.id,
    });
  }
}
