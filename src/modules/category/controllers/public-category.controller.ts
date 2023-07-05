import { MEM_CACHING_KEY_ENUM } from '@constants/caching.constant';
import { IWebsite } from '@encacap-group/common/dist/re';
import { WebsiteMemCachingInterceptor } from '@interceptors/website-mem-caching.interceptor';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { Controller, Get, Param, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { BaseCodeParamDto, BaseQueryDto } from 'src/base/base.dto';
import { Website } from 'src/common/decorators/website.decorator';
import { WebsiteApiKeyGuard } from 'src/common/guards/website-api-key.guard';
import { CategoryListQueryDto } from '../dtos/category-list-query.dto';
import { CategoryService } from '../services/category.service';

@UseGuards(WebsiteApiKeyGuard)
@UseInterceptors(WebsiteMemCachingInterceptor)
@CacheTTL(0)
@Controller('public/categories')
export class PublicCategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @CacheKey(MEM_CACHING_KEY_ENUM.CATEGORY_LIST)
  @Get()
  getPublicCategories(@Query() query: CategoryListQueryDto, @Website() website: IWebsite) {
    return this.categoryService.getAll({
      ...query,
      websiteId: website.id,
    });
  }

  @CacheKey(MEM_CACHING_KEY_ENUM.CATEGORY_ROOTS)
  @Get('roots')
  getRoots(@Query() query: CategoryListQueryDto, @Website() website: IWebsite) {
    return this.categoryService.getAll({
      ...query,
      websiteId: website.id,
      parentId: null,
    });
  }

  @CacheKey(MEM_CACHING_KEY_ENUM.CATEGORY)
  @Get(':code')
  getPublicCategoryByCode(
    @Param() param: BaseCodeParamDto,
    @Query() query: BaseQueryDto,
    @Website() website: IWebsite,
  ) {
    return this.categoryService.get({
      ...query,
      code: param.code,
      websiteId: website.id,
    });
  }
}
