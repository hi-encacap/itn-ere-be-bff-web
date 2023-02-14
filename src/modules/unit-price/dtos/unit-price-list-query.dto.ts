import { IsEnum, IsOptional } from 'class-validator';
import { UNIT_PRICE_TYPE_ENUM } from 'encacap/dist/re';
import { BaseListQueryDto } from 'src/base/base.dto';

export class UnitPriceListQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsEnum(UNIT_PRICE_TYPE_ENUM)
  type: UNIT_PRICE_TYPE_ENUM;
}
