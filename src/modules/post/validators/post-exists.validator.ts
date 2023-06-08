import { ValidatorConstraint } from 'class-validator';
import { EXIST_VALIDATOR_TYPE } from 'src/common/constants/validator.constant';
import { ExistsConstraintValidationArguments } from 'src/common/interfaces/validator';
import { POST_ERROR_CODE } from '../constants/post-error-code.constant';
import { PostService } from '../services/post.service';

interface ConstraintValidationArguments extends ExistsConstraintValidationArguments {
  object: {
    websiteId: number;
  };
}

@ValidatorConstraint({ name: 'PostExistsValidator', async: true })
export class PostExistsValidator {
  private type: EXIST_VALIDATOR_TYPE;

  constructor(private readonly postService: PostService) {}

  async validate(value: unknown, args: ConstraintValidationArguments) {
    const { object, constraints } = args;
    const [type, field] = constraints;

    this.type = type;

    const { websiteId } = object;

    try {
      const record = await this.postService.get({ [field]: value, websiteId });

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
      return POST_ERROR_CODE.POST_NOT_EXISTS;
    }

    return POST_ERROR_CODE.POST_ALREADY_EXISTS;
  }
}
