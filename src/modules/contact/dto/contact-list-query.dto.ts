import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { BaseListQueryDto } from 'src/base/base.dto';

export class ContactListQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  websiteId?: number;
}
