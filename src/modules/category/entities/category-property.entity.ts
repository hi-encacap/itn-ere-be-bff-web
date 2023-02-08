import { BaseEntityWithPrimaryGeneratedColumn } from 'src/base/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
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

  websiteId: number;
}
