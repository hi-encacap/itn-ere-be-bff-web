import { IsString, Validate } from 'class-validator';
import { EXIST_VALIDATOR_TYPE } from 'src/common/constants/validator.constant';
import { WardWebsiteExistsValidator } from '../validators/ward-website-exists.validator';

export class WardWebsiteDeleteParamDto {
  @IsString()
  @Validate(WardWebsiteExistsValidator, [EXIST_VALIDATOR_TYPE.NOT_EXISTS])
  code: string;
}
