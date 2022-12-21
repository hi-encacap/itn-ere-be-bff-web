import { ValidationArguments, ValidatorConstraint } from 'class-validator';
import { EXIST_VALIDATOR_TYPE } from 'src/common/constants/validator.constant';
import { LOCATION_ERROR_CODE } from '../constants/location-error-code.constant';
import { ProvinceWebsiteService } from '../services/province-website.service';

interface ConstraintValidationArguments extends ValidationArguments {
  constraints: [EXIST_VALIDATOR_TYPE];
  object: {
    code: string;
    websiteId: number;
  };
}

@ValidatorConstraint({ name: 'ProvinceWebsiteExistsValidator', async: true })
export class ProvinceWebsiteExistsValidator {
  private type: EXIST_VALIDATOR_TYPE;

  constructor(private readonly provinceWebsiteService: ProvinceWebsiteService) {}

  async validate(_, args: ConstraintValidationArguments) {
    const { object, constraints } = args;
    const [type] = constraints;

    this.type = type;

    const { code, websiteId } = object;

    try {
      const record = await this.provinceWebsiteService.get({ provinceCode: code, websiteId });

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
