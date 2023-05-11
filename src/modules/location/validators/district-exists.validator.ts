import { ValidatorConstraint } from 'class-validator';
import { EXIST_VALIDATOR_TYPE } from 'src/common/constants/validator.constant';
import { ExistsConstraintValidationArguments } from 'src/common/interfaces/validator';
import { LOCATION_ERROR_CODE } from '../constants/location-error-code.constant';
import { DistrictService } from '../services/district.service';

@ValidatorConstraint({ name: 'DistrictExistsValidator', async: true })
export class DistrictExistsValidator {
  private type: EXIST_VALIDATOR_TYPE;

  constructor(private readonly districtService: DistrictService) {}

  async validate(code: string, args: ExistsConstraintValidationArguments) {
    const { constraints } = args;
    const [type] = constraints;

    this.type = type;

    try {
      const record = await this.districtService.get({ code });

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
      return LOCATION_ERROR_CODE.DISTRICT_NOT_EXISTS;
    }

    return LOCATION_ERROR_CODE.DISTRICT_ALREADY_EXISTS;
  }
}
