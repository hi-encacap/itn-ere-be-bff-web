import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { EXIST_VALIDATOR_TYPE } from 'src/common/constants/validator.constant';
import { WARD_WEBSITE_ERROR_CODE } from '../constants/error.constant';
import { WardWebsiteService } from '../services/ward-website.service';

interface ValidationArgumentsWithConstraints extends ValidationArguments {
  constraints: [EXIST_VALIDATOR_TYPE];
  object: {
    websiteId: number;
  };
}

@ValidatorConstraint({ name: 'WardWebsiteExistsValidator', async: true })
export class WardWebsiteExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly wardWebsiteService: WardWebsiteService) {}

  async validate(code: string, args: ValidationArgumentsWithConstraints) {
    const { constraints } = args;

    const province = await this.wardWebsiteService.get({
      wardCode: code,
      websiteId: args.object.websiteId,
    });

    if (constraints[0] === EXIST_VALIDATOR_TYPE.EXISTS) {
      return !province;
    }

    return Boolean(province);
  }

  defaultMessage(args: ValidationArgumentsWithConstraints) {
    if (args.constraints[0] === EXIST_VALIDATOR_TYPE.EXISTS) {
      return WARD_WEBSITE_ERROR_CODE.ALREADY_EXISTS;
    }

    return WARD_WEBSITE_ERROR_CODE.NOT_EXISTS;
  }
}
