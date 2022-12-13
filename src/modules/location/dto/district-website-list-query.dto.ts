import { IsOptional, IsString } from 'class-validator';
import { BaseLocationListQueryDto } from './base-location-list-query.dto';

export class ProvinceWebsiteListQueryDto extends BaseLocationListQueryDto {
  @IsOptional()
  @IsString()
  provinceCode?: string;
}
