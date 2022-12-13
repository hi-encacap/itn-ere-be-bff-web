import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { EXIST_VALIDATOR_TYPE } from 'src/common/constants/validator.constant';
import { ADDRESS_BOOK_ERROR_CODE } from '../constants/error.constant';
import { AddressBookService } from '../services/address-book.service';

interface ValidationArgumentsWithConstraints extends ValidationArguments {
  constraints: [EXIST_VALIDATOR_TYPE];
}

@ValidatorConstraint({ name: 'AddressBookExistsValidator', async: true })
export class AddressBookExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly addressBookService: AddressBookService) {}

  async validate(id: number, args: ValidationArgumentsWithConstraints) {
    const { constraints } = args;

    const province = await this.addressBookService.get({
      id,
    });

    if (constraints[0] === EXIST_VALIDATOR_TYPE.EXISTS) {
      return !province;
    }

    return Boolean(province);
  }

  defaultMessage(args: ValidationArgumentsWithConstraints) {
    if (args.constraints[0] === EXIST_VALIDATOR_TYPE.EXISTS) {
      return ADDRESS_BOOK_ERROR_CODE.ALREADY_EXISTS;
    }

    return ADDRESS_BOOK_ERROR_CODE.NOT_EXISTS;
  }
}
