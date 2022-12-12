import { IsString, Validate } from 'class-validator';
import { CategoryCanModifyValidator } from '../validators/category-can-modify.validator';

export class CategoryUpdateParamDto {
  @IsString()
  @Validate(CategoryCanModifyValidator)
  code: string;
}
