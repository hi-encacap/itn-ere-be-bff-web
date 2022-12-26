import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseListQueryDto } from 'src/base/base.dto';

export class CategoryPropertyListQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  categoryId?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  websiteId?: number;
}
