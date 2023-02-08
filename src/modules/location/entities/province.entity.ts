import { BaseEntityWithPrimaryCodeColumn } from 'src/base/base.entity';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { DistrictEntity } from './district.entity';

@Entity('provinces')
export class ProvinceEntity extends BaseEntityWithPrimaryCodeColumn {
  @Column()
  name!: string;

  @Column({ name: 'country_code' })
  countryCode!: string;

  @Column({ name: 'ghn_ref_id' })
  ghnRefId!: number;

  @OneToMany(() => DistrictEntity, (district) => district.province)
  districts?: DistrictEntity[];

  website?: WebsiteEntity;
}
