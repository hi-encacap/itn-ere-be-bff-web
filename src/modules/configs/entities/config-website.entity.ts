import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ConfigEntity } from './config.entity';

@Entity({ name: 'config_websites' })
export class ConfigWebsiteEntity {
  @PrimaryColumn({ name: 'website_id', type: 'int' })
  websiteId: number;

  @PrimaryColumn({ name: 'config_code', type: 'varchar', length: 255 })
  configCode: string;

  @Column({ name: 'value', type: 'varchar', length: 255 })
  value: string;

  @ManyToOne(() => ConfigEntity)
  @JoinColumn({ name: 'config_code', referencedColumnName: 'code' })
  config: ConfigEntity;

  @ManyToOne(() => WebsiteEntity)
  @JoinColumn({ name: 'website_id', referencedColumnName: 'id' })
  website: WebsiteEntity;
}
