import { BaseEntityWithPrimaryCodeColumn } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'provinces' })
export class ProvinceEntity extends BaseEntityWithPrimaryCodeColumn {
  @Column()
  name: string;

  @Column({ name: 'ghn_ref_id' })
  ghnRefId: number;
}
