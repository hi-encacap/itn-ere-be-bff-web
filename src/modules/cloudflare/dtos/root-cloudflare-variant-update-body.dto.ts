import { PartialType } from '@nestjs/swagger';
import { RootCloudflareVariantCreateBodyDto } from './root-cloudflare-variant-create-body.dto';

export class RootCloudflareVariantUpdateBodyDto extends PartialType(RootCloudflareVariantCreateBodyDto) {}
