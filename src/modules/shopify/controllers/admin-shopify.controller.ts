import { User } from '@decorators/user.decorator';
import { IREUser } from '@encacap-group/common/dist/re';
import { AdminAuthGuard } from '@guards/admin-auth.guard';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ShopifyStaffService } from '../services/shopify-staff.service';

@Controller('admin/shopifies')
@UseGuards(JwtAuthGuard, AdminAuthGuard)
export class AdminShopifyController {
  constructor(private readonly shopifyStaffService: ShopifyStaffService) {}

  @Get('staffs')
  getStaffs(@User() user: IREUser) {
    return this.shopifyStaffService.getStaffs({
      websiteId: user.websiteId,
    });
  }
}
