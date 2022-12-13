import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'district_websites' })
export class DistrictWebsiteEntity {
  @PrimaryColumn({ name: 'district_code' })
  districtCode: string;

  @PrimaryColumn({ name: 'website_id' })
  websiteId: number;
}
