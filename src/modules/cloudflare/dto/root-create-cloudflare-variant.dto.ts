import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, MinLength, Validate } from 'class-validator';
import { CloudflareVariantFitEnum } from '../constants/cloudflare-variant-fit.constant';
import { CloudflareVariantExistsValidator } from '../validators/cloudflare-variant-exists.validator';

export class RootCreateCloudflareVariantDto {
  @IsString()
  @MinLength(1)
  @Validate(CloudflareVariantExistsValidator)
  name: string;

  @IsEnum(CloudflareVariantFitEnum)
  fit: CloudflareVariantFitEnum;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  width: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  height: number;
}
