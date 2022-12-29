import { ESTATE_QUARTER_ENUM } from 'encacap/dist/re';
import { BaseEntityWithPrimaryCodeColumn } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'estate_quarters' })
export class EstateQuarterEntity extends BaseEntityWithPrimaryCodeColumn {
  @Column({
    name: 'code',
    enum: ESTATE_QUARTER_ENUM,
  })
  code: ESTATE_QUARTER_ENUM;

  @Column({
    name: 'name',
  })
  name: string;
}
