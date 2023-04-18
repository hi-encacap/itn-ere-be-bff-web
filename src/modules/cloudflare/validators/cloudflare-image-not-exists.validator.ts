import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { CloudflareImageService } from '../services/cloudflare-image.service';

@ValidatorConstraint({ name: 'CloudflareImageNotExistsValidator', async: true })
export class CloudflareImageNotExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly cloudflareImageService: CloudflareImageService) {}

  async validate(imageId: string) {
    try {
      const image = await this.cloudflareImageService.get(imageId);
      return Boolean(image);
    } catch (error) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `Cloudflare image ${args.value} does not exist.`;
  }
}
