import { IsString, Validate } from 'class-validator';
import { CategoryCanModifyValidator } from '../validators/category-can-modify.validator';

export class UpdateCategoryParamDto {
  @IsString()
  @Validate(CategoryCanModifyValidator)
  code: string;
}
