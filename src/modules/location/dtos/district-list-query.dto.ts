import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseListQueryDto } from 'src/base/base.dto';

export class DistrictListQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsString()
  provinceCode?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  websiteId?: number;
}
