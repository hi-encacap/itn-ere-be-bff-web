import { IsOptional, IsString } from 'class-validator';
import { BaseLocationListQueryDto } from './base-location-list-query.dto';

export class WardWebsiteListQueryDto extends BaseLocationListQueryDto {
  @IsOptional()
  @IsString()
  districtCode?: string;
}
