import { UNIT_PRICE_TYPE_ENUM } from '@encacap-group/common/dist/re';
import { BaseEntityWithPrimaryGeneratedColumn } from 'src/base/base.entity';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'uint_prices' })
export class UnitPriceEntity extends BaseEntityWithPrimaryGeneratedColumn {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'type', enum: UNIT_PRICE_TYPE_ENUM })
  type: UNIT_PRICE_TYPE_ENUM;

  @Column({ name: 'website_id' })
  websiteId: number;

  @ManyToOne(() => WebsiteEntity)
  @JoinColumn({ name: 'website_id', referencedColumnName: 'id' })
  website: WebsiteEntity;
}
