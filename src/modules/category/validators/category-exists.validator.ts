import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { CategoryService } from '../services/category.service';

@ValidatorConstraint({ name: 'CategoryExistsValidator', async: true })
export class CategoryExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly categoryService: CategoryService) {}

  async validate(code: string) {
    try {
      await this.categoryService.getOne({ code });
      return false;
    } catch (error) {
      return true;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `Category ${args.value} already exists.`;
  }
}
