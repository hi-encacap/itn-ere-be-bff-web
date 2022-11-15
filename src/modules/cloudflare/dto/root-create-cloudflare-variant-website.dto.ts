import { Type } from 'class-transformer';
import { IsNumber, IsString, Validate } from 'class-validator';
import { WebsiteNotExistsValidator } from 'src/modules/website/validators/website-not-exists.validator';
import { CloudflareVariantNotExistsValidator } from '../validators/cloudflare-variant-not-exists.validator';

export class RootCreateCloudflareVariantWebsiteDto {
  @IsString()
  @Validate(CloudflareVariantNotExistsValidator)
  variantId!: string;

  @IsNumber()
  @Validate(WebsiteNotExistsValidator)
  @Type(() => Number)
  websiteId!: number;
}
