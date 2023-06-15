import { CATEGORY_GROUP_ENUM, slugify } from '@encacap-group/common/dist/re';
import { ImageNotExistsValidator } from '@modules/image/validators/image-not-exists.validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Validate } from 'class-validator';
import { CategoryExistsValidator } from '../validators/category-exists.validator';

export class CategoryCreateBodyDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @Transform(({ value }) => slugify(value))
  @Validate(CategoryExistsValidator)
  @ApiProperty()
  code: string;

  @IsString()
  @ApiProperty()
  @Validate(ImageNotExistsValidator)
  thumbnailId: string;

  @IsEnum(CATEGORY_GROUP_ENUM)
  @ApiProperty({
    enum: CATEGORY_GROUP_ENUM,
    enumName: 'CATEGORY_GROUP_ENUM',
  })
  categoryGroupCode: CATEGORY_GROUP_ENUM;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  @Validate(CategoryExistsValidator)
  parentId?: number;
}
