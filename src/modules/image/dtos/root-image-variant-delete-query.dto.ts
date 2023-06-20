import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { ImageVariantCannotDeleteValidator } from '../validators/image-variant-cannot-delete.validator';
import { RootImageVariantUpdateParamDto } from './root-image-variant-update-param.dto';

export class RootImageVariantDeleteParamDto extends RootImageVariantUpdateParamDto {
  @IsString()
  @IsNotEmpty()
  @Validate(ImageVariantCannotDeleteValidator)
  id: string;
}
