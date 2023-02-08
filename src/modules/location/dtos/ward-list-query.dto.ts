import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseListQueryDto } from 'src/base/base.dto';

export class WardListQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsString({
    each: true,
  })
  provinceCodes?: string[];

  @IsOptional()
  @IsString()
  districtCode?: string;

  @IsOptional()
  @IsString({
    each: true,
  })
  districtCodes?: string[];

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  websiteId?: number;
}
