import { CONFIG_GROUP_ENUM, CONFIG_TYPE_ENUM } from '@encacap-group/types/dist/re';
import { BaseEntityWithPrimaryGeneratedColumn } from 'src/base/base.entity';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'website_configs' })
export class WebsiteConfigEntity extends BaseEntityWithPrimaryGeneratedColumn {
  @Column({ name: 'code' })
  code!: string;

  @Column({ name: 'value', type: String })
  value!: string | number | boolean;

  @Column({ name: 'type', enum: CONFIG_TYPE_ENUM })
  type!: CONFIG_TYPE_ENUM;

  @Column({ name: 'group', enum: CONFIG_GROUP_ENUM })
  group!: CONFIG_GROUP_ENUM;

  @Column({ name: 'website_id' })
  websiteId!: number;

  @ManyToOne(() => WebsiteEntity, (website) => website.websiteConfigs)
  @JoinColumn({ name: 'website_id', referencedColumnName: 'id' })
  website!: WebsiteEntity;
}
