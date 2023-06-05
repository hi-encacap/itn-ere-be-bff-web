import { ESTATE_STATUS_ENUM } from '@encacap-group/common/dist/re';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { BaseListQueryDto } from 'src/base/base.dto';

export class PostListQueryDto extends BaseListQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  websiteId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  categoryId?: number;

  @ApiPropertyOptional({ isArray: true })
  @IsOptional()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  categoryIds?: number[];

  @ApiPropertyOptional({ enum: ESTATE_STATUS_ENUM, enumName: 'ESTATE_STATUS_ENUM' })
  @IsOptional()
  @IsEnum(ESTATE_STATUS_ENUM)
  status?: ESTATE_STATUS_ENUM;

  @ApiPropertyOptional({ enum: ESTATE_STATUS_ENUM, enumName: 'ESTATE_STATUS_ENUM', isArray: true })
  @IsOptional()
  @IsEnum(ESTATE_STATUS_ENUM, { each: true })
  statuses?: ESTATE_STATUS_ENUM[];
}
