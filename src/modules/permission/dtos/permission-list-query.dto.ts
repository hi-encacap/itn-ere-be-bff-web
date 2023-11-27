import { BaseListQueryDto } from '@bases/base.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PermissionListQueryDto extends BaseListQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
