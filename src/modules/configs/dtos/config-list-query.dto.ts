import { CONFIG_CODE_ENUM } from '@encacap-group/types/dist/re';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { BaseListQueryDto } from 'src/base/base.dto';

export class ConfigListQueryDto extends BaseListQueryDto {
  @ApiPropertyOptional({ type: String, enum: CONFIG_CODE_ENUM, isArray: true })
  @IsOptional()
  @IsEnum(CONFIG_CODE_ENUM, { each: true })
  codes?: CONFIG_CODE_ENUM[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  websiteId?: number;
}
