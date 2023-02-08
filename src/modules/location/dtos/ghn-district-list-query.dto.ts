import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class GHNDistrictListQueryDto {
  @IsString()
  @Type(() => String)
  provinceCode!: string;
}
