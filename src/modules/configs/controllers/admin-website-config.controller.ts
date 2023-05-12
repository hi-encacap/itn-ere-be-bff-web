import { IREUser } from '@encacap-group/types/dist/re';
import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { BaseCodeParamDto } from 'src/base/base.dto';
import { User } from 'src/common/decorators/user.decorator';
import { AdminAuthGuard } from 'src/common/guards/admin-auth.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ConfigUpdateBodyDto } from '../dtos/config-update-body.dto';
import { WebsiteConfigService } from '../services/website-config.service';

@UseGuards(JwtAuthGuard, AdminAuthGuard)
@Controller('admin/website-configs')
export class AdminWebsiteConfigController {
  constructor(private readonly websiteConfigService: WebsiteConfigService) {}

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
    );
  }
}
