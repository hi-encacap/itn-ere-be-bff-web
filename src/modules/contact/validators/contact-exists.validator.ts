import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { CONTACT_ERROR_CODE } from 'src/common/constants/error.constant';
import { ContactCreateBodyDto } from '../dtos/contact-create-body.dto';
import { ContactService } from '../services/contact.service';

interface ContactExistsValidatorValidationArguments extends ValidationArguments {
  object: ContactCreateBodyDto;
}

@ValidatorConstraint({ name: 'ContactExistsValidator', async: true })
export class ContactExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly contactService: ContactService) {}

  async validate(_, args: ContactExistsValidatorValidationArguments) {
    const { object: body } = args;

    try {
      const contact = await this.contactService.get({
        name: body.name,
        phone: body.phone,
      });

      return !contact;
    } catch (error) {
      return true;
    }
  }

  defaultMessage() {
    return CONTACT_ERROR_CODE.CONTACT_ALREADY_EXISTS;
  }
}
