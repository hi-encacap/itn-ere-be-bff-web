import { IsString, Validate } from 'class-validator';
import { EXIST_VALIDATOR_TYPE } from 'src/common/constants/validator.constant';
import { ProvinceWebsiteExistsValidator } from '../validators/province-website-exists.validator';

export class ProvinceWebsiteDeleteParamDto {
  @IsString()
  @Validate(ProvinceWebsiteExistsValidator, [EXIST_VALIDATOR_TYPE.EXISTS])
  code!: string;
}
