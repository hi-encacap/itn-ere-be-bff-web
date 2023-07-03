import { User } from '@decorators/user.decorator';
import { IREUser } from '@encacap-group/common/dist/re';
import { AdminAuthGuard } from '@guards/admin-auth.guard';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { WebsiteUpdateBodyDto } from '../dtos/website-update-body.dto';
import { WebsiteService } from '../website.service';

@UseGuards(JwtAuthGuard, AdminAuthGuard)
@Controller('admin/websites')
export class AdminWebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

  @Put('me')
  updateWebsite(@Body() body: WebsiteUpdateBodyDto, @User() user: IREUser) {
    return this.websiteService.updateById(user.websiteId, body);
  }
}
