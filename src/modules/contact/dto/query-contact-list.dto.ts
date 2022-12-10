import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { BaseQueryListParamsDto } from 'src/base/base.dto';

export class QueryContactListDto extends BaseQueryListParamsDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  websiteId?: number;
}
