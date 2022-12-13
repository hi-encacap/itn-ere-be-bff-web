import { Type } from 'class-transformer';
import { IsNumber, Validate } from 'class-validator';
import { EXIST_VALIDATOR_TYPE } from 'src/common/constants/validator.constant';
import { DistrictWebsiteExistsValidator } from '../validators/district-website-exists.validator';
import { WardWebsiteExistsValidator } from '../validators/ward-website-exists.validator';

export class WardWebsiteCreateBodyDto {
  @IsNumber()
  @Type(() => Number)
  @Validate(WardWebsiteExistsValidator, [EXIST_VALIDATOR_TYPE.EXISTS, 'ghnRefId'])
  id: number;

  @IsNumber()
  @Type(() => Number)
  @Validate(DistrictWebsiteExistsValidator, [EXIST_VALIDATOR_TYPE.EXISTS])
  districtGhnRefId: number;
}
