import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UserService } from '../services/user.service';

@ValidatorConstraint({ name: 'UsernameExistsValidator', async: true })
export class UsernameExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(username: string) {
    const user = await this.userService.findOne({ username });

    return !user;
  }

  defaultMessage(args: ValidationArguments) {
    return `Username ${args.value} has already been taken.`;
  }
}
