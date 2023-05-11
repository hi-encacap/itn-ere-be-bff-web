import { UNIT_PRICE_TYPE_ENUM } from '@encacap-group/types/dist/re';
import { ValidatorConstraint } from 'class-validator';
import { EXIST_VALIDATOR_TYPE } from 'src/common/constants/validator.constant';
import { ExistsConstraintValidationArguments } from 'src/common/interfaces/validator';
import { UNIT_PRICE_ERROR_CODE } from '../constants/unit-price-error-code.constant';
import { UnitPriceService } from '../services/unit-price.service';

@ValidatorConstraint({ name: 'UnitPriceExistsValidator', async: true })
export class UnitPriceExistsValidator {
  private type: EXIST_VALIDATOR_TYPE;

  constructor(private readonly unitPriceService: UnitPriceService) {}

  async validate(id: number, args: ExistsConstraintValidationArguments) {
    const { constraints } = args;
    const [type, unitPriceType] = constraints;

    this.type = type;

    try {
      const record = await this.unitPriceService.get({ id, type: unitPriceType as UNIT_PRICE_TYPE_ENUM });

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
      return UNIT_PRICE_ERROR_CODE.UNIT_PRICE_NOT_EXISTS;
    }

    return UNIT_PRICE_ERROR_CODE.UNIT_PRICE_ALREADY_EXISTS;
  }
}
