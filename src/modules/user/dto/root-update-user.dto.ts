import { OmitType, PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { RootCreateUserDto } from './root-create-user.dto';

export class RootUpdateUserDto extends PartialType(OmitType(RootCreateUserDto, ['password'])) {
  @Exclude()
  password: string;
}
