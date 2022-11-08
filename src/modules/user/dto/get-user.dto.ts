import { IsOptional, IsString } from 'class-validator';

export class GetUserQueryParamsDto {
  @IsOptional()
  @IsString()
  emails: string[];

  @IsOptional()
  @IsString()
  firstNames: string[];

  @IsOptional()
  @IsString()
  lastNames: string[];

  @IsOptional()
  @IsString()
  websiteNames?: string[];

  @IsOptional()
  @IsString()
  websiteDomains?: string[];

  @IsOptional()
  @IsString()
  roleNames?: string;
}
