import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { CategoryService } from '../services/category.service';

interface CategoryCanModifyValidatorValidationArguments extends ValidationArguments {
  object: {
    [key: string]: string | number;
  };
}

@ValidatorConstraint({ name: 'CategoryCanModifyValidator', async: true })
export class CategoryCanModifyValidator implements ValidatorConstraintInterface {
  constructor(private readonly categoryService: CategoryService) {}

  async validate(id: number, validationArguments?: CategoryCanModifyValidatorValidationArguments) {
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

  defaultMessage?(validationArguments?: CategoryCanModifyValidatorValidationArguments): string {
    return `Category ${validationArguments.value} can not be modified.`;
  }
}
