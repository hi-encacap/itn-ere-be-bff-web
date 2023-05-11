/* eslint max-classes-per-file: ["error", 2] */

import { IREUser, IWebsite } from '@encacap-group/types/dist/re';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Allow, IsEmail, IsNotEmpty, IsNumber, IsString, Min, MinLength, Validate } from 'class-validator';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { WebsiteNotExistsValidator } from 'src/modules/website/validators/website-not-exists.validator';
import { RoleEntity } from '../entities/role.entity';
import { EmailExistsValidator } from '../validators/email-exists.validator';
import { UsernameExistsValidator } from '../validators/username-exists.validator';

export class UserCreateBodyDto implements IREUser {
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
  @Type(() => WebsiteEntity)
  website: IWebsite;

  @Allow()
  @Type(() => RoleEntity)
  roles: RoleEntity[];
}
