import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { BaseListQueryDto } from 'src/base/base.dto';

export class WebsiteConfigListQueryDto extends BaseListQueryDto {
  @ApiPropertyOptional({ type: String, isArray: true })
  @IsOptional()
  codes?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  websiteId?: number;
}
