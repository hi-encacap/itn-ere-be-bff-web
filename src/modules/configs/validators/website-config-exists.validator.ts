import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { EXIST_VALIDATOR_TYPE } from 'src/common/constants/validator.constant';
import { ExistsConstraintValidationArguments } from 'src/common/interfaces/validator';
import { WEBSITE_CONFIG_ERROR_CODE } from '../constants/website-config-error-code.constant';
import { WebsiteConfigService } from '../services/website-config.service';

interface CustomValidatorConstraintInterface extends ExistsConstraintValidationArguments {
  object: Record<string, number>;
}

@ValidatorConstraint({ name: 'WebsiteConfigExistsValidator', async: true })
export class WebsiteConfigExistsValidator implements ValidatorConstraintInterface {
  private type: EXIST_VALIDATOR_TYPE;

  constructor(private readonly websiteConfigService: WebsiteConfigService) {}

  async validate(value: string, args: CustomValidatorConstraintInterface) {
    const { constraints = [], object } = args;
    const [type, key] = constraints;
    this.type = type;

    try {
      const config = await this.websiteConfigService.get({
        [key]: value,
        websiteId: object.websiteId,
      });

      return this.type === EXIST_VALIDATOR_TYPE.EXISTS ? Boolean(config) : !config;
    } catch (error) {
      return true;
    }
  }

  defaultMessage() {
    if (this.type === EXIST_VALIDATOR_TYPE.EXISTS) {
      return WEBSITE_CONFIG_ERROR_CODE.WEBSITE_CONFIG_NOT_EXISTS;
    }

    return WEBSITE_CONFIG_ERROR_CODE.WEBSITE_CONFIG_ALREADY_EXISTS;
  }
}
