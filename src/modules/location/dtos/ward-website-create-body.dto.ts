import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class WardWebsiteCreateBodyDto {
  @IsNumber()
  @Type(() => Number)
  ghnRefId!: number;

  @IsString()
  provinceCode!: string;

  @IsString()
  districtCode!: string;
}
