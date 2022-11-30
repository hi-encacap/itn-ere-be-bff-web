import { Transform, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { ORDER_DIRECTION_ENUM } from './base.constant';

export class BaseQueryParamsDto {
  @IsNumber()
  @Type(() => Number)
  id: number;
}

export class BaseQueryListParamsDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page: number;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsString()
  orderBy: string;

  @IsOptional()
  @IsEnum(ORDER_DIRECTION_ENUM)
  @Transform(({ value }) => value.toUpperCase())
  orderDirection: ORDER_DIRECTION_ENUM = ORDER_DIRECTION_ENUM.ASC;
}

export class BaseQueryCodeParamsDto {
  @IsString()
  code: string;
}
