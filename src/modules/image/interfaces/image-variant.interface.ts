import { IMAGE_VARIANT_FIT_ENUM } from '../constants/image-variant.constant';

export interface IImageVariant {
  code: string;
  fit: IMAGE_VARIANT_FIT_ENUM;
  width: number | null;
  height: number | null;
  isDefault: boolean;
}
