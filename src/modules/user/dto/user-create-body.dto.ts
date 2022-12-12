/* eslint max-classes-per-file: ["error", 2] */

import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsString, Min, MinLength, Validate } from 'class-validator';
import { IWebsite } from 'src/modules/website/constants/website.interface';
import { WebsiteNotExistsValidator } from 'src/modules/website/validators/website-not-exists.validator';
import { IRole, IUser } from '../interfaces/user.interface';
import { EmailExistsValidator } from '../validators/email-exists.validator';
import { UsernameExistsValidator } from '../validators/username-exists.validator';

export class UserCreateBodyDto implements IUser {
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @Validate(UsernameExistsValidator)
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiPropertyOptional()
  @Validate(EmailExistsValidator)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  lastName: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @Min(0)
  @ApiPropertyOptional()
  @Validate(WebsiteNotExistsValidator)
  websiteId: number;

  id: number;
  website: IWebsite;
  roles: IRole[];
}
