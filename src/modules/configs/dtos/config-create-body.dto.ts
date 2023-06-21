import { CONFIG_TYPE_ENUM } from '@encacap-group/common/dist/re';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, Validate } from 'class-validator';
import { EXIST_VALIDATOR_TYPE } from 'src/common/constants/validator.constant';
import { WebsiteConfigExistsValidator } from '../validators/website-config-exists.validator';

export class ConfigCreateBodyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Validate(WebsiteConfigExistsValidator, [EXIST_VALIDATOR_TYPE.NOT_EXISTS, 'code'])
  code: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  value: string;

  @IsEnum(CONFIG_TYPE_ENUM)
  @IsNotEmpty()
  @ApiProperty({ enum: CONFIG_TYPE_ENUM, enumName: 'CONFIG_TYPE_ENUM' })
  type: CONFIG_TYPE_ENUM;
}
