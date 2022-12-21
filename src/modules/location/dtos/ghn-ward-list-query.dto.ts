import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class GHNWardListQueryDto {
  @IsString()
  @Type(() => String)
  districtCode!: string;
}
