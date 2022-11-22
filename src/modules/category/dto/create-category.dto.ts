import { Transform } from 'class-transformer';
import { IsEnum, IsString, Validate } from 'class-validator';
import { slugify } from 'src/common/utils/helpers.util';
import { CATEGORY_GROUP_ENUM } from '../constants/category-group.constant';
import { CategoryExistsValidator } from '../validators/category-exists.validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  @Transform(({ value }) => slugify(value))
  @Validate(CategoryExistsValidator)
  code: string;

  @IsString()
  thumbnailId: string;

  @IsEnum(CATEGORY_GROUP_ENUM)
  categoryGroupCode: CATEGORY_GROUP_ENUM;
}
