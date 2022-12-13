import { BaseEntityWithPrimaryCodeColumn } from 'src/base/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { DistrictEntity } from './district.entity';

@Entity({ name: 'wards' })
export class WardEntity extends BaseEntityWithPrimaryCodeColumn {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'district_code' })
  districtCode: string;

  @Column({ name: 'ghn_ref_id' })
  ghnRefId: number;

  @ManyToOne(() => DistrictEntity, (district) => district.wards)
  district: DistrictEntity;

  districtGhnRefId: number;
}
