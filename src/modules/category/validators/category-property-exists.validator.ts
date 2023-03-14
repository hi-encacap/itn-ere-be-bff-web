import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { EXIST_VALIDATOR_TYPE } from 'src/common/constants/validator.constant';
import { ExistsConstraintValidationArguments } from 'src/common/interfaces/validator';
import { IEstateProperty } from 'src/modules/estate/interfaces/estate-property.interface';
import { FindOptionsWhere } from 'typeorm';
import { CATEGORY_ERROR_CODE } from '../constants/category-error-code.constant';
import { CategoryPropertyEntity } from '../entities/category-property.entity';
import { CategoryPropertyService } from '../services/category-property.service';

@ValidatorConstraint({ name: 'CategoryPropertyExistsValidator', async: true })
export class CategoryPropertyExistsValidator implements ValidatorConstraintInterface {
  private type: EXIST_VALIDATOR_TYPE;

  constructor(private readonly categoryPropertyService: CategoryPropertyService) {}

  async validate(input: number | IEstateProperty, args: ExistsConstraintValidationArguments) {
    const {
      constraints,
      object: { websiteId },
    } = args;
    const [type = EXIST_VALIDATOR_TYPE.EXISTS] = constraints;
    let query: FindOptionsWhere<CategoryPropertyEntity> | null = null;

    if (typeof input === 'object') {
      query = input;
    } else {
      query = { id: input };
    }

    this.type = type;

    try {
      const categoryProperty = await this.categoryPropertyService.get({
        ...query,
        websiteId: websiteId as number,
      });

      return this.type === EXIST_VALIDATOR_TYPE.EXISTS ? Boolean(categoryProperty) : !categoryProperty;
    } catch (error) {
      return false;
    }
  }

  defaultMessage() {
    return this.type === EXIST_VALIDATOR_TYPE.EXISTS
      ? CATEGORY_ERROR_CODE.CATEGORY_PROPERTY_NOT_EXISTS
      : CATEGORY_ERROR_CODE.CATEGORY_PROPERTY_ALREADY_EXISTS;
  }
}
