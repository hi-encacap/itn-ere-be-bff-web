import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class RootCloudflareVariantWebsiteListQueryDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  websiteId: number;
}
