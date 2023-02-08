import { Type } from 'class-transformer';
import { IsNumber, Validate } from 'class-validator';
import { EXIST_VALIDATOR_TYPE } from 'src/common/constants/validator.constant';
import { AddressBookWebsiteExistsValidator } from '../validators/address-book-exists.validator';

export class AddressBookDeleteParamDto {
  @IsNumber()
  @Type(() => Number)
  @Validate(AddressBookWebsiteExistsValidator, [EXIST_VALIDATOR_TYPE.EXISTS])
  id!: number;
}
