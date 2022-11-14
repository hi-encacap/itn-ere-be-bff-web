import { IsEmail, IsOptional, IsString, Validate } from 'class-validator';
import { ContactExistsValidator } from '../validators/contact-exists.validator';

export class CreateContactDto {
  @IsString()
  @Validate(ContactExistsValidator)
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  zalo: string;
}
