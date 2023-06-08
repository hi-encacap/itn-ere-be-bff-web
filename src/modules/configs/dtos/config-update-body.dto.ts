import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { ConfigCreateBodyDto } from './config-create-body.dto';

export class ConfigUpdateBodyDto extends PartialType(ConfigCreateBodyDto) {
  @Exclude()
  code: string;
}
