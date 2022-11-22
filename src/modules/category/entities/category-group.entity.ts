import { BaseEntityWithPrimaryCodeColumn } from 'src/base/base.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CategoryEntity } from './category.entity';

@Entity({ name: 'category_groups' })
export class CategoryGroupEntity extends BaseEntityWithPrimaryCodeColumn {
  @Column()
  name!: string;

  @Column({ name: 'user_id' })
  userId!: number;

  @ManyToOne(() => UserEntity, (user) => user.categoryGroups)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @OneToMany(() => CategoryEntity, (category) => category.categoryGroup)
  categories!: CategoryEntity[];
}
