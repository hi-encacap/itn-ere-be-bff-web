import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, MinLength, Validate } from 'class-validator';
import { CLOUDFLARE_VARIANT_FIT_ENUM } from '../constants/cloudflare-variant.constant';
import { CloudflareVariantExistsValidator } from '../validators/cloudflare-variant-exists.validator';

export class RootCreateCloudflareVariantDto {
  @IsString()
  @MinLength(1)
  @Validate(CloudflareVariantExistsValidator)
  @ApiProperty()
  name: string;

  @IsEnum(CLOUDFLARE_VARIANT_FIT_ENUM)
  @ApiProperty()
  fit: CLOUDFLARE_VARIANT_FIT_ENUM;

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
