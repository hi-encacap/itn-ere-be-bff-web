import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString, Min, MinLength } from 'class-validator';
import { IWebsite } from 'src/modules/website/constants/website.interface';
import { IRole, IUser } from '../interfaces/user.interface';

export class CreateUserDto implements IUser {
  id: number;
  website: IWebsite;
  roles: IRole[];

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsArray()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  roleIds: number[];

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @Min(0)
  websiteId: number;
}
