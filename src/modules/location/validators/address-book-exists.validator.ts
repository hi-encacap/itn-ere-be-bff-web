import { ValidatorConstraint } from 'class-validator';
import { EXIST_VALIDATOR_TYPE } from 'src/common/constants/validator.constant';
import { ExistsConstraintValidationArguments } from 'src/common/interfaces/validator';
import { LOCATION_ERROR_CODE } from '../constants/location-error-code.constant';
import { AddressBookService } from '../services/address-book.service';

@ValidatorConstraint({ name: 'AddressBookWebsiteExistsValidator', async: true })
export class AddressBookWebsiteExistsValidator {
  private type: EXIST_VALIDATOR_TYPE;

  constructor(private readonly addressBookService: AddressBookService) {}

  async validate(id: number, args: ExistsConstraintValidationArguments) {
    const { constraints } = args;
    const [type] = constraints;

    this.type = type;

    try {
      const record = await this.addressBookService.get({ id });

      if (this.type === EXIST_VALIDATOR_TYPE.EXISTS) {
        return Boolean(record);
      }

      return !record;
    } catch (error) {
      return false;
    }
  }

  defaultMessage() {
    if (this.type === EXIST_VALIDATOR_TYPE.EXISTS) {
      return LOCATION_ERROR_CODE.ADDRESS_BOOK_NOT_EXISTS;
    }

    return LOCATION_ERROR_CODE.ADDRESS_BOOK_ALREADY_EXISTS;
  }
}
