import { UNIT_PRICE_TYPE_ENUM } from 'encacap/dist/re';
import { BaseEntityWithPrimaryGeneratedColumn } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'uint_prices' })
export class UnitPriceEntity extends BaseEntityWithPrimaryGeneratedColumn {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'type', enum: UNIT_PRICE_TYPE_ENUM })
  type: UNIT_PRICE_TYPE_ENUM;
}
