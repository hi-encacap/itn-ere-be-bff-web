import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { DistrictEntity } from './district.entity';

@Entity({ name: 'district_websites' })
export class DistrictWebsiteEntity {
  @PrimaryColumn({ name: 'district_code' })
  districtCode: string;

  @PrimaryColumn({ name: 'website_id' })
  websiteId: number;

  @ManyToOne(() => DistrictEntity)
  @JoinColumn({ name: 'district_code', referencedColumnName: 'code' })
  district: DistrictEntity;

  @ManyToOne(() => WebsiteEntity)
  @JoinColumn({ name: 'website_id', referencedColumnName: 'id' })
  website: WebsiteEntity;
}
