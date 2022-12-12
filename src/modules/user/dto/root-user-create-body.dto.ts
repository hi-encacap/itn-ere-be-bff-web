/* eslint max-classes-per-file: ["error", 2] */

import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, Validate } from 'class-validator';
import { ROLE_ENUM } from 'src/common/constants/role.constant';
import { RoleArrayNotExistsValidator } from '../validators/role-array-not-exists.validator';
import { UserCreateBodyDto } from './user-create-body.dto';

export class RootUserCreateBodyDto extends UserCreateBodyDto {
  @IsArray()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  @Validate(RoleArrayNotExistsValidator, [ROLE_ENUM.ROOT, ROLE_ENUM.ADMIN, ROLE_ENUM.MANAGER])
  @ApiPropertyOptional()
  roleIds: number[];
}
