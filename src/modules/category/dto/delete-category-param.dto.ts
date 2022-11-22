import { IsString, Validate } from 'class-validator';
import { CategoryCanDeleteValidator } from '../validators/category-can-delete.validator';

export class DeleteCategoryParamDto {
  @IsString()
  @Validate(CategoryCanDeleteValidator)
  code: string;
}
