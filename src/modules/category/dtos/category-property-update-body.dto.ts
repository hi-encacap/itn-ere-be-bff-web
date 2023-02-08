import { PartialType } from '@nestjs/swagger';
import { CategoryPropertyCreateBodyDto } from './category-property-create-body.dto';

export class CategoryPropertyUpdateBodyDto extends PartialType(CategoryPropertyCreateBodyDto) {}
