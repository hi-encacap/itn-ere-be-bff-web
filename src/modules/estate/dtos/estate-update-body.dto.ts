import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { EstateCreateBodyDto } from './estate-create-body.dto';

export class EstateUpdateBodyDto extends PartialType(EstateCreateBodyDto) {
  @Exclude()
  id?: number;
}
