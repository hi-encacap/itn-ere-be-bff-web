import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ImageVariantService } from '../services/image-variant.service';

@ValidatorConstraint({ name: 'ImageVariantNotExistsValidator', async: true })
export class ImageVariantNotExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly imageVariantService: ImageVariantService) {}

  async validate(name: string) {
    const user = await this.imageVariantService.getOne({ code: name });

    return Boolean(user);
  }

  defaultMessage(args: ValidationArguments) {
    return `Variant ${args.value} does not exists.`;
  }
}
