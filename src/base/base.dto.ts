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

export class BaseListQueryDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsString()
  searchBy?: string;

  @IsOptional()
  @IsString()
  searchValue?: string;

  @IsOptional()
  @IsString()
  orderBy?: string;

  @IsOptional()
  @IsEnum(ORDER_DIRECTION_ENUM)
  @Transform(({ value }) => value.toUpperCase())
  orderDirection?: ORDER_DIRECTION_ENUM;
}

export class BaseListWithCodeQueryDto {
  @IsString()
  code: string;
}
