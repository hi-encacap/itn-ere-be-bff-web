import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { RootCreateUserDto } from './root-create-user.dto';

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
