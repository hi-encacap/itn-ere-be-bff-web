import { PartialType } from '@nestjs/swagger';
import { RootCreateCloudflareVariantDto } from './root-create-cloudflare-variant.dto';

export class RootUpdateCloudflareVariantDto extends PartialType(RootCreateCloudflareVariantDto) {}
