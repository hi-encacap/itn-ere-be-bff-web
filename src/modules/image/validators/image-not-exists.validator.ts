import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ImageService } from '../services/image.service';

@ValidatorConstraint({ name: 'ImageNotExistsValidator', async: true })
export class ImageNotExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly imageService: ImageService) {}

  async validate(imageId: string) {
    try {
      const image = await this.imageService.get(imageId);
      return Boolean(image);
    } catch (error) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `Cloudflare image ${args.value} does not exist.`;
  }
}
