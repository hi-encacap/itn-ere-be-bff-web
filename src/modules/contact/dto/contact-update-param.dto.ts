import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { ContactNotExistsValidator } from '../validators/contact-not-exists.validator';

export class ContactUpdateParamDto {
  @IsString()
  @IsNotEmpty()
  @Validate(ContactNotExistsValidator)
  @ApiProperty()
  id: number;
}
