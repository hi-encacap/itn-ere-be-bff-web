import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, MinLength, Validate } from 'class-validator';
import { IMAGE_VARIANT_FIT_ENUM } from '../constants/image-variant.constant';
import { ImageVariantExistsValidator } from '../validators/image-variant-exists.validator';

export class RootImageVariantCreateBodyDto {
  @IsString()
  @MinLength(1)
  @Validate(ImageVariantExistsValidator)
  @ApiProperty()
  name: string;

  @IsEnum(IMAGE_VARIANT_FIT_ENUM)
  @ApiProperty({
    enum: IMAGE_VARIANT_FIT_ENUM,
    enumName: 'IMAGE_VARIANT_FIT_ENUM',
  })
  fit: IMAGE_VARIANT_FIT_ENUM;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty()
  width: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty()
  height: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @ApiProperty()
  isDefault: boolean;
}
