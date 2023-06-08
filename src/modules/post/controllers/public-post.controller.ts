import { ESTATE_STATUS_ENUM, IWebsite } from '@encacap-group/common/dist/re';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { BaseIdParamDto } from 'src/base/base.dto';
import { Website } from 'src/common/decorators/website.decorator';
import { WebsiteApiKeyGuard } from 'src/common/guards/website-api-key.guard';
import { PostListQueryDto } from '../dtos/post-list-query.dto';
import { PostService } from '../services/post.service';

@UseGuards(WebsiteApiKeyGuard)
@Controller('public/posts')
export class PublicPostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getPublicEstates(@Query() query: PostListQueryDto, @Website() website: IWebsite) {
    return this.postService.getAll({
      ...query,
      websiteId: website.id,
      status: ESTATE_STATUS_ENUM.PUBLISHED,
    });
  }

  @Get('random')
  getRandomEstate(@Website() website: IWebsite) {
    return this.postService.getRandom({
      websiteId: website.id,
      status: ESTATE_STATUS_ENUM.PUBLISHED,
    });
  }

  @Get(':id')
  getEstateById(@Param() param: BaseIdParamDto, @Website() website: IWebsite) {
    return this.postService.get({
      id: param.id,
      websiteId: website.id,
    });
  }
}
