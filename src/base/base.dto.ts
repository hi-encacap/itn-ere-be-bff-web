import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class BaseQueryParamsDto {
  @IsNumber()
  @Type(() => Number)
  id: number;
}

export class BaseQueryCodeParamsDto {
  @IsString()
  code: string;
}
