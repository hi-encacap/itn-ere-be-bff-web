import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { EXIST_VALIDATOR_TYPE } from 'src/common/constants/validator.constant';
import { ExistsConstraintValidationArguments } from 'src/common/interfaces/validator';
import { CATEGORY_ERROR_CODE } from '../constants/category-error-code.constant';
import { CategoryService } from '../services/category.service';

@ValidatorConstraint({ name: 'CategoryExistsValidator', async: true })
export class CategoryExistsValidator implements ValidatorConstraintInterface {
  private type: EXIST_VALIDATOR_TYPE;

  constructor(private readonly categoryService: CategoryService) {}

  async validate(value: string, args: ExistsConstraintValidationArguments) {
    const { constraints = [] } = args;
    const [type, key] = constraints;

    this.type = type;

    try {
      const category = await this.categoryService.getOne({ [key]: value });

      return this.type === EXIST_VALIDATOR_TYPE.EXISTS ? Boolean(category) : !category;
    } catch (error) {
      return true;
    }
  }

  defaultMessage() {
    return this.type === EXIST_VALIDATOR_TYPE.EXISTS
      ? CATEGORY_ERROR_CODE.CATEGORY_NOT_EXISTS
      : CATEGORY_ERROR_CODE.CATEGORY_ALREADY_EXISTS;
  }
}
