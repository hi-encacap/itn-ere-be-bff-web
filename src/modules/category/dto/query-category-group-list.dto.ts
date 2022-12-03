import { IsNumber, IsOptional } from 'class-validator';

export class QueryCategoryGroupListDto {
  @IsOptional()
  @IsNumber()
  websiteId?: number;
}
