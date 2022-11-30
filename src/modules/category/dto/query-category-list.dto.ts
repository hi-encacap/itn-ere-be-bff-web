import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseQueryListParamsDto } from 'src/base/base.dto';
import { CATEGORY_GROUP_ENUM } from '../constants/category-group.constant';

export class QueryCategoryListDto extends BaseQueryListParamsDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  userId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  websiteId?: number;

  @IsOptional()
  @IsEnum(CATEGORY_GROUP_ENUM, { each: true })
  categoryGroupCodes?: CATEGORY_GROUP_ENUM[];
}
