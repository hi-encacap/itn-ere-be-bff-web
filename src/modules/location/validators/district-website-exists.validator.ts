import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { EXIST_VALIDATOR_TYPE } from 'src/common/constants/validator.constant';
import { DISTRICT_WEBSITE_ERROR_CODE } from '../constants/error.constant';
import { DistrictWebsiteService } from '../services/district-website.service';

interface ValidationArgumentsWithConstraints extends ValidationArguments {
  constraints: [EXIST_VALIDATOR_TYPE];
  object: {
    websiteId: number;
  };
}

@ValidatorConstraint({ name: 'DistrictWebsiteExistsValidator', async: true })
export class DistrictWebsiteExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly districtWebsiteService: DistrictWebsiteService) {}

  async validate(code: string, args: ValidationArgumentsWithConstraints) {
    const { constraints } = args;

    const province = await this.districtWebsiteService.get({
      districtCode: code,
      websiteId: args.object.websiteId,
    });

    if (constraints[0] === EXIST_VALIDATOR_TYPE.EXISTS) {
      return !province;
    }

    return Boolean(province);
  }

  defaultMessage(args: ValidationArgumentsWithConstraints) {
    if (args.constraints[0] === EXIST_VALIDATOR_TYPE.EXISTS) {
      return DISTRICT_WEBSITE_ERROR_CODE.ALREADY_EXISTS;
    }

    return DISTRICT_WEBSITE_ERROR_CODE.NOT_EXISTS;
  }
}
