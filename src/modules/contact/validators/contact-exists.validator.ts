import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { CreateContactDto } from '../dto/create-contact.dto';
import { ContactService } from '../services/contact.service';

interface ContactExistsValidatorValidationArguments extends ValidationArguments {
  object: CreateContactDto;
}

@ValidatorConstraint({ name: 'ContactExistsValidator', async: true })
export class ContactExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly contactService: ContactService) {}

  async validate(_, args: ContactExistsValidatorValidationArguments) {
    const { object: body } = args;

    const user = await this.contactService.findOne({
      name: body.name,
      phone: body.phone,
    });

    return !user;
  }

  defaultMessage(args: ContactExistsValidatorValidationArguments) {
    return `Contact ${args.object.name} - ${args.object.phone} already exists.`;
  }
}
