import { Type } from 'class-transformer';
import { IsNumber, Validate } from 'class-validator';
import { CategoryCanModifyValidator } from '../validators/category-can-modify.validator';

export class CategoryUpdateParamDto {
  @IsNumber()
  @Type(() => Number)
  @Validate(CategoryCanModifyValidator)
  id: number;
}
