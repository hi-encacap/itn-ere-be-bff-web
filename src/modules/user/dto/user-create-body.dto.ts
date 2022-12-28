/* eslint max-classes-per-file: ["error", 2] */

import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  Allow,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  Min,
  MinLength,
  Validate,
} from 'class-validator';
import { IUser, IWebsite } from 'encacap/dist/re';
import { WebsiteNotExistsValidator } from 'src/modules/website/validators/website-not-exists.validator';
import { RoleEntity } from '../entities/role.entity';
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

  @Allow()
  id: number;

  @Allow()
  @IsObject()
  website: IWebsite;

  @IsDefined()
  @Type(() => RoleEntity)
  roles: RoleEntity[];
}
