import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { CategoryService } from '../services/category-service.service';

@ValidatorConstraint({ name: 'CategoryExistsValidator', async: true })
export class CategoryExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly categoryService: CategoryService) {}

  async validate(code: string) {
    const category = await this.categoryService.getOne({ code });

    return !category;
  }

  defaultMessage(args: ValidationArguments) {
    return `Category ${args.value} already exists.`;
  }
}
