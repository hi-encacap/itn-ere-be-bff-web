import { IsString, Validate } from 'class-validator';
import { EXIST_VALIDATOR_TYPE } from 'src/common/constants/validator.constant';
import { DistrictWebsiteExistsValidator } from '../validators/district-website-exists.validator';

export class DistrictWebsiteDeleteParamDto {
  @IsString()
  @Validate(DistrictWebsiteExistsValidator, [EXIST_VALIDATOR_TYPE.EXISTS])
  code!: string;
}
