import { CATEGORY_GROUP_ENUM, slugify } from '@encacap-group/types/dist/re';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsString, Validate } from 'class-validator';
import { CloudflareImageNotExistsValidator } from 'src/modules/cloudflare/validators/cloudflare-image-not-exists.validator';
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
  @Validate(CloudflareImageNotExistsValidator)
  thumbnailId: string;

  @IsEnum(CATEGORY_GROUP_ENUM)
  @ApiProperty({
    enum: CATEGORY_GROUP_ENUM,
    enumName: 'CATEGORY_GROUP_ENUM',
  })
  categoryGroupCode: CATEGORY_GROUP_ENUM;
}
