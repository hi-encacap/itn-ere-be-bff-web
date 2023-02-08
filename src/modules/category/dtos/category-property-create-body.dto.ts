import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, Validate } from 'class-validator';
import { EXIST_VALIDATOR_TYPE } from 'src/common/constants/validator.constant';
import { CategoryExistsValidator } from '../validators/category-exists.validator';

export class CategoryPropertyCreateBodyDto {
  @IsString()
  @ApiProperty({ name: 'name', type: String })
  name: string;

  @IsNumber()
  @Type(() => Number)
  @Validate(CategoryExistsValidator, [EXIST_VALIDATOR_TYPE.EXISTS, 'id'])
  @ApiProperty({ name: 'categoryId', type: Number })
  categoryId: number;
}
