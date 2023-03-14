import { ValidatorConstraint } from 'class-validator';
import { EXIST_VALIDATOR_TYPE } from 'src/common/constants/validator.constant';
import { ExistsConstraintValidationArguments } from 'src/common/interfaces/validator';
import { ESTATE_ERROR_CODE } from '../constants/estate-error-code.constant';
import { EstateService } from '../services/estate.service';

interface ConstraintValidationArguments extends ExistsConstraintValidationArguments {
  object: {
    id: number;
    websiteId: number;
  };
}

@ValidatorConstraint({ name: 'EstateExistsValidator', async: true })
export class EstateExistsValidator {
  private type: EXIST_VALIDATOR_TYPE;

  constructor(private readonly estateService: EstateService) {}

  async validate(_, args: ConstraintValidationArguments) {
    const { object, constraints } = args;
    const [type] = constraints;

    this.type = type;

    const { id, websiteId } = object;

    try {
      const record = await this.estateService.get({ id, websiteId });

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
      return ESTATE_ERROR_CODE.ESTATE_NOT_EXISTS;
    }

    return ESTATE_ERROR_CODE.ESTATE_ALREADY_EXISTS;
  }
}
