import { IsString, Validate } from 'class-validator';
import { CategoryCanDeleteValidator } from '../validators/category-can-delete.validator';

export class CategoryDeleteParamDto {
  @IsString()
  @Validate(CategoryCanDeleteValidator)
  code: string;
}
