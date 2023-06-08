import { ESTATE_STATUS_ENUM, IWebsite } from '@encacap-group/common/dist/re';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { BaseIdParamDto } from 'src/base/base.dto';
import { Website } from 'src/common/decorators/website.decorator';
import { WebsiteApiKeyGuard } from 'src/common/guards/website-api-key.guard';
import { EstateListQueryDto } from '../dtos/estate-list-query.dto';
import { EstateService } from '../services/estate.service';

@UseGuards(WebsiteApiKeyGuard)
@Controller('public/estates')
export class PublicEstateController {
  constructor(private readonly estateService: EstateService) {}

  @Get()
  getPublicEstates(@Query() query: EstateListQueryDto, @Website() website: IWebsite) {
    return this.estateService.getAll({
      ...query,
      websiteId: website.id,
      status: ESTATE_STATUS_ENUM.PUBLISHED,
    });
  }

  @Get('random')
  getRandomEstate(@Website() website: IWebsite) {
    return this.estateService.getRandom({
      websiteId: website.id,
      status: ESTATE_STATUS_ENUM.PUBLISHED,
    });
  }

  @Get(':id')
  getEstateById(@Param() param: BaseIdParamDto, @Website() website: IWebsite) {
    return this.estateService.get({
      id: param.id,
      websiteId: website.id,
    });
  }
}
