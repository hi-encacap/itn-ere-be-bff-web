import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'ward_websites' })
export class WardWebsiteEntity {
  @PrimaryColumn({ name: 'ward_code' })
  wardCode: string;

  @PrimaryColumn({ name: 'website_id' })
  websiteId: number;
}
