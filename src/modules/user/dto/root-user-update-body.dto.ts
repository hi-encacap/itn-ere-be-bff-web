import { OmitType, PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { RootUserCreateBodyDto } from './root-user-create-body.dto';

export class RootUserUpdateBodyDto extends PartialType(OmitType(RootUserCreateBodyDto, ['password'])) {
  @Exclude()
  password: string;
}
