import { MEM_CACHING_KEY_ENUM } from '@constants/caching.constant';
import { IWebsite } from '@encacap-group/common/dist/re';
import { WebsiteMemCachingInterceptor } from '@interceptors/website-mem-caching.interceptor';
import {
  CacheKey,
  CacheTTL,
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BaseCodeParamDto } from 'src/base/base.dto';
import { Website } from 'src/common/decorators/website.decorator';
import { WebsiteApiKeyGuard } from 'src/common/guards/website-api-key.guard';
import { WebsiteConfigListQueryDto } from '../dtos/website-config-list-query.dto';
import { WebsiteConfigService } from '../services/website-config.service';

@UseGuards(WebsiteApiKeyGuard)
@UseInterceptors(WebsiteMemCachingInterceptor)
@CacheTTL(0)
@Controller('public/website-configs')
export class PublicWebsiteConfigController {
  constructor(private readonly configService: WebsiteConfigService) {}

  @CacheKey(MEM_CACHING_KEY_ENUM.WEBSITE_CONFIG_LIST)
  @Get()
  getConfigs(@Query() query: WebsiteConfigListQueryDto, @Website() website: IWebsite) {
    return this.configService.getAll({
      ...query,
      websiteId: website.id,
    });
  }

  @CacheKey(MEM_CACHING_KEY_ENUM.WEBSITE_CONFIG)
  @Get(':code')
  getConfig(@Website() website: IWebsite, @Param() param: BaseCodeParamDto) {
    return this.configService.get({
      code: param.code,
      websiteId: website.id,
    });
  }
}
