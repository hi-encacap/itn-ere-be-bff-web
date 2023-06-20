import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { ImageVariantNotExistsValidator } from '../validators/image-variant-not-exists.validator';

export class RootImageVariantUpdateParamDto {
  @IsString()
  @IsNotEmpty()
  @Validate(ImageVariantNotExistsValidator)
  id: string;
}
