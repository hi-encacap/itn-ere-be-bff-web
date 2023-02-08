import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { WardEntity } from './ward.entity';

@Entity({ name: 'ward_websites' })
export class WardWebsiteEntity {
  @PrimaryColumn({ name: 'ward_code' })
  wardCode: string;

  @PrimaryColumn({ name: 'website_id' })
  websiteId: number;

  @ManyToOne(() => WardEntity)
  @JoinColumn({ name: 'ward_code', referencedColumnName: 'code' })
  ward: WardEntity;

  @ManyToOne(() => WebsiteEntity)
  @JoinColumn({ name: 'website_id', referencedColumnName: 'id' })
  website: WebsiteEntity;
}
