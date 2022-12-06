import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ContactService } from '../services/contact.service';

@ValidatorConstraint({ name: 'ContactNotExistsValidator', async: true })
export class ContactNotExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly contactService: ContactService) {}

  async validate(id: number, args: ValidationArguments) {
    console.log(args);

    const user = await this.contactService.findOne({
      id,
      userId: args.object['userId'],
    });

    return Boolean(user);
  }

  defaultMessage(args: ValidationArguments) {
    return `Contact with id ${args.value} does not exists.`;
  }
}
