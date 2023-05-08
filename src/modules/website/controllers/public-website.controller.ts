import { IWebsite } from '@encacap-group/types/dist/re';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Website } from 'src/common/decorators/website.decorator';
import { WebsiteApiKeyGuard } from 'src/common/guards/website-api-key.guard';
import { WebsiteService } from '../website.service';

@UseGuards(WebsiteApiKeyGuard)
@Controller('public/websites')
export class PublicWebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

  @Get('me')
  getMyWebsite(@Website() website: IWebsite) {
    return this.websiteService.get({
      id: website.id,
    });
  }
}
