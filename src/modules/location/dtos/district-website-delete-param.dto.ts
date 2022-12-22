import { IsString, Validate } from 'class-validator';

export class DistrictWebsiteDeleteParamDto {
  @IsString()
  @Validate(DistrictWebsiteDeleteParamDto)
  code!: string;
}
