import { IWebsite } from '@encacap-group/types/dist/re';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Website } from 'src/common/decorators/website.decorator';
import { WebsiteApiKeyGuard } from 'src/common/guards/website-api-key.guard';
import { CategoryListQueryDto } from '../dtos/category-list-query.dto';
import { CategoryService } from '../services/category.service';

@UseGuards(WebsiteApiKeyGuard)
@Controller('public/categories')
export class PublicCategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getPublicEstates(@Query() query: CategoryListQueryDto, @Website() website: IWebsite) {
    return this.categoryService.getAll({
      ...query,
      websiteId: website.id,
    });
  }
}
