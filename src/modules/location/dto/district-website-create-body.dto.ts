import { Type } from 'class-transformer';
import { IsNumber, Validate } from 'class-validator';
import { EXIST_VALIDATOR_TYPE } from 'src/common/constants/validator.constant';
import { DistrictWebsiteExistsValidator } from '../validators/district-website-exists.validator';

export class DistrictWebsiteCreateBodyDto {
  @IsNumber()
  @Type(() => Number)
  @Validate(DistrictWebsiteExistsValidator, [EXIST_VALIDATOR_TYPE.EXISTS, 'ghnRefId'])
  id: number;
}
