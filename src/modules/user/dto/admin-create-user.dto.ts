import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class AdminCreateUserDto extends CreateUserDto {
  @IsArray({
    groups: ['admin'],
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  @ApiPropertyOptional()
  roleIds: number[];
}
