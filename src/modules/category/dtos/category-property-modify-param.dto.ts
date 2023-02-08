import { Type } from 'class-transformer';
import { IsNumber, Validate } from 'class-validator';
import { EXIST_VALIDATOR_TYPE } from 'src/common/constants/validator.constant';
import { CategoryPropertyExistsValidator } from '../validators/category-property-exists.validator';

export class CategoryPropertyModifyParamDto {
  @IsNumber()
  @Type(() => Number)
  @Validate(CategoryPropertyExistsValidator, [EXIST_VALIDATOR_TYPE.EXISTS])
  id: number;
}
