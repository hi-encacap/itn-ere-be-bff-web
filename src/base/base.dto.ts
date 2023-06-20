import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { ORDER_DIRECTION_ENUM } from './base.constant';

export class BaseListParamDto {
  @IsNumber()
  @Type(() => Number)
  id: number;
}

export class BaseIdParamDto {
  @IsNumber()
  @Type(() => Number)
  id: number;
}

export class BaseCodeParamDto {
  @IsString()
  code: string;
}

export class BaseQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  expand?: string;
}

export class BaseListQueryDto extends BaseQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  searchBy?: string;

  @ApiPropertyOptional()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  searchValue?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  orderBy?: string;

  @ApiPropertyOptional({ enum: ORDER_DIRECTION_ENUM, enumName: 'ORDER_DIRECTION_ENUM' })
  @IsOptional()
  @IsEnum(ORDER_DIRECTION_ENUM)
  @Transform(({ value }) => value.toUpperCase())
  orderDirection?: ORDER_DIRECTION_ENUM;
}

export class BaseListWithCodeQueryDto {
  @IsString()
  code: string;
}
