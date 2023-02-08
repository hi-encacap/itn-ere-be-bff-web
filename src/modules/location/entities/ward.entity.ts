import { BaseEntityWithPrimaryCodeColumn } from 'src/base/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DistrictEntity } from './district.entity';

@Entity({ name: 'wards' })
export class WardEntity extends BaseEntityWithPrimaryCodeColumn {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'ghn_ref_id' })
  ghnRefId: number;

  @Column({ name: 'district_code' })
  districtCode: string;

  @ManyToOne(() => DistrictEntity, (district) => district.wards)
  @JoinColumn({ name: 'district_code', referencedColumnName: 'code' })
  district: DistrictEntity;

  websiteId?: number;
}
