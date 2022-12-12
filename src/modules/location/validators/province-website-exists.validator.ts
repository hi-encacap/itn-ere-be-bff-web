import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { EXIST_VALIDATOR_TYPE } from 'src/common/constants/validator.constant';
import { PROVINCE_WEBSITE_ERROR_CODE } from '../constants/error.constant';
import { ProvinceWebsiteService } from '../services/province-website.service';

interface ValidationArgumentsWithConstraints extends ValidationArguments {
  constraints: [EXIST_VALIDATOR_TYPE];
  object: {
    websiteId: number;
  };
}

@ValidatorConstraint({ name: 'ProvinceWebsiteExistsValidator', async: true })
export class ProvinceWebsiteExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly provinceWebsiteService: ProvinceWebsiteService) {}

  async validate(code: string, args: ValidationArgumentsWithConstraints) {
    const { constraints } = args;

    const province = await this.provinceWebsiteService.get({
      provinceCode: code,
      websiteId: args.object.websiteId,
    });

    if (constraints[0] === EXIST_VALIDATOR_TYPE.EXISTS) {
      return !province;
    }

    return Boolean(province);
  }

  defaultMessage(args: ValidationArgumentsWithConstraints) {
    if (args.constraints[0] === EXIST_VALIDATOR_TYPE.EXISTS) {
      return PROVINCE_WEBSITE_ERROR_CODE.PROVINCE_ALREADY_EXISTS;
    }

    return PROVINCE_WEBSITE_ERROR_CODE.PROVINCE_NOT_EXISTS;
  }
}
