import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { CloudflareVariantService } from '../services/cloudflare-variant.service';

@ValidatorConstraint({ name: 'CloudflareVariantExistsValidator', async: true })
export class CloudflareVariantExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly cloudflareVariantService: CloudflareVariantService) {}

  async validate(name: string) {
    const user = await this.cloudflareVariantService.getOne({ code: name });

    return !user;
  }

  defaultMessage(args: ValidationArguments) {
    return `Variant ${args.value} already exists.`;
  }
}
