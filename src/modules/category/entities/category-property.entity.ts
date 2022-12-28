import { BaseEntityWithPrimaryGeneratedColumn } from 'src/base/base.entity';
import { EstatePropertyEntity } from 'src/modules/estate/entities/estate-property.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CategoryEntity } from './category.entity';

@Entity({ name: 'category_properties' })
export class CategoryPropertyEntity extends BaseEntityWithPrimaryGeneratedColumn {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'category_id' })
  categoryId: number;

  @ManyToOne(() => CategoryEntity, (category) => category.properties)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: CategoryEntity;

  @OneToMany(() => EstatePropertyEntity, (estateProperty) => estateProperty.categoryProperty)
  @JoinColumn({ name: 'id', referencedColumnName: 'category_property_id' })
  estates: EstatePropertyEntity[];

  websiteId: number;
}
