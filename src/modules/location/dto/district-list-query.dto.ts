import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class DistrictListQueryDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  provinceId?: number;
}
