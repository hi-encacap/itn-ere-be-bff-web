import { IsNumber, IsOptional } from 'class-validator';

export class CategoryGroupListQueryDto {
  @IsOptional()
  @IsNumber()
  websiteId?: number;
}
