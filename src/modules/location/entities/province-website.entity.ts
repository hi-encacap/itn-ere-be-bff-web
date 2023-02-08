import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProvinceEntity } from './province.entity';

@Entity({ name: 'province_websites' })
export class ProvinceWebsiteEntity {
  @PrimaryColumn({ name: 'province_code' })
  provinceCode!: string;

  @PrimaryColumn({ name: 'website_id' })
  websiteId!: number;

  @ManyToOne(() => ProvinceEntity)
  @JoinColumn({ name: 'province_code', referencedColumnName: 'code' })
  province?: ProvinceEntity;

  @ManyToOne(() => WebsiteEntity)
  @JoinColumn({ name: 'website_id', referencedColumnName: 'id' })
  website?: WebsiteEntity;
}
