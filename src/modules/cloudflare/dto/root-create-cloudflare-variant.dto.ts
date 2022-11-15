import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, MinLength, Validate } from 'class-validator';
import { CloudflareVariantFitEnum } from '../constants/cloudflare-variant-fit.constant';
import { CloudflareVariantExistsValidator } from '../validators/cloudflare-variant-exists.validator';

export class RootCreateCloudflareVariantDto {
  @IsString()
  @MinLength(1)
  @Validate(CloudflareVariantExistsValidator)
  @ApiProperty()
  name: string;

  @IsEnum(CloudflareVariantFitEnum)
  @ApiProperty()
  fit: CloudflareVariantFitEnum;

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
