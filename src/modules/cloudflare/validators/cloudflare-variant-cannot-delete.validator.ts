import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { CloudflareVariantService } from '../services/cloudflare-variant.service';

@ValidatorConstraint({ name: 'CloudflareVariantCannotDeleteValidator', async: true })
export class CloudflareVariantCannotDeleteValidator implements ValidatorConstraintInterface {
  private errorMessage: string;

  constructor(private readonly cloudflareVariantService: CloudflareVariantService) {}

  async validate(name: string) {
    const variant = await this.cloudflareVariantService.getOne({ id: name });

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
