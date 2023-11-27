import { WEBSITE_CONFIG_CODE_ENUM } from '@modules/configs/constants/website-config.constant';
import { WebsiteConfigService } from '@modules/configs/services/website-config.service';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ShopifyStaffListQueryDto } from '../dtos/shopify-staff-list-query.dto';

@Injectable()
export class ShopifyStaffService {
  constructor(
    private readonly httpService: HttpService,
    private readonly websiteConfigService: WebsiteConfigService,
  ) {}

  async getStaffs(query: ShopifyStaffListQueryDto) {
    const { items: staffAccountConfigs } = await this.websiteConfigService.getAll({
      websiteId: query.websiteId,
      codes: [WEBSITE_CONFIG_CODE_ENUM.SHOPIFY_STAFF_ACCOUNT],
    });

    return staffAccountConfigs;
  }
}
