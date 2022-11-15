import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { CloudflareVariantService } from '../services/cloudflare-variant.service';

@ValidatorConstraint({ name: 'CloudflareVariantNotExistsValidator', async: true })
export class CloudflareVariantNotExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly cloudflareVariantService: CloudflareVariantService) {}

  async validate(name: string) {
    const user = await this.cloudflareVariantService.getOne({ id: name });

    return !!user;
  }

  defaultMessage(args: ValidationArguments) {
    return `Variant ${args.value} does not exists.`;
  }
}
