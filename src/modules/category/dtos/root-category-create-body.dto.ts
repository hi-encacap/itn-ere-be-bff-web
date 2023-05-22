import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CategoryCreateBodyDto } from './category-create-body.dto';

export class RootCategoryCreateBody extends CategoryCreateBodyDto {
  @IsNumber()
  @ApiProperty()
  websiteId: number;
}
