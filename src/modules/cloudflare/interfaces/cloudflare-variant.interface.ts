import { CloudflareVariantFitEnum } from '../constants/cloudflare-variant-fit.constant';

export interface ICloudflareVariant {
  id: string;
  fit: CloudflareVariantFitEnum;
  width: number | null;
  height: number | null;
  isDefault: boolean;
}
