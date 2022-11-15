import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { CloudflareVariantCannotDeleteValidator } from '../validators/cloudflare-variant-cannot-delete.validator';
import { RootUpdateCloudflareVariantParamDto } from './root-update-cloudflare-variant-param.dto';

export class RootDeleteCloudflareVariantParamDto extends RootUpdateCloudflareVariantParamDto {
  @IsString()
  @IsNotEmpty()
  @Validate(CloudflareVariantCannotDeleteValidator)
  id: string;
}
