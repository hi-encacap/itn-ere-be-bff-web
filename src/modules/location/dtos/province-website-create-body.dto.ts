import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ProvinceWebsiteCreateBodyDto {
  @IsNumber()
  @Type(() => Number)
  ghnRefId!: number;
}
