import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class RootQueryCloudflareVariantWebsiteListDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  websiteId: number;
}
