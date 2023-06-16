import { CATEGORY_GROUP_ENUM } from '@encacap-group/common/dist/re';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { BaseListQueryDto } from 'src/base/base.dto';

export class CategoryListQueryDto extends BaseListQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  userId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  websiteId?: number;

  @ApiPropertyOptional({ enum: CATEGORY_GROUP_ENUM, isArray: true })
  @IsOptional()
  @IsEnum(CATEGORY_GROUP_ENUM, { each: true })
  categoryGroupCodes?: CATEGORY_GROUP_ENUM[];

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @Type(() => Number)
  parentId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  parentCode?: string;
}
