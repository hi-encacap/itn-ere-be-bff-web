import { CONFIG_CODE_ENUM, IWebsite } from '@encacap-group/types/dist/re';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Website } from 'src/common/decorators/website-id.decorator';
import { WebsiteApiKeyGuard } from 'src/common/guards/website-api-key.guard';
import { ConfigListQueryDto } from '../dtos/config-list-query.dto';
import { ConfigService } from '../services/config.service';

@UseGuards(WebsiteApiKeyGuard)
@Controller('websites/configs')
export class WebsiteConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  async getConfigs(@Query() query: ConfigListQueryDto, @Website() website: IWebsite) {
    return this.configService.getAll({
      ...query,
      websiteId: website.id,
    });
  }

  @Get('contacts')
  async getSiteContactInformation(@Website() website: IWebsite) {
    return this.configService.getAll({
      websiteId: website.id,
      codes: [
        CONFIG_CODE_ENUM.SITE_ADDRESS,
        CONFIG_CODE_ENUM.SITE_FACEBOOK,
        CONFIG_CODE_ENUM.SITE_NAME,
        CONFIG_CODE_ENUM.SITE_PHONE_NUMBER,
        CONFIG_CODE_ENUM.SITE_YOUTUBE,
        CONFIG_CODE_ENUM.SITE_ZALO,
      ],
    });
  }
}
