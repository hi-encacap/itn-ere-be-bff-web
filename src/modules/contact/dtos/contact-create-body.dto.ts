import { ImageNotExistsValidator } from '@modules/image/validators/image-not-exists.validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { ContactExistsValidator } from '../validators/contact-exists.validator';

export class ContactCreateBodyDto {
  @IsString()
  @Validate(ContactExistsValidator)
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @Validate(ImageNotExistsValidator)
  @ApiProperty()
  avatarId: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional()
  email: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  zalo: string;
}
