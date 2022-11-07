import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UserService } from '../services/user.service';

@ValidatorConstraint({ name: 'EmailExistsValidator', async: true })
export class EmailExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(email: string) {
    const user = await this.userService.findOne({ email });

    return !user;
  }

  defaultMessage(args: ValidationArguments) {
    return `Email ${args.value} has already been taken.`;
  }
}
