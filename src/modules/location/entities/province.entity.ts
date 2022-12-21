import { BaseEntityWithPrimaryCodeColumn } from 'src/base/base.entity';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Column, Entity } from 'typeorm';

@Entity('provinces')
export class ProvinceEntity extends BaseEntityWithPrimaryCodeColumn {
  @Column()
  name!: string;

  @Column({ name: 'country_code' })
  countryCode!: string;

  @Column({ name: 'ghn_ref_id' })
  ghnRefId!: number;

  website?: WebsiteEntity;
}
