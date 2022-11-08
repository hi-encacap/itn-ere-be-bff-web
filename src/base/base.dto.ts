import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class BaseGetOneQueryParamsDto {
  @IsNumber()
  @Type(() => Number)
  id: number;
}
