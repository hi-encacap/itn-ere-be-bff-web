import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class WardListQueryDto {
  @IsNumber()
  @Type(() => Number)
  districtId?: number;
}
