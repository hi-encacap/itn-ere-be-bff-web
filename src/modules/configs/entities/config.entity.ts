import { CONFIG_GROUP_ENUM, CONFIG_TYPE_ENUM } from '@encacap-group/types/dist/re';
import { BaseEntityWithPrimaryCodeColumn } from 'src/base/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ConfigWebsiteEntity } from './config-website.entity';

@Entity('configs')
export class ConfigEntity extends BaseEntityWithPrimaryCodeColumn {
  @Column({ name: 'default_value', type: 'varchar', length: 255 })
  defaultValue: string | number | boolean;

  @Column({ name: 'group', enum: CONFIG_GROUP_ENUM, type: 'enum', default: CONFIG_GROUP_ENUM.SITE })
  group: CONFIG_GROUP_ENUM;

  @Column({ name: 'type', enum: CONFIG_TYPE_ENUM, type: 'enum', default: CONFIG_TYPE_ENUM.STRING })
  type: CONFIG_TYPE_ENUM;

  @OneToMany(() => ConfigWebsiteEntity, (configWebsite) => configWebsite.config)
  configWebsites: ConfigWebsiteEntity[];
}
