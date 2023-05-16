import { CATEGORY_GROUP_ENUM } from '@encacap-group/types/dist/re';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { BaseListQueryDto } from 'src/base/base.dto';

export class CategoryListQueryDto extends BaseListQueryDto {
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

  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @Type(() => Number)
  parentId?: number;

  @IsOptional()
  @IsString()
  parentCode?: string;
}
