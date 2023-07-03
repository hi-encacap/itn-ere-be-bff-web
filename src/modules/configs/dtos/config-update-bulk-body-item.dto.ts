import { EXIST_VALIDATOR_TYPE } from '@constants/validator.constant';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { WebsiteConfigExistsValidator } from '../validators/website-config-exists.validator';
import { ConfigCreateBodyDto } from './config-create-body.dto';

export class ConfigUpdateBulkBodyItem extends PartialType(ConfigCreateBodyDto) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Validate(WebsiteConfigExistsValidator, [EXIST_VALIDATOR_TYPE.EXISTS, 'code'])
  code: string;
}
