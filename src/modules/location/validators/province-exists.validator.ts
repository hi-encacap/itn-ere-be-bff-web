import { ValidatorConstraint } from 'class-validator';
import { EXIST_VALIDATOR_TYPE } from 'src/common/constants/validator.constant';
import { ExistsConstraintValidationArguments } from 'src/common/interfaces/validator';
import { LOCATION_ERROR_CODE } from '../constants/location-error-code.constant';
import { ProvinceService } from '../services/province.service';

@ValidatorConstraint({ name: 'ProvinceExistsValidator', async: true })
export class ProvinceExistsValidator {
  private type: EXIST_VALIDATOR_TYPE;

  constructor(private readonly provinceService: ProvinceService) {}

  async validate(code: string, args: ExistsConstraintValidationArguments) {
    const { constraints } = args;
    const [type] = constraints;

    this.type = type;

    try {
      const record = await this.provinceService.get({ code });

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
      return LOCATION_ERROR_CODE.PROVINCE_NOT_EXISTS;
    }

    return LOCATION_ERROR_CODE.PROVINCE_ALREADY_EXISTS;
  }
}
