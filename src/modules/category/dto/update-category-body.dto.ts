import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryBodyDto extends PartialType(CreateCategoryDto) {
  @Exclude()
  code: string;
}
