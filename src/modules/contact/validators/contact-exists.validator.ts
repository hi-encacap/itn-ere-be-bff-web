import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { CONTACT_ERROR_CODE } from 'src/common/constants/error.constant';
import { ContactCreateBodyDto } from '../dto/contact-create-body.dto';
import { ContactService } from '../services/contact.service';

interface ContactExistsValidatorValidationArguments extends ValidationArguments {
  object: ContactCreateBodyDto;
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

  defaultMessage() {
    return CONTACT_ERROR_CODE.CONTACT_ALREADY_EXISTS;
  }
}
