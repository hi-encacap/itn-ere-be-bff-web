import { PartialType, PickType } from '@nestjs/mapped-types';
import { IsEmail, IsString } from 'class-validator';
import { ShopifyStaffListQueryDto } from './shopify-staff-list-query.dto';

export class ShopifyStaffCreateBodyDto extends PickType(PartialType(ShopifyStaffListQueryDto), [
  'websiteId',
]) {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;
}
