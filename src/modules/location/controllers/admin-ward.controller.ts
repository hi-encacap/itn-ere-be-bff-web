import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AddWebsiteIdToBody } from 'src/common/decorators/add-website-id-to-body.decorator';
import { AddWebsiteIdToParam } from 'src/common/decorators/add-website-id-to-param.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { IUser } from 'src/modules/user/interfaces/user.interface';
import { WardWebsiteCreateBodyDto } from '../dto/ward-website-create-body.dto';
import { WardWebsiteDeleteParamDto } from '../dto/ward-website-delete-param.dto';
import { WardWebsiteService } from '../services/ward-website.service';

@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin/locations/wards')
export class AdminWardController {
  constructor(private readonly wardWebsiteService: WardWebsiteService) {}

  @Get()
  getAll(@User() user: IUser) {
    return this.wardWebsiteService.getAll({
      websiteId: user.websiteId,
    });
  }

  @Post()
  create(@AddWebsiteIdToBody() @Body() body: WardWebsiteCreateBodyDto, @User() user: IUser) {
    return this.wardWebsiteService.create(body, user);
  }

  @Delete(':code')
  delete(@User() user: IUser, @AddWebsiteIdToParam() @Param() { code }: WardWebsiteDeleteParamDto) {
    return this.wardWebsiteService.delete(code, user.websiteId);
  }
}
