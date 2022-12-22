import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class DistrictWebsiteCreateBodyDto {
  @IsNumber()
  @Type(() => Number)
  ghnRefId!: number;

  @IsString()
  provinceCode!: string;
}
