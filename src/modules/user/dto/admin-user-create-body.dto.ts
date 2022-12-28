import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { UserCreateBodyDto } from './user-create-body.dto';

export class AdminUserCreateBodyDto extends UserCreateBodyDto {
  @IsArray({
    groups: ['admin'],
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  @ApiPropertyOptional({
    isArray: true,
  })
  roleIds: number[];
}
