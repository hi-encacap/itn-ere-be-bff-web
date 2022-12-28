import { CategoryPropertyEntity } from 'src/modules/category/entities/category-property.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { EstateEntity } from './estate.entity';

@Entity({ name: 'estate_properties' })
export class EstatePropertyEntity {
  @PrimaryColumn({ name: 'estate_id' })
  estateId: number;

  @PrimaryColumn({ name: 'category_property_id' })
  categoryPropertyId: number;

  @Column({ name: 'value' })
  value: string;

  // Relations
  @ManyToOne(() => EstateEntity, (estate) => estate.properties)
  @JoinColumn({ name: 'estate_id' })
  estate: EstateEntity;

  @ManyToOne(() => CategoryPropertyEntity, (categoryProperty) => categoryProperty.estates)
  @JoinColumn({ name: 'category_property_id' })
  categoryProperty: CategoryPropertyEntity;
}
