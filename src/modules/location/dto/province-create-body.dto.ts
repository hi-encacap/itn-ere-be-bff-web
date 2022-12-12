import { Type } from 'class-transformer';
import { IsNumber, Validate } from 'class-validator';
import { EXIST_VALIDATOR_TYPE } from 'src/common/constants/validator.constant';
import { ProvinceExistsValidator } from '../validators/province-exists.validator';

export class ProvinceCreateBodyDto {
  @IsNumber()
  @Type(() => Number)
  @Validate(ProvinceExistsValidator, [EXIST_VALIDATOR_TYPE.EXISTS, 'ghnRefId'])
  id: number;
}
