import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { CONTACT_ERROR_CODE } from 'src/common/constants/error.constant';
import { ContactService } from '../services/contact.service';

@ValidatorConstraint({ name: 'ContactNotExistsValidator', async: true })
export class ContactNotExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly contactService: ContactService) {}

  async validate(id: number) {
    const user = await this.contactService.get({
      id,
    });

    return Boolean(user);
  }

  defaultMessage() {
    return CONTACT_ERROR_CODE.CONTACT_NOT_EXISTS;
  }
}
