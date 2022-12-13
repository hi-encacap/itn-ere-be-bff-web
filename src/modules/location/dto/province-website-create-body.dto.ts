import { Type } from 'class-transformer';
import { IsNumber, Validate } from 'class-validator';
import { EXIST_VALIDATOR_TYPE } from 'src/common/constants/validator.constant';
import { ProvinceWebsiteExistsValidator } from '../validators/province-website-exists.validator';

export class ProvinceWebsiteCreateBodyDto {
  @IsNumber()
  @Type(() => Number)
  @Validate(ProvinceWebsiteExistsValidator, [EXIST_VALIDATOR_TYPE.EXISTS, 'ghnRefId'])
  id: number;
}
