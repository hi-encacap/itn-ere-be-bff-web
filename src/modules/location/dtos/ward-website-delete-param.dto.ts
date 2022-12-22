import { IsString, Validate } from 'class-validator';
import { WardWebsiteExistsValidator } from '../validators/ward-website-exists.validator';

export class WardWebsiteDeleteParamDto {
  @IsString()
  @Validate(WardWebsiteExistsValidator)
  code!: string;
}
