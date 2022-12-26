import { BaseEntityWithPrimaryCodeColumn } from 'src/base/base.entity';
import { CloudflareImageEntity } from 'src/modules/cloudflare/entities/cloudflare-image.entity';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { CATEGORY_GROUP_ENUM } from '../constants/category-group.constant';
import { CategoryGroupEntity } from './category-group.entity';
import { CategoryPropertyEntity } from './category-property.entity';

@Entity({ name: 'categories' })
export class CategoryEntity extends BaseEntityWithPrimaryCodeColumn {
  @Column()
  name: string;

  @Column({ name: 'thumbnail_id' })
  thumbnailId: string;

  @Column({ name: 'website_id' })
  websiteId: number;

  @Column({ name: 'category_group_code' })
  categoryGroupCode: CATEGORY_GROUP_ENUM;

  @OneToOne(() => CloudflareImageEntity)
  @JoinColumn({ name: 'thumbnail_id', referencedColumnName: 'id' })
  thumbnail: CloudflareImageEntity;

  @OneToMany(() => CategoryPropertyEntity, (categoryProperty) => categoryProperty.category)
  properties: CategoryPropertyEntity[];

  @ManyToOne(() => CategoryGroupEntity, (categoryGroup) => categoryGroup.categories)
  @JoinColumn({ name: 'category_group_code', referencedColumnName: 'code' })
  categoryGroup: CategoryGroupEntity;

  @ManyToOne(() => WebsiteEntity)
  @JoinColumn({ name: 'website_id', referencedColumnName: 'id' })
  website: WebsiteEntity;
}
