import { IREUser } from '@encacap-group/common/dist/re';
import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { BaseCodeParamDto } from 'src/base/base.dto';
import { AddWebsiteIdToBody } from 'src/common/decorators/add-website-id-to-body.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { AdminAuthGuard } from 'src/common/guards/admin-auth.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ConfigCreateBodyDto } from '../dtos/config-create-body.dto';
import { ConfigUpdateBodyDto } from '../dtos/config-update-body.dto';
import { ConfigUpdateBulkBodyDto } from '../dtos/config-update-bulk-body.dto';
import { WebsiteConfigListQueryDto } from '../dtos/website-config-list-query.dto';
import { WebsiteConfigService } from '../services/website-config.service';

@UseGuards(JwtAuthGuard, AdminAuthGuard)
@Controller('admin/configs/websites')
export class AdminWebsiteConfigController {
  constructor(private readonly websiteConfigService: WebsiteConfigService) {}

  @Get()
  getWebsiteConfigs(@User() user: IREUser, @Query() query: WebsiteConfigListQueryDto) {
    return this.websiteConfigService.getAll({ ...query, websiteId: user.websiteId });
  }

  @Post()
  createWebsiteConfig(@User() user: IREUser, @AddWebsiteIdToBody() @Body() body: ConfigCreateBodyDto) {
    return this.websiteConfigService.create(body, user);
  }

  @Put('bulk')
  bulkUpdateWebsiteConfig(@User() user: IREUser, @Body() body: ConfigUpdateBulkBodyDto) {
    return this.websiteConfigService.bulkUpdate(body.items, user);
  }

  @Get(':code')
  getWebsiteConfig(@User() user: IREUser, @Param() param: BaseCodeParamDto) {
    return this.websiteConfigService.get({
      code: param.code,
      websiteId: user.websiteId,
    });
  }

  @Put(':code')
  updateWebsiteConfig(
    @User() user: IREUser,
    @Body() body: ConfigUpdateBodyDto,
    @Param() param: BaseCodeParamDto,
  ) {
    return this.websiteConfigService.update(
      {
        code: param.code,
        websiteId: user.websiteId,
      },
      body,
      user,
    );
  }
}
