import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { EXIST_VALIDATOR_TYPE } from 'src/common/constants/validator.constant';
import { PROVINCE_ERROR_CODE } from '../constants/error.constant';
import { ProvinceService } from '../services/province.service';

interface ValidationArgumentsWithConstraints extends ValidationArguments {
  constraints: [EXIST_VALIDATOR_TYPE];
  object: {
    websiteId: number;
  };
}

@ValidatorConstraint({ name: 'ProvinceExistsValidator', async: true })
export class ProvinceExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly provinceService: ProvinceService) {}

  async validate(id: number, args: ValidationArgumentsWithConstraints) {
    const { constraints } = args;

    const province = await this.provinceService.get({
      ghnRefId: id,
    });

    if (constraints[0] === EXIST_VALIDATOR_TYPE.EXISTS) {
      return !province;
    }

    return Boolean(province);
  }

  defaultMessage(args: ValidationArgumentsWithConstraints) {
    if (args.constraints[0] === EXIST_VALIDATOR_TYPE.EXISTS) {
      return PROVINCE_ERROR_CODE.PROVINCE_ALREADY_EXISTS;
    }

    return PROVINCE_ERROR_CODE.PROVINCE_NOT_EXISTS;
  }
}
