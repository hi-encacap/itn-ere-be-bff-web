import { MEM_CACHING_KEY_ENUM } from '@constants/caching.constant';
import { ESTATE_STATUS_ENUM, IWebsite } from '@encacap-group/common/dist/re';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { BaseIdParamDto } from 'src/base/base.dto';
import { Website } from 'src/common/decorators/website.decorator';
import { WebsiteApiKeyGuard } from 'src/common/guards/website-api-key.guard';
import { PostListQueryDto } from '../dtos/post-list-query.dto';
import { PostService } from '../services/post.service';

@UseGuards(WebsiteApiKeyGuard)
// @UseInterceptors(WebsiteMemCachingInterceptor)
@CacheTTL(0)
@Controller('public/posts')
export class PublicPostController {
  constructor(private readonly postService: PostService) {}

  // @CacheKey(MEM_CACHING_KEY_ENUM.POST_LIST)
  @Get()
  getPublicEstates(@Query() query: PostListQueryDto, @Website() website: IWebsite) {
    return this.postService.getAll({
      ...query,
      websiteId: website.id,
      status: ESTATE_STATUS_ENUM.PUBLISHED,
    });
  }

  @CacheKey(MEM_CACHING_KEY_ENUM.POST_RANDOM)
  @Get('random')
  getRandomEstate(@Website() website: IWebsite, @Query() query: PostListQueryDto) {
    return this.postService.getRandom({
      ...query,
      websiteId: website.id,
      status: ESTATE_STATUS_ENUM.PUBLISHED,
    });
  }

  @CacheKey(MEM_CACHING_KEY_ENUM.POST)
  @Get(':id')
  getEstateById(@Param() param: BaseIdParamDto, @Website() website: IWebsite) {
    return this.postService.get({
      id: param.id,
      websiteId: website.id,
    });
  }
}
