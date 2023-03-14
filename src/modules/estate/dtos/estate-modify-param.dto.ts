import { Type } from 'class-transformer';
import { IsNumber, Validate } from 'class-validator';
import { EXIST_VALIDATOR_TYPE } from 'src/common/constants/validator.constant';
import { EstateExistsValidator } from '../validators/estate-exists.validator';

export class EstateModifyParamDto {
  @IsNumber()
  @Type(() => Number)
  @Validate(EstateExistsValidator, [EXIST_VALIDATOR_TYPE.EXISTS])
  id: number;
}
