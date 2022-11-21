import { Transform } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';
import { slugify } from 'src/common/utils/helpers.util';
import { CATEGORY_GROUP_ENUM } from '../constants/category-group.constant';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  @Transform(({ value }) => slugify(value))
  code: string;

  @IsString()
  thumbnailId: string;

  @IsEnum(CATEGORY_GROUP_ENUM)
  categoryGroupCode: CATEGORY_GROUP_ENUM;
}
