import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ProvinceCreateBodyDto {
  @IsNumber()
  @Type(() => Number)
  ghnRefId!: number;
}
