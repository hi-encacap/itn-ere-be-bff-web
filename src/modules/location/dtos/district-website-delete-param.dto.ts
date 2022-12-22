import { IsString, Validate } from 'class-validator';
import { DistrictWebsiteExistsValidator } from '../validators/district-website-exists.validator';

export class DistrictWebsiteDeleteParamDto {
  @IsString()
  @Validate(DistrictWebsiteExistsValidator)
  code!: string;
}
