import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { CategoryService } from '../services/category.service';

interface CategoryCanDeleteValidatorValidationArguments extends ValidationArguments {
  object: {
    [key: string]: string | number;
  };
}

@ValidatorConstraint({ name: 'CategoryCanDeleteValidator', async: true })
export class CategoryCanDeleteValidator implements ValidatorConstraintInterface {
  constructor(private readonly categoryService: CategoryService) {}

  async validate(id: number, validationArguments?: CategoryCanDeleteValidatorValidationArguments) {
    try {
      const category = await this.categoryService.get({
        id,
        websiteId: Number(validationArguments?.object.websiteId),
      });
      return Boolean(category);
    } catch (error) {
      return false;
    }
  }

  defaultMessage?(validationArguments?: CategoryCanDeleteValidatorValidationArguments): string {
    return `Category ${validationArguments.value} can not be deleted.`;
  }
}
