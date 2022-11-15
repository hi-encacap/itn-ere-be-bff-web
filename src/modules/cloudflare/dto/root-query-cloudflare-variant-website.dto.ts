import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class RootQueryCloudflareVariantWebsiteDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  websiteId: number;
}
