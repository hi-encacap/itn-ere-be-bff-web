import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ImageVariantService } from '../services/image-variant.service';

@ValidatorConstraint({ name: 'ImageVariantExistsValidator', async: true })
export class ImageVariantExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly imageVariantService: ImageVariantService) {}

  async validate(name: string) {
    const user = await this.imageVariantService.getOne({ code: name });

    return !user;
  }

  defaultMessage(args: ValidationArguments) {
    return `Variant ${args.value} already exists.`;
  }
}
