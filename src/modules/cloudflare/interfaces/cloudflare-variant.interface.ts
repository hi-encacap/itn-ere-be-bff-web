import { CLOUDFLARE_VARIANT_FIT_ENUM } from '../constants/cloudflare-variant.constant';

export interface ICloudflareVariant {
  code: string;
  fit: CLOUDFLARE_VARIANT_FIT_ENUM;
  width: number | null;
  height: number | null;
  isDefault: boolean;
}
