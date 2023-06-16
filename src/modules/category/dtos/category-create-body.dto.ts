import { CATEGORY_GROUP_ENUM, slugify } from '@encacap-group/common/dist/re';
import { ImageNotExistsValidator } from '@modules/image/validators/image-not-exists.validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Validate } from 'class-validator';
import { CategoryExistsValidator } from '../validators/category-exists.validator';

export class CategoryCreateBodyDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => slugify(value))
  @Validate(CategoryExistsValidator)
  code: string;

  @ApiProperty()
  @IsString()
  @Validate(ImageNotExistsValidator)
  avatarId: string;

  @ApiProperty({
    enum: CATEGORY_GROUP_ENUM,
    enumName: 'CATEGORY_GROUP_ENUM',
  })
  @IsEnum(CATEGORY_GROUP_ENUM)
  categoryGroupCode: CATEGORY_GROUP_ENUM;

  @ApiPropertyOptional({ required: false })
  @IsNumber()
  @IsOptional()
  @Validate(CategoryExistsValidator)
  @Type(() => Number)
  parentId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  websiteId?: number;
}
