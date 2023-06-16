import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CategoryCreateBodyDto } from './category-create-body.dto';

export class CategoryUpdateBodyDto extends PartialType(CategoryCreateBodyDto) {
  @Exclude()
  code: string;

  @Exclude()
  parentId?: number;
}
