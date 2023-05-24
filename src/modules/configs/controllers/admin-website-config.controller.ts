import { IREUser } from '@encacap-group/common/dist/re';
import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { BaseCodeParamDto } from 'src/base/base.dto';
import { AddWebsiteIdToBody } from 'src/common/decorators/add-website-id-to-body.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { AdminAuthGuard } from 'src/common/guards/admin-auth.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ConfigCreateBodyDto } from '../dtos/config-create-body.dto';
import { ConfigUpdateBodyDto } from '../dtos/config-update-body.dto';
import { WebsiteConfigService } from '../services/website-config.service';

@UseGuards(JwtAuthGuard, AdminAuthGuard)
@Controller('admin/website-configs')
export class AdminWebsiteConfigController {
  constructor(private readonly websiteConfigService: WebsiteConfigService) {}

  @Get()
  getWebsiteConfigs(@User() user: IREUser) {
    return this.websiteConfigService.getAll({ websiteId: user.websiteId });
  }

  @Post()
  createWebsiteConfig(@User() user: IREUser, @AddWebsiteIdToBody() @Body() body: ConfigCreateBodyDto) {
    return this.websiteConfigService.create(body, user);
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
