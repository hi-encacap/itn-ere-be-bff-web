import { IsNumber, IsOptional } from 'class-validator';
import { BaseListQueryDto } from 'src/base/base.dto';

export class ProvinceWebsiteListQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsNumber()
  websiteId?: number;

  provinceCode?: string;
}
