import { Entity, PrimaryColumn } from 'typeorm';
import { ProvinceEntity } from './province.entity';

@Entity({ name: 'province_websites' })
export class ProvinceWebsiteEntity {
  @PrimaryColumn({ name: 'province_code' })
  provinceCode: string;

  @PrimaryColumn({ name: 'website_id' })
  websiteId: number;

  province: ProvinceEntity;
}
