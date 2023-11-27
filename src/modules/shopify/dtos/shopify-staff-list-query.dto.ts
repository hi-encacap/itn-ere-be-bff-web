import { BaseListQueryDto } from '@bases/base.dto';
import { IsNumber } from 'class-validator';

export class ShopifyStaffListQueryDto extends BaseListQueryDto {
  @IsNumber()
  websiteId: number;
}
