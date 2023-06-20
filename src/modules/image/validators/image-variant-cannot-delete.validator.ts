import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ImageVariantService } from '../services/image-variant.service';

@ValidatorConstraint({ name: 'ImageVariantCannotDeleteValidator', async: true })
export class ImageVariantCannotDeleteValidator implements ValidatorConstraintInterface {
  private errorMessage: string;

  constructor(private readonly imageVariantService: ImageVariantService) {}

  async validate(name: string) {
    const variant = await this.imageVariantService.getOne({ code: name });

    if (!variant) {
      this.errorMessage = `Variant ${name} does not exists.`;
      return false;
    }

    if (variant.isDefault) {
      this.errorMessage = `Variant ${name} is default variant.`;
      return false;
    }

    return true;
  }

  defaultMessage() {
    return this.errorMessage;
  }
}
