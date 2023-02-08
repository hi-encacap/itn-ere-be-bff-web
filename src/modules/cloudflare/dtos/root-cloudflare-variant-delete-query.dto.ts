import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { CloudflareVariantCannotDeleteValidator } from '../validators/cloudflare-variant-cannot-delete.validator';
import { RootCloudflareVariantUpdateParamDto } from './root-cloudflare-variant-update-param.dto';

export class RootCloudflareVariantDeleteParamDto extends RootCloudflareVariantUpdateParamDto {
  @IsString()
  @IsNotEmpty()
  @Validate(CloudflareVariantCannotDeleteValidator)
  id: string;
}
