import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { CloudflareImageNotExistsValidator } from 'src/modules/cloudflare/validators/cloudflare-image-not-exists.validator';
import { ContactExistsValidator } from '../validators/contact-exists.validator';

export class CreateContactDto {
  @IsString()
  @Validate(ContactExistsValidator)
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @Validate(CloudflareImageNotExistsValidator)
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
