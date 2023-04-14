import { UNIT_PRICE_TYPE_ENUM } from '@encacap-group/types/dist/re';
import { IsEnum, IsOptional } from 'class-validator';
import { BaseListQueryDto } from 'src/base/base.dto';

export class UnitPriceListQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsEnum(UNIT_PRICE_TYPE_ENUM)
  type: UNIT_PRICE_TYPE_ENUM;
}
