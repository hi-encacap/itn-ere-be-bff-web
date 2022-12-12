import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'province_websites' })
export class ProvinceWebsiteEntity {
  @PrimaryColumn({ name: 'province_code' })
  provinceCode: string;

  @PrimaryColumn({ name: 'website_id' })
  websiteId: number;
}
