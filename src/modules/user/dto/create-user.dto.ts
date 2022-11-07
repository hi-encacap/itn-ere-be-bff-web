import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString, Min, MinLength, Validate } from 'class-validator';
import { RoleEnum } from 'src/common/constants/role.constant';
import { IWebsite } from 'src/modules/website/constants/website.interface';
import { WebsiteNotExistsValidator } from 'src/modules/website/validators/website-not-exists.validator';
import { IRole, IUser } from '../interfaces/user.interface';
import { EmailExistsValidator } from '../validators/email-exists.validator';
import { RoleArrayNotExistsValidator } from '../validators/role-array-not-exists.validator';

export class RootCreateUserDto implements IUser {
  id: number;
  website: IWebsite;
  roles: IRole[];

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

  @IsArray()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  @Validate(RoleArrayNotExistsValidator, [RoleEnum.ROOT, RoleEnum.MANAGER, RoleEnum.USER])
  @ApiPropertyOptional()
  roleIds: number[];

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @Min(0)
  @ApiPropertyOptional()
  @Validate(WebsiteNotExistsValidator)
  websiteId: number;
}

export class AdminCreateUserDto extends OmitType(RootCreateUserDto, ['roleIds']) {
  @IsArray({
    groups: ['admin'],
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  @ApiPropertyOptional()
  roleIds: number[];
}
