import { BaseEntityWithPrimaryCodeColumn } from 'src/base/base.entity';
import { CloudflareImageEntity } from 'src/modules/cloudflare/entities/cloudflare-image.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { CATEGORY_GROUP_ENUM } from '../constants/category-group.constant';
import { CategoryGroupEntity } from './category-group.entity';

@Entity({ name: 'categories' })
export class CategoryEntity extends BaseEntityWithPrimaryCodeColumn {
  @Column()
  name: string;

  @Column({ name: 'thumbnail_id' })
  thumbnailId: string;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'category_group_code' })
  categoryGroupCode: CATEGORY_GROUP_ENUM;

  @OneToOne(() => CloudflareImageEntity)
  @JoinColumn({ name: 'thumbnail_id', referencedColumnName: 'id' })
  thumbnail: CloudflareImageEntity;

  @ManyToOne(() => CategoryGroupEntity, (categoryGroup) => categoryGroup.categories)
  @JoinColumn({ name: 'category_group_code', referencedColumnName: 'code' })
  categoryGroup: CategoryGroupEntity;

  @ManyToOne(() => UserEntity, (user) => user.categories)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  websiteId?: number;
}
