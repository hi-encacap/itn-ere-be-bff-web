import { BaseEntityWithPrimaryCodeColumn } from 'src/base/base.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'category_groups' })
export class CategoryGroupEntity extends BaseEntityWithPrimaryCodeColumn {
  @Column()
  name!: string;

  @Column({ name: 'user_id' })
  userId!: number;

  @ManyToOne(() => UserEntity, (user) => user.categoryGroups)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;
}
