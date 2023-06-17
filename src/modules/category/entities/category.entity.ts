import { CATEGORY_GROUP_ENUM, IImageResponse } from '@encacap-group/common/dist/re';
import { ImageEntity } from '@modules/image/entities/image.entity';
import { BaseEntityWithPrimaryGeneratedColumn } from 'src/base/base.entity';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { CategoryGroupEntity } from './category-group.entity';

@Entity({ name: 'categories' })
export class CategoryEntity extends BaseEntityWithPrimaryGeneratedColumn {
  @Column()
  name: string;

  @Column({ name: 'code' })
  code: string;

  @Column({ name: 'avatar_id' })
  avatarId: string;

  @Column({ name: 'website_id' })
  websiteId: number;

  @Column({ name: 'category_group_code' })
  categoryGroupCode: CATEGORY_GROUP_ENUM;

  @Column({ name: 'left' })
  left: number;

  @Column({ name: 'right' })
  right: number;

  @OneToOne(() => ImageEntity)
  @JoinColumn({ name: 'avatar_id', referencedColumnName: 'id' })
  avatar: IImageResponse;

  @ManyToOne(() => CategoryGroupEntity, (categoryGroup) => categoryGroup.categories)
  @JoinColumn({ name: 'category_group_code', referencedColumnName: 'code' })
  categoryGroup: CategoryGroupEntity;

  @ManyToOne(() => WebsiteEntity)
  @JoinColumn({ name: 'website_id', referencedColumnName: 'id' })
  website: WebsiteEntity;
}
