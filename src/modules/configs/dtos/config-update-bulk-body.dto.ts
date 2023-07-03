import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ConfigUpdateBulkBodyItem } from './config-update-bulk-body-item.dto';

export class ConfigUpdateBulkBodyDto {
  @Type(() => ConfigUpdateBulkBodyItem)
  @ValidateNested({ each: true })
  items: ConfigUpdateBulkBodyItem[];
}
