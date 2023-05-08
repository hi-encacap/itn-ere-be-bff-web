import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { WebsiteService } from 'src/modules/website/website.service';

@ValidatorConstraint({ name: 'WebsiteNotExistsValidator', async: true })
export class WebsiteNotExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly websiteService: WebsiteService) {}

  async validate(id: number) {
    const website = await this.websiteService.get({ id });

    return Boolean(website);
  }

  defaultMessage(args: ValidationArguments) {
    return `Website with id ${args.value} does not exists.`;
  }
}
